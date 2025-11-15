import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface GroundingSource {
  uri: string;
  title: string;
}

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
    
    // Enable grounding with a simplified approach
    const model = genAI.getGenerativeModel(
      {
        model: 'gemini-2.5-flash',
        tools: [
          {
            googleSearch: {},
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        ],
      },
      { apiVersion: 'v1beta' }
    );
    console.log('Model initialized with grounding enabled');
    
    const prompt = `SEARCH OFFICIAL BANK WEBSITES for current ${data.product} offers from HDFC Bank, ICICI Bank, SBI, Axis Bank, Kotak Mahindra Bank.

User: ${data.income || 'middle income'}, CIBIL ${data.cibilScore || '700+'}, ${data.employment || 'salaried'}, interests: ${data.spendingPattern?.join(', ') || 'general'}

CRITICAL REQUIREMENTS:
1. ONLY use data from official bank websites (.com domains): hdfc.com, icicibank.com, sbi.in, axisbank.com, kotak.com
2. Verify ALL numbers are current (December 2024/January 2025)
3. DO NOT include approval probability/percentage - this is not public information
4. Distinguish: "rewardRate" = cashback/points %, "interestRate" = APR on unpaid balance
5. Verify reward partners are accurate (e.g., SBI SimplyCLICK: BookMyShow/Cleartrip are 10x, Amazon is 5x)
6. Check latest reward point rates (e.g., Kotak 811: 4 RP per ₹100 online, not 2)

Return ONLY this JSON (no text before/after):

{
  "recommendations": [
    {"rank": 1, "productName": "exact official name", "bankName": "bank", "keyBenefits": ["verified benefit 1", "verified benefit 2", "verified benefit 3"], "rewardRate": "X% cashback OR X points per ₹100", "interestRate": "XX.X% p.a. APR", "fees": "₹XXX joining, ₹XXX annual (mention waiver if applicable)", "applyUrl": "https://officialbank.com/exact-page"},
    {"rank": 2, "productName": "exact official name", "bankName": "bank", "keyBenefits": ["verified benefit 1", "verified benefit 2", "verified benefit 3"], "rewardRate": "X% cashback OR X points per ₹100", "interestRate": "XX.X% p.a. APR", "fees": "₹XXX joining, ₹XXX annual (mention waiver if applicable)", "applyUrl": "https://officialbank.com/exact-page"},
    {"rank": 3, "productName": "exact official name", "bankName": "bank", "keyBenefits": ["verified benefit 1", "verified benefit 2", "verified benefit 3"], "rewardRate": "X% cashback OR X points per ₹100", "interestRate": "XX.X% p.a. APR", "fees": "₹XXX joining, ₹XXX annual (mention waiver if applicable)", "applyUrl": "https://officialbank.com/exact-page"}
  ],
  "comparisons": [
    {"bank": "bank1", "product": "product1", "rewardRate": "X% OR X pts/₹100", "fee": "₹XXX", "benefits": "key verified benefit", "interestRate": "XX% APR"},
    {"bank": "bank2", "product": "product2", "rewardRate": "X% OR X pts/₹100", "fee": "₹XXX", "benefits": "key verified benefit", "interestRate": "XX% APR"},
    {"bank": "bank3", "product": "product3", "rewardRate": "X% OR X pts/₹100", "fee": "₹XXX", "benefits": "key verified benefit", "interestRate": "XX% APR"}
  ],
  "insights": ["verified insight based on official data", "insight about suitability for user profile", "actionable recommendation"]
}`;

    console.log('Generating content with Gemini...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();
    console.log('AI Response received:', aiResponse.substring(0, 100) + '...');

    // Extract grounding metadata
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    if (groundingMetadata?.webSearchQueries) {
      console.log('Grounding - Search queries:', groundingMetadata.webSearchQueries);
    }
    if (groundingMetadata?.groundingChunks?.length) {
      console.log('Grounding - Sources found:', groundingMetadata.groundingChunks.length);
    }

    try {
      // Clean the response to extract only JSON
      let jsonString = aiResponse.trim();

      // Remove any markdown code blocks if present
      if (jsonString.includes('```json')) {
        jsonString = jsonString.replace(/[\s\S]*```json\s*/, '').replace(/```\s*$/, '');
      } else if (jsonString.includes('```')) {
        jsonString = jsonString.replace(/[\s\S]*```\s*/, '').replace(/```\s*$/, '');
      }

      // Extract JSON if there's extra text before/after
      // Find the first { and last } to extract just the JSON object
      const firstBrace = jsonString.indexOf('{');
      const lastBrace = jsonString.lastIndexOf('}');

      if (firstBrace !== -1 && lastBrace !== -1 && firstBrace < lastBrace) {
        jsonString = jsonString.substring(firstBrace, lastBrace + 1);
      }
      
      // Parse the JSON response
      const structuredData = JSON.parse(jsonString);
      console.log('Structured data parsed successfully');

      // Validate that we have exactly 3 recommendations
      if (!structuredData.recommendations || !Array.isArray(structuredData.recommendations)) {
        throw new Error('Invalid recommendations format');
      }

      if (structuredData.recommendations.length < 3) {
        console.warn(`Only ${structuredData.recommendations.length} recommendations received, expected 3`);
        return NextResponse.json({
          success: false,
          error: 'Insufficient recommendations generated. Please try again.'
        });
      }

      // Ensure we only return exactly 3 recommendations
      structuredData.recommendations = structuredData.recommendations.slice(0, 3);

      // Validate each recommendation has required fields
      for (const rec of structuredData.recommendations) {
        if (!rec.productName || !rec.bankName || !rec.keyBenefits || !Array.isArray(rec.keyBenefits)) {
          console.error('Invalid recommendation structure:', rec);
          return NextResponse.json({
            success: false,
            error: 'Invalid recommendation data format. Please try again.'
          });
        }
      }

      // Extract sources from grounding metadata
      const sources: GroundingSource[] = [];
      if (groundingMetadata?.groundingChunks) {
        groundingMetadata.groundingChunks.forEach((chunk: { web?: { uri?: string; title?: string } }) => {
          if (chunk.web?.uri && chunk.web?.title) {
            sources.push({
              uri: chunk.web.uri,
              title: chunk.web.title,
            });
          }
        });
      }

      return NextResponse.json({
        success: true,
        data: structuredData,
        sources: sources.length > 0 ? sources : undefined,
        searchQueries: groundingMetadata?.webSearchQueries || undefined,
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