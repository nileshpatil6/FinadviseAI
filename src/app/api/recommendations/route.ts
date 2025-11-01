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

    CRITICAL REQUIREMENTS:
    1. You MUST provide EXACTLY 3 recommendations, no more, no less
    2. Provide ONLY real, accurate products from actual Indian banks (HDFC, ICICI, SBI, Axis, Kotak, etc.)
    3. Use current market rates and fees as of 2025
    4. Ensure all interest rates, fees, and approval probabilities are realistic and verifiable
    5. Do NOT make up fake product names or non-existent benefits
    6. All URLs should be real bank websites (use https://www.bankname.com format)

    Return ONLY this JSON structure with NO additional text:

    {
      "recommendations": [
        {
          "rank": 1,
          "productName": "Actual product name from real bank",
          "bankName": "Real Indian bank name",
          "keyBenefits": ["Real benefit 1", "Real benefit 2", "Real benefit 3"],
          "interestRate": "X.X%" (use actual current rates),
          "fees": "₹X,XXX" (use actual fees),
          "approvalProbability": "XX%" (realistic based on user profile),
          "applyUrl": "https://www.realbank.com"
        },
        {
          "rank": 2,
          "productName": "Actual product name from real bank",
          "bankName": "Real Indian bank name",
          "keyBenefits": ["Real benefit 1", "Real benefit 2", "Real benefit 3"],
          "interestRate": "X.X%" (use actual current rates),
          "fees": "₹X,XXX" (use actual fees),
          "approvalProbability": "XX%" (realistic based on user profile),
          "applyUrl": "https://www.realbank.com"
        },
        {
          "rank": 3,
          "productName": "Actual product name from real bank",
          "bankName": "Real Indian bank name",
          "keyBenefits": ["Real benefit 1", "Real benefit 2", "Real benefit 3"],
          "interestRate": "X.X%" (use actual current rates),
          "fees": "₹X,XXX" (use actual fees),
          "approvalProbability": "XX%" (realistic based on user profile),
          "applyUrl": "https://www.realbank.com"
        }
      ],
      "comparisons": [
        {
          "bank": "Real Bank Name 1",
          "product": "Real Product Name 1", 
          "rate": "X.X%" (actual rate),
          "fee": "₹X,XXX" (actual fee),
          "benefits": "Key real benefit",
          "approval": "XX%" (realistic)
        },
        {
          "bank": "Real Bank Name 2",
          "product": "Real Product Name 2", 
          "rate": "X.X%" (actual rate),
          "fee": "₹X,XXX" (actual fee),
          "benefits": "Key real benefit",
          "approval": "XX%" (realistic)
        },
        {
          "bank": "Real Bank Name 3",
          "product": "Real Product Name 3", 
          "rate": "X.X%" (actual rate),
          "fee": "₹X,XXX" (actual fee),
          "benefits": "Key real benefit",
          "approval": "XX%" (realistic)
        }
      ],
      "insights": [
        "Key insight 1 based on user profile with specific details",
        "Key insight 2 about realistic approval chances with reasoning", 
        "Key insight 3 about best options with actionable advice"
      ]
    }

    Focus on ${data.product} products specifically. Use only real Indian banks and their actual products. Verify all rates and fees are current market rates for 2025. Ensure data is 100% accurate and actionable.`;

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