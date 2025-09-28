import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  console.log('API route called');
  
  try {
    const data = await request.json();
    console.log('Received data:', data);
    
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      console.log('No valid Gemini API key found');
      return NextResponse.json({
        success: false,
        error: 'Gemini API key not configured. Please set GEMINI_API_KEY in your environment variables to get real AI recommendations.'
      });
    }
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    console.log('Model initialized');
    
    const prompt = `
    You are a professional financial advisor AI. Based on the user profile provided, return ONLY a valid JSON object with structured financial product recommendations. Do NOT include any HTML, explanatory text, or formatting outside the JSON.

    User Profile:
    - Product Type: ${data.product}
    - Age: ${data.age || 'Not provided'}
    - Annual Income: ${data.income || 'Not provided'}
    - Credit Score: ${data.creditScore || 'Not provided'}
    - Employment Status: ${data.employmentStatus || 'Not provided'}
    - Primary Financial Goal: ${data.primaryGoal || 'Not provided'}
    - Monthly Income: ₹${data.monthlyIncome || 'Not provided'}
    - Employment Type: ${data.employmentType || 'Not provided'}
    - Spending Pattern: ${data.spendingPattern?.join(', ') || 'Not provided'}

    Return ONLY this JSON structure with NO additional text:

    {
      "recommendations": [
        {
          "rank": 1,
          "productName": "Specific product name",
          "bankName": "Bank name",
          "keyBenefits": ["Benefit 1", "Benefit 2", "Benefit 3"],
          "interestRate": "X.X%",
          "fees": "₹X,XXX",
          "approvalProbability": "XX%",
          "applyUrl": "https://bank-official-url.com"
        }
      ],
      "comparisons": [
        {
          "bank": "Bank Name",
          "product": "Product Name", 
          "rate": "X.X%",
          "fee": "₹X,XXX",
          "benefits": "Key benefit",
          "approval": "XX%"
        }
      ],
      "insights": [
        "Key insight 1 based on user profile",
        "Key insight 2 about approval chances", 
        "Key insight 3 about best options"
      ]
    }

    Focus on ${data.product} products specifically. Provide real Indian banks and current market rates. Make sure all data is realistic and actionable.`;

    console.log('Generating content with Gemini...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();
    console.log('AI Response received:', aiResponse);

    try {
      // Clean the response to extract only JSON
      let jsonString = aiResponse.trim();
      
      // Remove any markdown code blocks if present
      if (jsonString.startsWith('```json')) {
        jsonString = jsonString.replace(/```json\s*/, '').replace(/```\s*$/, '');
      } else if (jsonString.startsWith('```')) {
        jsonString = jsonString.replace(/```\s*/, '').replace(/```\s*$/, '');
      }
      
      // Parse the JSON response
      const structuredData = JSON.parse(jsonString);
      console.log('Structured data parsed successfully');

      return NextResponse.json({
        success: true,
        data: structuredData
      });
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      console.error('Raw AI response:', aiResponse);
      
      return NextResponse.json({
        success: false,
        error: 'AI returned invalid response format. Please try again.'
      });
    }
    
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: `Failed to generate recommendations: ${error instanceof Error ? error.message : 'Unknown error'}` 
      },
      { status: 500 }
    );
  }
}