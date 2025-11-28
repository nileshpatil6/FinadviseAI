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

    // Generate product-specific prompt based on product type
    const getProductPrompt = (productType: string) => {
      const productName = productType.replace('-', ' ');

      // Common user profile
      const userProfile = `User Profile: ${data.income || 'middle income'}, CIBIL ${data.cibilScore || '700+'}, ${data.employment || 'salaried'}, Age: ${data.age || data.ageRange || '25-35'}`;

      switch (productType) {
        case 'credit-cards':
          const isBusiness = data.cardCategory === 'business';
          const cardType = isBusiness ? 'Business/Commercial Credit Cards' : 'Personal/Retail Credit Cards';
          const incomeLabel = isBusiness ? 'Annual Turnover/Business Income' : 'Monthly Salary';
          const profileDetails = isBusiness
            ? `Business Type: ${data.businessType || 'General'}, Turnover: ${data.income || '10L-20L'}`
            : `Income: ${data.income || 'middle income'}, Employment: ${data.employment || 'salaried'}`;

          return `SEARCH OFFICIAL BANK WEBSITES for current ${cardType} offers from HDFC Bank, ICICI Bank, SBI, Axis Bank, Kotak Mahindra Bank, Amex.

${userProfile}
${profileDetails}
Spending Needs: ${data.spendingPattern?.join(', ') || 'general'}
Card Preferences: ${data.cardPreference?.join(', ') || 'general'}

CRITICAL REQUIREMENTS:
1. ONLY use data from official bank websites
2. Verify ALL numbers are current (December 2024/January 2025)
3. STRICTLY return ONLY ${isBusiness ? 'Business/Corporate' : 'Personal/Retail'} credit cards. Do not mix them.
4. For High Income (>₹2L/month) or High Turnover, include PREMIUM cards (e.g., ICICI Emerald, HDFC Infinia, SBI Aurum, Amex Platinum).
5. Verify reward partners and rates are accurate

Return ONLY this JSON (no text before/after):

{
  "recommendations": [
    {"rank": 1, "productName": "exact card name", "bankName": "bank", "keyBenefits": ["benefit 1", "benefit 2", "benefit 3"], "rewardRate": "X% cashback OR X points per ₹100", "interestRate": "XX.X% p.a. APR", "fees": "₹XXX joining, ₹XXX annual", "applyUrl": "https://officialbank.com/cards/page"},
    {"rank": 2, "productName": "exact card name", "bankName": "bank", "keyBenefits": ["benefit 1", "benefit 2", "benefit 3"], "rewardRate": "X% cashback OR X points per ₹100", "interestRate": "XX.X% p.a. APR", "fees": "₹XXX joining, ₹XXX annual", "applyUrl": "https://officialbank.com/cards/page"},
    {"rank": 3, "productName": "exact card name", "bankName": "bank", "keyBenefits": ["benefit 1", "benefit 2", "benefit 3"], "rewardRate": "X% cashback OR X points per ₹100", "interestRate": "XX.X% p.a. APR", "fees": "₹XXX joining, ₹XXX annual", "applyUrl": "https://officialbank.com/cards/page"}
  ],
  "comparisons": [
    {"bank": "bank1", "product": "card1", "rewardRate": "X% OR X pts/₹100", "fee": "₹XXX", "benefits": "key benefit", "interestRate": "XX% APR"},
    {"bank": "bank2", "product": "card2", "rewardRate": "X% OR X pts/₹100", "fee": "₹XXX", "benefits": "key benefit", "interestRate": "XX% APR"},
    {"bank": "bank3", "product": "card3", "rewardRate": "X% OR X pts/₹100", "fee": "₹XXX", "benefits": "key benefit", "interestRate": "XX% APR"}
  ],
  "insights": ["insight 1", "insight 2", "insight 3"]
}`;

        case 'health-insurance':
          return `SEARCH OFFICIAL HEALTH INSURANCE COMPANY WEBSITES for current HEALTH INSURANCE plans ONLY from HDFC ERGO, ICICI Lombard, Star Health, Care Health, Max Bupa, Niva Bupa, Aditya Birla Health.

${userProfile}
Family Size: ${data.familySize || 'individual'}
Sum Insured Required: ${data.sumInsured || '₹5 Lakhs'}
Premium Budget: ${data.premiumBudget || '₹10,000-20,000 annually'}
Required Add-ons: ${data.addons?.join(', ') || 'Basic coverage'}

CRITICAL REQUIREMENTS:
1. ONLY return HEALTH INSURANCE plans - NO life, auto, or home insurance
2. ONLY use data from official health insurance company websites
3. Verify ALL premiums and coverage amounts are current (December 2024/January 2025)
4. "premium" = annual premium amount in ₹
5. "coverage" = sum insured/coverage amount (e.g., "₹5 Lakhs", "₹10 Lakhs", "₹50 Lakhs")
6. Include network hospital count and key features like cashless treatment, room rent limits
7. Mention specific add-ons available: Critical Illness, Maternity, OPD, Mental Health, etc.
8. DO NOT make up data - only use verified information from official sources

Return ONLY this JSON (no text before/after):

{
  "recommendations": [
    {"rank": 1, "productName": "exact health insurance plan name", "bankName": "insurance company name", "keyBenefits": ["Network: X,XXX+ hospitals", "Cashless treatment", "specific coverage feature"], "premium": "₹XX,XXX per year", "coverage": "₹XX Lakhs", "fees": "No hidden charges", "applyUrl": "https://officialinsurer.com/health-insurance/plan"},
    {"rank": 2, "productName": "exact health insurance plan name", "bankName": "insurance company name", "keyBenefits": ["Network: X,XXX+ hospitals", "Cashless treatment", "specific coverage feature"], "premium": "₹XX,XXX per year", "coverage": "₹XX Lakhs", "fees": "No hidden charges", "applyUrl": "https://officialinsurer.com/health-insurance/plan"},
    {"rank": 3, "productName": "exact health insurance plan name", "bankName": "insurance company name", "keyBenefits": ["Network: X,XXX+ hospitals", "Cashless treatment", "specific coverage feature"], "premium": "₹XX,XXX per year", "coverage": "₹XX Lakhs", "fees": "No hidden charges", "applyUrl": "https://officialinsurer.com/health-insurance/plan"}
  ],
  "comparisons": [
    {"bank": "insurer1", "product": "health plan1", "rate": "₹XX,XXX/year", "fee": "₹XX Lakhs coverage", "benefits": "Network hospitals, room rent, add-ons"},
    {"bank": "insurer2", "product": "health plan2", "rate": "₹XX,XXX/year", "fee": "₹XX Lakhs coverage", "benefits": "Network hospitals, room rent, add-ons"},
    {"bank": "insurer3", "product": "health plan3", "rate": "₹XX,XXX/year", "fee": "₹XX Lakhs coverage", "benefits": "Network hospitals, room rent, add-ons"}
  ],
  "insights": ["insight about health insurance coverage", "insight about premium vs coverage", "insight about add-ons value"]
}`;

        case 'life-insurance':
        case 'auto-insurance':
        case 'home-insurance':
          return `SEARCH OFFICIAL INSURANCE COMPANY WEBSITES for current ${productName} plans from HDFC ERGO, ICICI Lombard, SBI General, Max Bupa, Star Health, Care Health.

${userProfile}, Family: ${data.familySize || 'individual'}, Coverage: ${data.sumInsured || '₹5L'}

CRITICAL REQUIREMENTS:
1. ONLY use data from official insurance company websites
2. Verify ALL premiums and coverage amounts are current (December 2024/January 2025)
3. For insurance: "premium" = annual premium amount, "coverage" = sum insured/coverage amount
4. Include network hospitals/garages for health/auto insurance
5. DO NOT make up data - only use verified information

Return ONLY this JSON (no text before/after):

{
  "recommendations": [
    {"rank": 1, "productName": "exact plan name", "bankName": "insurance company", "keyBenefits": ["benefit 1", "benefit 2", "benefit 3"], "premium": "₹XX,XXX per year", "coverage": "₹XX Lakhs", "fees": "No hidden charges", "applyUrl": "https://officialinsurer.com/plans/page"},
    {"rank": 2, "productName": "exact plan name", "bankName": "insurance company", "keyBenefits": ["benefit 1", "benefit 2", "benefit 3"], "premium": "₹XX,XXX per year", "coverage": "₹XX Lakhs", "fees": "No hidden charges", "applyUrl": "https://officialinsurer.com/plans/page"},
    {"rank": 3, "productName": "exact plan name", "bankName": "insurance company", "keyBenefits": ["benefit 1", "benefit 2", "benefit 3"], "premium": "₹XX,XXX per year", "coverage": "₹XX Lakhs", "fees": "No hidden charges", "applyUrl": "https://officialinsurer.com/plans/page"}
  ],
  "comparisons": [
    {"bank": "insurer1", "product": "plan1", "rate": "₹XX,XXX/year", "fee": "₹XX Lakhs coverage", "benefits": "key features"},
    {"bank": "insurer2", "product": "plan2", "rate": "₹XX,XXX/year", "fee": "₹XX Lakhs coverage", "benefits": "key features"},
    {"bank": "insurer3", "product": "plan3", "rate": "₹XX,XXX/year", "fee": "₹XX Lakhs coverage", "benefits": "key features"}
  ],
  "insights": ["insight 1", "insight 2", "insight 3"]
}`;

        case 'personal-loans':
        case 'home-loans':
        case 'auto-loans':
        case 'education-loans':
          return `SEARCH OFFICIAL BANK WEBSITES for current ${productName} offers from HDFC Bank, ICICI Bank, SBI, Axis Bank, Kotak Mahindra Bank.

${userProfile}, Loan Amount: ${data.loanAmount || '₹5L'}, Tenure: ${data.tenure || '3 years'}

CRITICAL REQUIREMENTS:
1. ONLY use data from official bank websites
2. Verify ALL interest rates and fees are current (December 2024/January 2025)
3. For loans: "interestRate" = annual interest rate %, "emi" = monthly EMI amount
4. Include processing fees and other charges
5. Calculate accurate EMI based on loan amount and tenure

Return ONLY this JSON (no text before/after):

{
  "recommendations": [
    {"rank": 1, "productName": "exact loan name", "bankName": "bank", "keyBenefits": ["benefit 1", "benefit 2", "benefit 3"], "interestRate": "X.X% p.a.", "emi": "₹XX,XXX/month", "fees": "₹XXX processing fee", "applyUrl": "https://officialbank.com/loans/page"},
    {"rank": 2, "productName": "exact loan name", "bankName": "bank", "keyBenefits": ["benefit 1", "benefit 2", "benefit 3"], "interestRate": "X.X% p.a.", "emi": "₹XX,XXX/month", "fees": "₹XXX processing fee", "applyUrl": "https://officialbank.com/loans/page"},
    {"rank": 3, "productName": "exact loan name", "bankName": "bank", "keyBenefits": ["benefit 1", "benefit 2", "benefit 3"], "interestRate": "X.X% p.a.", "emi": "₹XX,XXX/month", "fees": "₹XXX processing fee", "applyUrl": "https://officialbank.com/loans/page"}
  ],
  "comparisons": [
    {"bank": "bank1", "product": "loan1", "rate": "X.X% p.a.", "emi": "₹XX,XXX/month", "processing": "₹XXX", "benefits": "key features"},
    {"bank": "bank2", "product": "loan2", "rate": "X.X% p.a.", "emi": "₹XX,XXX/month", "processing": "₹XXX", "benefits": "key features"},
    {"bank": "bank3", "product": "loan3", "rate": "X.X% p.a.", "emi": "₹XX,XXX/month", "processing": "₹XXX", "benefits": "key features"}
  ],
  "insights": ["insight 1", "insight 2", "insight 3"]
}`;

        case 'mutual-funds':
          return `SEARCH OFFICIAL AMC WEBSITES for current mutual fund schemes from HDFC MF, ICICI Prudential MF, SBI MF, Axis MF, Kotak MF.

${userProfile}, Investment: ${data.investmentAmount || '₹10,000/month'}, Goal: ${data.goal || 'wealth creation'}, Risk: ${data.riskAppetite || 'medium'}

CRITICAL REQUIREMENTS:
1. ONLY use data from official AMC websites
2. Verify ALL returns and expense ratios are current (December 2024/January 2025)
3. For mutual funds: "returns" = annualized returns %, "expenseRatio" = annual expense ratio %
4. Include fund category and risk level
5. Use actual historical performance data

Return ONLY this JSON (no text before/after):

{
  "recommendations": [
    {"rank": 1, "productName": "exact fund name", "bankName": "AMC", "keyBenefits": ["benefit 1", "benefit 2", "benefit 3"], "returns": "XX% (3Y CAGR)", "expenseRatio": "X.X%", "fees": "Exit load: X% if redeemed before 1 year", "applyUrl": "https://officialamc.com/funds/page"},
    {"rank": 2, "productName": "exact fund name", "bankName": "AMC", "keyBenefits": ["benefit 1", "benefit 2", "benefit 3"], "returns": "XX% (3Y CAGR)", "expenseRatio": "X.X%", "fees": "Exit load: X% if redeemed before 1 year", "applyUrl": "https://officialamc.com/funds/page"},
    {"rank": 3, "productName": "exact fund name", "bankName": "AMC", "keyBenefits": ["benefit 1", "benefit 2", "benefit 3"], "returns": "XX% (3Y CAGR)", "expenseRatio": "X.X%", "fees": "Exit load: X% if redeemed before 1 year", "applyUrl": "https://officialamc.com/funds/page"}
  ],
  "comparisons": [
    {"bank": "AMC1", "product": "fund1", "rate": "XX% (3Y)", "fee": "X.X% expense ratio", "benefits": "fund category & risk"},
    {"bank": "AMC2", "product": "fund2", "rate": "XX% (3Y)", "fee": "X.X% expense ratio", "benefits": "fund category & risk"},
    {"bank": "AMC3", "product": "fund3", "rate": "XX% (3Y)", "fee": "X.X% expense ratio", "benefits": "fund category & risk"}
  ],
  "insights": ["insight 1", "insight 2", "insight 3"]
}`;

        default:
          // Generic fallback for other products
          return `SEARCH OFFICIAL WEBSITES for current ${productName} offers from major banks and financial institutions.

${userProfile}

Return ONLY this JSON (no text before/after):

{
  "recommendations": [
    {"rank": 1, "productName": "product name", "bankName": "institution", "keyBenefits": ["benefit 1", "benefit 2", "benefit 3"], "fees": "applicable fees", "applyUrl": "https://official.com/page"},
    {"rank": 2, "productName": "product name", "bankName": "institution", "keyBenefits": ["benefit 1", "benefit 2", "benefit 3"], "fees": "applicable fees", "applyUrl": "https://official.com/page"},
    {"rank": 3, "productName": "product name", "bankName": "institution", "keyBenefits": ["benefit 1", "benefit 2", "benefit 3"], "fees": "applicable fees", "applyUrl": "https://official.com/page"}
  ],
  "comparisons": [
    {"bank": "institution1", "product": "product1", "rate": "rate/price", "fee": "fees", "benefits": "features"},
    {"bank": "institution2", "product": "product2", "rate": "rate/price", "fee": "fees", "benefits": "features"},
    {"bank": "institution3", "product": "product3", "rate": "rate/price", "fee": "fees", "benefits": "features"}
  ],
  "insights": ["insight 1", "insight 2", "insight 3"]
}`;
      }
    };

    const prompt = getProductPrompt(data.product);

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