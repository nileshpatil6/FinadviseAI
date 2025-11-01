import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: Request) {
  if (!genAI) {
    return NextResponse.json(
      {
        success: false,
        error:
          'Gemini API key not configured. Please set GEMINI_API_KEY in your environment variables to enable the financial advisor chatbot.',
      },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];

    if (messages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No messages provided. Send at least one user message to receive financial guidance.',
        },
        { status: 400 },
      );
    }

    const sanitizedMessages = messages
      .map((message) => ({
        role: message.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: (message.content || '').toString().slice(0, 4000) }],
      }))
      .slice(-10); // keep the most recent exchanges to stay within token limits

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction:
        'You are FinadAI Assistant, a helpful financial guidance chatbot for Indian users. Provide clear, conversational financial guidance about banking, loans, insurance, credit, and investments. Cite real-world considerations and explain reasoning. \
Always include a concise disclaimer reminding users to verify details with qualified professionals and that your guidance is informational, not personalized financial advice.',
    });

    const result = await model.generateContent({
      contents: sanitizedMessages,
    });

    const responseText = result.response.text().trim();

    if (!responseText) {
      return NextResponse.json(
        {
          success: false,
          error: 'Received an empty response from Gemini. Please try asking your question again.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: responseText,
    });
  } catch (error) {
    console.error('Error generating financial advice:', error);
    return NextResponse.json(
      {
        success: false,
        error: `Failed to generate financial guidance: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 },
    );
  }
}
