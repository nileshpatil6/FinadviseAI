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
          const profileDetails = isBusiness
            ? `Business Type: ${data.businessType || 'General'}, Turnover: ${data.income || '10L-20L'}`
            : `Income: ${data.income || 'middle income'}, Employment: ${data.employment || 'salaried'}`;

          return `You are a financial product expert analyzing ONLY OFFICIAL BANK WEBSITES for Indian ${cardType}.

USER REQUIREMENTS:
${userProfile}
${profileDetails}
Spending Categories: ${data.spendingPattern?.join(', ') || 'general spending'}
Card Preferences: ${data.cardPreference?.join(', ') || 'general benefits'}

SEARCH INSTRUCTIONS - FOLLOW EXACTLY:
1. Search ONLY official websites: HDFC Bank, ICICI Bank, SBI Card, Axis Bank, Kotak Mahindra Bank, American Express India
2. Product Type: STRICTLY ${isBusiness ? 'Business/Corporate/Commercial Credit Cards ONLY' : 'Personal/Retail Credit Cards ONLY'}
   - ${isBusiness ? 'Examples: HDFC Business MoneyBack, ICICI Bank Coral Business, SBI SimplyCLICK Business' : 'Examples: HDFC Regalia, ICICI Amazon Pay, SBI SimplyCLICK'}
   - DO NOT mix business and personal cards
3. Verify all data is from December 2024 or January 2025
4. Use EXACT card names as listed on bank websites (e.g., "HDFC Bank Regalia Credit Card", not "HDFC Regalia")

DATA ACCURACY REQUIREMENTS:
✓ productName: EXACT official card name from bank website
✓ bankName: Official bank name (e.g., "HDFC Bank", "ICICI Bank", "SBI Card")
✓ keyBenefits: Top 3 ACTUAL benefits from official card page
   - Be specific: "4 reward points per ₹150 on dining" NOT "Good dining rewards"
   - Include actual numbers: "10,000 bonus points on ₹1L spend in 90 days"
   - Mention specific partners: "Complimentary Zomato Gold membership"
✓ rewardRate: EXACT reward structure
   - Format: "4 points per ₹150" OR "5% cashback on groceries" OR "2 miles per ₹100"
   - Include caps if any: "5% cashback (max ₹1,000/month)"
✓ interestRate: Current APR from official website
   - Format: "3.5% per month (42% p.a.)" OR "3.25%-3.75% per month"
✓ fees: EXACT joining and annual fees
   - Format: "₹2,500 joining + ₹2,500 annual (waived on ₹3L spend)" OR "₹0 joining, ₹500 annual"
   - Include waiver conditions if applicable
✓ applyUrl: Direct link to official card application page

INCOME-BASED CARD SELECTION:
- Entry Level (₹25K-₹50K/month): SimplyCLICK, Flipkart Axis, Amazon Pay ICICI
- Mid Level (₹50K-₹1L/month): HDFC Millennia, ICICI Coral, Axis Ace
- Premium (₹1L-₹2L/month): HDFC Regalia, ICICI Sapphiro, SBI Elite
- Super Premium (>₹2L/month): HDFC Infinia, ICICI Emeralde, Amex Platinum

RETURN FORMAT - STRICT JSON ONLY:
{
  "recommendations": [
    {
      "rank": 1,
      "productName": "EXACT card name from official website",
      "bankName": "Official bank name",
      "keyBenefits": [
        "Specific benefit with numbers (e.g., 4 points per ₹150 on dining)",
        "Another specific benefit (e.g., Complimentary airport lounge access - 4 visits/quarter)",
        "Third specific benefit (e.g., Welcome bonus: 10,000 points on ₹1L spend in 90 days)"
      ],
      "rewardRate": "Exact reward structure (e.g., 4 points per ₹150 OR 5% cashback on groceries)",
      "interestRate": "X.X% per month (XX% p.a.)",
      "fees": "₹XXX joining + ₹XXX annual (waiver conditions if any)",
      "applyUrl": "https://www.officialbank.com/credit-cards/card-name"
    },
    {
      "rank": 2,
      "productName": "Second best card - EXACT name",
      "bankName": "Bank name",
      "keyBenefits": ["Specific benefit 1", "Specific benefit 2", "Specific benefit 3"],
      "rewardRate": "Exact rate",
      "interestRate": "X.X% per month (XX% p.a.)",
      "fees": "₹XXX joining + ₹XXX annual",
      "applyUrl": "https://official-url"
    },
    {
      "rank": 3,
      "productName": "Third best card - EXACT name",
      "bankName": "Bank name",
      "keyBenefits": ["Specific benefit 1", "Specific benefit 2", "Specific benefit 3"],
      "rewardRate": "Exact rate",
      "interestRate": "X.X% per month (XX% p.a.)",
      "fees": "₹XXX joining + ₹XXX annual",
      "applyUrl": "https://official-url"
    }
  ],
  "comparisons": [
    {"bank": "Bank 1", "product": "Card name", "rewardRate": "Rate", "fee": "₹XXX", "benefits": "Key differentiator", "interestRate": "XX% p.a."},
    {"bank": "Bank 2", "product": "Card name", "rewardRate": "Rate", "fee": "₹XXX", "benefits": "Key differentiator", "interestRate": "XX% p.a."},
    {"bank": "Bank 3", "product": "Card name", "rewardRate": "Rate", "fee": "₹XXX", "benefits": "Key differentiator", "interestRate": "XX% p.a."}
  ],
  "insights": [
    "Specific insight about why card 1 is best for this user profile",
    "Comparison insight (e.g., Card 1 offers 2x more rewards on dining than Card 2)",
    "Actionable advice (e.g., Apply for Card 1 first due to higher approval odds with your CIBIL score)"
  ]
}

VALIDATION CHECKLIST BEFORE RESPONDING:
□ All 3 cards are ${isBusiness ? 'BUSINESS' : 'PERSONAL'} cards only
□ All card names are EXACT official names
□ All numbers (fees, rates, rewards) are verified from official sources
□ All benefits are specific with actual numbers/details
□ All URLs point to official bank websites
□ No generic/vague descriptions used`;

        case 'debit-cards':
          return `You are a financial product expert analyzing ONLY OFFICIAL BANK WEBSITES for Indian Debit Cards.

USER REQUIREMENTS:
${userProfile}
Account Type Preference: ${data.accountType || 'Savings Account'}
Usage Pattern: ${data.usagePattern?.join(', ') || 'ATM withdrawals, online shopping'}

SEARCH INSTRUCTIONS:
1. Search ONLY official websites: HDFC Bank, ICICI Bank, SBI, Axis Bank, Kotak Mahindra Bank
2. Product Type: DEBIT CARDS ONLY (not credit cards)
3. Verify all data is current (December 2024/January 2025)
4. Use EXACT debit card names from bank websites

DATA ACCURACY REQUIREMENTS:
✓ productName: EXACT official debit card name (e.g., "HDFC Bank EasyShop Platinum Debit Card")
✓ bankName: Official bank name
✓ keyBenefits: Top 3 ACTUAL benefits
   - "1% cashback on online spends (max ₹500/month)"
   - "Free unlimited ATM withdrawals at all banks"
   - "Complimentary personal accident cover of ₹2 Lakhs"
✓ fees: Annual maintenance charges
   - Format: "₹200 annual (waived on ₹25K quarterly balance)" OR "₹0 for first year, ₹500 thereafter"

DEBIT CARD CATEGORIES:
- Basic: SBI Maestro, HDFC EasyShop, ICICI Coral
- Premium: HDFC Platinum, Axis Burgundy, ICICI Rubyx
- International: HDFC Visa Signature, SBI Global, ICICI Travel

RETURN FORMAT - STRICT JSON ONLY:
{
  "recommendations": [
    {
      "rank": 1,
      "productName": "EXACT debit card name",
      "bankName": "Bank name",
      "keyBenefits": ["Specific benefit 1", "Specific benefit 2", "Specific benefit 3"],
      "rewardRate": "Cashback/reward structure if any",
      "fees": "₹XXX annual (waiver conditions)",
      "applyUrl": "https://official-bank-url"
    },
    {"rank": 2, "productName": "Card 2", "bankName": "Bank", "keyBenefits": ["B1", "B2", "B3"], "rewardRate": "Rate", "fees": "₹XXX", "applyUrl": "URL"},
    {"rank": 3, "productName": "Card 3", "bankName": "Bank", "keyBenefits": ["B1", "B2", "B3"], "rewardRate": "Rate", "fees": "₹XXX", "applyUrl": "URL"}
  ],
  "comparisons": [
    {"bank": "Bank1", "product": "Card1", "rewardRate": "Rate", "fee": "₹XXX", "benefits": "Key features"},
    {"bank": "Bank2", "product": "Card2", "rewardRate": "Rate", "fee": "₹XXX", "benefits": "Key features"},
    {"bank": "Bank3", "product": "Card3", "rewardRate": "Rate", "fee": "₹XXX", "benefits": "Key features"}
  ],
  "insights": ["Insight 1", "Insight 2", "Insight 3"]
}`;

        case 'health-insurance':
          return `You are a health insurance expert analyzing ONLY OFFICIAL HEALTH INSURANCE COMPANY WEBSITES in India.

USER REQUIREMENTS:
${userProfile}
Family Size: ${data.familySize || 'Individual'}
Sum Insured Required: ${data.sumInsured || '₹5 Lakhs'}
Premium Budget: ${data.premiumBudget || '₹10,000-20,000 annually'}
Required Coverage: ${data.addons?.join(', ') || 'Basic hospitalization'}

SEARCH INSTRUCTIONS:
1. Search ONLY official websites: HDFC ERGO, ICICI Lombard, Star Health, Care Health, Max Bupa, Niva Bupa, Aditya Birla Health
2. Product Type: HEALTH INSURANCE PLANS ONLY (NOT life, auto, or home insurance)
3. Verify all data is current (December 2024/January 2025)
4. Use EXACT plan names from insurer websites

DATA ACCURACY REQUIREMENTS:
✓ productName: EXACT official plan name (e.g., "HDFC ERGO Optima Secure", "Star Comprehensive Insurance Policy")
✓ bankName: Official insurance company name (e.g., "HDFC ERGO", "Star Health Insurance")
✓ keyBenefits: Top 3 ACTUAL features with numbers
   - "Network: 14,000+ cashless hospitals across India"
   - "Room rent: Single private AC room (no capping)"
   - "Pre-hospitalization: 60 days, Post-hospitalization: 180 days"
   - "No claim bonus: 50% increase in sum insured every claim-free year (up to 100%)"
✓ premium: EXACT annual premium
   - Format: "₹8,450 per year (for 30-year-old, ₹5L cover, Individual)"
   - Include age/family structure in context
✓ coverage: Sum insured amount
   - Format: "₹5 Lakhs" OR "₹10 Lakhs" OR "₹50 Lakhs"
✓ fees: Any additional charges
   - Usually "No hidden charges" or "Co-payment: 10% for senior citizens"

PLAN CATEGORIES BY COVERAGE:
- Basic (₹3-5 Lakhs): Star Young Star, Care Freedom
- Standard (₹5-10 Lakhs): HDFC Optima Secure, ICICI Complete Health
- Premium (₹10-25 Lakhs): Max Bupa Health Companion, Niva Bupa ReAssure
- Super Premium (₹25L-1Cr): Star Comprehensive, Care Supreme

KEY FEATURES TO INCLUDE:
- Network hospital count
- Room rent limits
- Pre/post hospitalization days
- Daycare procedures covered
- No claim bonus structure
- Restoration benefit
- Add-on covers available (Maternity, OPD, Critical Illness)

RETURN FORMAT - STRICT JSON ONLY:
{
  "recommendations": [
    {
      "rank": 1,
      "productName": "EXACT health insurance plan name",
      "bankName": "Insurance company name",
      "keyBenefits": [
        "Network: X,XXX+ cashless hospitals",
        "Room rent: Specific limit (e.g., Single private AC, no capping)",
        "No claim bonus: XX% increase per claim-free year (max XX%)"
      ],
      "premium": "₹XX,XXX per year (specify age/family structure)",
      "coverage": "₹XX Lakhs",
      "fees": "No hidden charges OR Co-payment details",
      "applyUrl": "https://official-insurer.com/health-plans/plan-name"
    },
    {
      "rank": 2,
      "productName": "Plan 2 - EXACT name",
      "bankName": "Insurer",
      "keyBenefits": ["Benefit 1 with numbers", "Benefit 2 with numbers", "Benefit 3 with numbers"],
      "premium": "₹XX,XXX per year",
      "coverage": "₹XX Lakhs",
      "fees": "Details",
      "applyUrl": "URL"
    },
    {
      "rank": 3,
      "productName": "Plan 3 - EXACT name",
      "bankName": "Insurer",
      "keyBenefits": ["Benefit 1", "Benefit 2", "Benefit 3"],
      "premium": "₹XX,XXX per year",
      "coverage": "₹XX Lakhs",
      "fees": "Details",
      "applyUrl": "URL"
    }
  ],
  "comparisons": [
    {"bank": "Insurer1", "product": "Plan1", "rate": "₹XX,XXX/year", "fee": "₹XX L coverage", "benefits": "Network size, room rent, NCB"},
    {"bank": "Insurer2", "product": "Plan2", "rate": "₹XX,XXX/year", "fee": "₹XX L coverage", "benefits": "Network size, room rent, NCB"},
    {"bank": "Insurer3", "product": "Plan3", "rate": "₹XX,XXX/year", "fee": "₹XX L coverage", "benefits": "Network size, room rent, NCB"}
  ],
  "insights": [
    "Why Plan 1 is best for this user's age/family structure",
    "Premium vs coverage value comparison",
    "Specific add-on recommendations based on user needs"
  ]
}

VALIDATION CHECKLIST:
□ All 3 plans are HEALTH INSURANCE only
□ All plan names are EXACT official names
□ All premiums are verified and include context (age/family)
□ All benefits include specific numbers
□ Network hospital counts are accurate
□ URLs point to official insurer websites`;

        case 'personal-loans':
        case 'home-loans':
        case 'auto-loans':
        case 'education-loans':
          const loanType = productType.replace('-', ' ').toUpperCase();
          return `You are a loan expert analyzing ONLY OFFICIAL BANK WEBSITES for Indian ${loanType}.

USER REQUIREMENTS:
${userProfile}
Loan Amount: ${data.loanAmount || '₹5,00,000'}
Tenure: ${data.tenure || '3 years (36 months)'}
Monthly Income: ${data.monthlyIncome || '₹60,000'}
Purpose: ${data.purpose || 'General'}

SEARCH INSTRUCTIONS:
1. Search ONLY official websites: HDFC Bank, ICICI Bank, SBI, Axis Bank, Kotak Mahindra Bank, Bajaj Finserv
2. Product Type: ${loanType} ONLY
3. Verify all data is current (December 2024/January 2025)
4. Use EXACT loan product names from bank websites

DATA ACCURACY REQUIREMENTS:
✓ productName: EXACT official loan name (e.g., "HDFC Bank Personal Loan", "SBI Xpress Credit")
✓ bankName: Official bank/NBFC name
✓ keyBenefits: Top 3 ACTUAL features
   - "Instant approval in 10 minutes"
   - "No collateral required"
   - "Flexible repayment: 12-60 months"
   - "Top-up facility available after 6 months"
✓ interestRate: EXACT current interest rate
   - Format: "10.50% p.a. onwards" OR "10.50%-18.00% p.a. (based on credit profile)"
   - Include eligibility criteria if rate varies
✓ emi: CALCULATED monthly EMI
   - Use formula: EMI = [P × R × (1+R)^N] / [(1+R)^N-1]
   - Format: "₹16,134/month (for ₹5L @ 10.5% for 36 months)"
✓ fees: ALL charges clearly listed
   - Format: "Processing: 2% (min ₹2,000, max ₹10,000) + GST"
   - Include: Processing fee, prepayment charges, late payment penalty

LOAN CATEGORIES BY PURPOSE:
${productType === 'personal-loans' ? `
- Debt Consolidation: HDFC Bank Personal Loan, ICICI Bank Insta Personal Loan
- Medical Emergency: Bajaj Finserv Instant Personal Loan
- Wedding: SBI Xpress Credit, Axis Bank Personal Loan
- Home Renovation: Kotak Personal Loan
` : productType === 'home-loans' ? `
- Home Purchase: HDFC Home Loan, SBI Home Loan
- Home Construction: ICICI Bank Home Loan
- Plot Purchase: Axis Bank Home Loan
- Balance Transfer: Kotak Home Loan
` : productType === 'auto-loans' ? `
- New Car: HDFC Bank Car Loan, ICICI Bank Car Loan
- Used Car: SBI Used Car Loan
- Two-Wheeler: Bajaj Auto Finance
` : `
- Study Abroad: HDFC Credila, Axis Bank Education Loan
- Domestic Education: SBI Scholar Loan, ICICI Bank Education Loan
`}

INTEREST RATE FACTORS:
- CIBIL Score: 750+ (best rates), 700-749 (standard), 650-699 (higher rates)
- Income Level: Higher income = lower rates
- Loan Amount: Larger amounts may get better rates
- Tenure: Shorter tenure may have lower rates

RETURN FORMAT - STRICT JSON ONLY:
{
  "recommendations": [
    {
      "rank": 1,
      "productName": "EXACT loan name from bank",
      "bankName": "Bank/NBFC name",
      "keyBenefits": [
        "Specific benefit (e.g., Instant approval in 10 minutes)",
        "Another benefit (e.g., No collateral required)",
        "Third benefit (e.g., Flexible tenure: 12-60 months)"
      ],
      "interestRate": "X.XX% p.a. onwards (or range based on profile)",
      "emi": "₹XX,XXX/month (for ₹${data.loanAmount || '5L'} @ X.X% for ${data.tenure || '36'} months)",
      "fees": "Processing: X% (min ₹XXX, max ₹XXX) + GST | Prepayment: X% if closed before X months",
      "applyUrl": "https://official-bank.com/loans/loan-type"
    },
    {
      "rank": 2,
      "productName": "Loan 2 - EXACT name",
      "bankName": "Bank",
      "keyBenefits": ["Benefit 1", "Benefit 2", "Benefit 3"],
      "interestRate": "X.XX% p.a.",
      "emi": "₹XX,XXX/month",
      "fees": "Processing + other charges",
      "applyUrl": "URL"
    },
    {
      "rank": 3,
      "productName": "Loan 3 - EXACT name",
      "bankName": "Bank",
      "keyBenefits": ["Benefit 1", "Benefit 2", "Benefit 3"],
      "interestRate": "X.XX% p.a.",
      "emi": "₹XX,XXX/month",
      "fees": "Processing + other charges",
      "applyUrl": "URL"
    }
  ],
  "comparisons": [
    {"bank": "Bank1", "product": "Loan1", "rate": "X.X% p.a.", "emi": "₹XX,XXX/month", "processing": "₹XXX", "benefits": "Key differentiator"},
    {"bank": "Bank2", "product": "Loan2", "rate": "X.X% p.a.", "emi": "₹XX,XXX/month", "processing": "₹XXX", "benefits": "Key differentiator"},
    {"bank": "Bank3", "product": "Loan3", "rate": "X.X% p.a.", "emi": "₹XX,XXX/month", "processing": "₹XXX", "benefits": "Key differentiator"}
  ],
  "insights": [
    "Why Loan 1 offers best value (e.g., Lowest total interest outgo of ₹XX,XXX)",
    "EMI comparison (e.g., Loan 1 EMI is ₹XXX lower than Loan 2)",
    "Eligibility advice (e.g., Your CIBIL score qualifies for best rates at Bank 1)"
  ]
}

VALIDATION CHECKLIST:
□ All 3 loans are ${loanType} only
□ All loan names are EXACT official names
□ All interest rates are current and verified
□ All EMIs are accurately calculated
□ All fees are clearly itemized
□ URLs point to official bank websites`;

        case 'mutual-funds':
          return `You are a mutual fund expert analyzing ONLY OFFICIAL AMC WEBSITES for Indian Mutual Funds.

USER REQUIREMENTS:
${userProfile}
Investment Amount: ${data.investmentAmount || '₹10,000/month (SIP)'}
Investment Goal: ${data.goal || 'Wealth creation'}
Risk Appetite: ${data.riskAppetite || 'Moderate'}
Time Horizon: ${data.timeHorizon || '5-7 years'}

SEARCH INSTRUCTIONS:
1. Search ONLY official websites: HDFC MF, ICICI Prudential MF, SBI MF, Axis MF, Kotak MF, Nippon India MF, Aditya Birla Sun Life MF
2. Product Type: MUTUAL FUND SCHEMES ONLY
3. Verify all data is current (December 2024/January 2025)
4. Use EXACT fund names with proper classification

DATA ACCURACY REQUIREMENTS:
✓ productName: EXACT official fund name (e.g., "HDFC Flexi Cap Fund - Direct Plan - Growth")
✓ bankName: Official AMC name (e.g., "HDFC Mutual Fund", "ICICI Prudential Mutual Fund")
✓ keyBenefits: Top 3 ACTUAL features with numbers
   - "3-year returns: 18.5% CAGR (as of Dec 2024)"
   - "5-year returns: 16.2% CAGR (as of Dec 2024)"
   - "AUM: ₹25,000 Crores | Fund Manager: [Name] (Experience: X years)"
   - "Sharpe Ratio: 1.25 | Standard Deviation: 12.5%"
✓ returns: EXACT historical returns
   - Format: "18.5% (3Y CAGR) | 16.2% (5Y CAGR)" OR "12.5% (1Y) | 15.8% (3Y) | 14.2% (5Y)"
   - Always specify time period and that these are past returns
✓ expenseRatio: Current expense ratio
   - Format: "0.85% (Direct Plan)" OR "1.95% (Regular Plan)"
✓ fees: Exit load and other charges
   - Format: "Exit load: 1% if redeemed within 1 year, Nil thereafter" OR "No exit load"

FUND CATEGORIES BY RISK:
- Low Risk: Liquid Funds, Ultra Short Duration, Short Duration, Banking & PSU Debt
- Moderate Risk: Corporate Bond, Dynamic Bond, Balanced Advantage, Conservative Hybrid
- High Risk: Large Cap, Flexi Cap, Multi Cap, Focused, Mid Cap, Small Cap, Sectoral/Thematic

FUND SELECTION BY GOAL:
${data.goal === 'retirement' ? `
- Retirement (Long-term): Flexi Cap, Multi Cap, Index Funds
- Examples: HDFC Flexi Cap, Parag Parikh Flexi Cap, Nifty 50 Index
` : data.goal === 'child-education' ? `
- Child Education (Medium to Long-term): Balanced Advantage, Hybrid Funds
- Examples: ICICI Prudential Balanced Advantage, HDFC Hybrid Equity
` : data.goal === 'wealth-creation' ? `
- Wealth Creation: Large Cap, Flexi Cap, Multi Cap
- Examples: Axis Bluechip, HDFC Flexi Cap, Parag Parikh Flexi Cap
` : `
- General: Based on risk appetite
- Conservative: Debt/Hybrid Funds
- Moderate: Balanced Advantage, Large Cap
- Aggressive: Mid Cap, Small Cap, Flexi Cap
`}

RETURN FORMAT - STRICT JSON ONLY:
{
  "recommendations": [
    {
      "rank": 1,
      "productName": "EXACT fund name - Plan type - Option (e.g., HDFC Flexi Cap Fund - Direct Plan - Growth)",
      "bankName": "AMC name (e.g., HDFC Mutual Fund)",
      "keyBenefits": [
        "Returns: XX.X% (3Y CAGR) | XX.X% (5Y CAGR) - as of Dec 2024",
        "AUM: ₹XX,XXX Cr | Fund Manager: [Name] | Risk: Moderate to High",
        "Portfolio: XX% Large Cap, XX% Mid Cap, XX% Small Cap | Top holdings: [Company names]"
      ],
      "returns": "XX.X% (1Y) | XX.X% (3Y CAGR) | XX.X% (5Y CAGR) - Past performance",
      "expenseRatio": "X.XX% (Direct Plan)",
      "fees": "Exit load: 1% if redeemed within 1 year, Nil thereafter",
      "applyUrl": "https://official-amc.com/mutual-funds/fund-name"
    },
    {
      "rank": 2,
      "productName": "Fund 2 - EXACT name with plan",
      "bankName": "AMC",
      "keyBenefits": ["Returns with numbers", "AUM and manager details", "Portfolio composition"],
      "returns": "XX% (1Y) | XX% (3Y) | XX% (5Y)",
      "expenseRatio": "X.XX%",
      "fees": "Exit load details",
      "applyUrl": "URL"
    },
    {
      "rank": 3,
      "productName": "Fund 3 - EXACT name with plan",
      "bankName": "AMC",
      "keyBenefits": ["Returns", "AUM/Manager", "Portfolio"],
      "returns": "XX% (1Y) | XX% (3Y) | XX% (5Y)",
      "expenseRatio": "X.XX%",
      "fees": "Exit load",
      "applyUrl": "URL"
    }
  ],
  "comparisons": [
    {"bank": "AMC1", "product": "Fund1", "rate": "XX% (3Y CAGR)", "fee": "X.XX% expense ratio", "benefits": "Category, AUM, Risk level"},
    {"bank": "AMC2", "product": "Fund2", "rate": "XX% (3Y CAGR)", "fee": "X.XX% expense ratio", "benefits": "Category, AUM, Risk level"},
    {"bank": "AMC3", "product": "Fund3", "rate": "XX% (3Y CAGR)", "fee": "X.XX% expense ratio", "benefits": "Category, AUM, Risk level"}
  ],
  "insights": [
    "Why Fund 1 is best for ${data.goal || 'your goal'} (e.g., Consistent outperformance vs benchmark)",
    "Risk-return analysis (e.g., Fund 1 offers XX% higher returns with only XX% more volatility)",
    "SIP recommendation (e.g., ₹10,000 monthly SIP for 10 years could grow to ₹XX Lakhs @ XX% CAGR)"
  ]
}

IMPORTANT DISCLAIMERS TO INCLUDE:
- "Past performance is not indicative of future returns"
- "Mutual fund investments are subject to market risks"
- "Please read the scheme information document carefully before investing"

VALIDATION CHECKLIST:
□ All 3 funds match user's risk appetite
□ All fund names include Plan type (Direct/Regular) and Option (Growth/Dividend)
□ All returns are actual historical data with dates
□ All expense ratios are current
□ All AMC names are official
□ URLs point to official AMC websites`;

        default:
          // Generic fallback for other products
          return `You are a financial product expert. Search ONLY OFFICIAL WEBSITES for current ${productName} offers from major Indian banks and financial institutions.

USER REQUIREMENTS:
${userProfile}

SEARCH INSTRUCTIONS:
1. Use ONLY official bank/financial institution websites
2. Verify all data is current (December 2024/January 2025)
3. Use EXACT product names as listed officially
4. Include specific numbers and details, not generic descriptions

RETURN FORMAT - STRICT JSON ONLY:
{
  "recommendations": [
    {
      "rank": 1,
      "productName": "EXACT official product name",
      "bankName": "Official institution name",
      "keyBenefits": ["Specific benefit 1 with numbers", "Specific benefit 2", "Specific benefit 3"],
      "fees": "Exact fees/charges",
      "applyUrl": "https://official-website.com/product-page"
    },
    {"rank": 2, "productName": "Product 2", "bankName": "Institution", "keyBenefits": ["B1", "B2", "B3"], "fees": "Fees", "applyUrl": "URL"},
    {"rank": 3, "productName": "Product 3", "bankName": "Institution", "keyBenefits": ["B1", "B2", "B3"], "fees": "Fees", "applyUrl": "URL"}
  ],
  "comparisons": [
    {"bank": "Institution1", "product": "Product1", "rate": "Rate/Price", "fee": "Fees", "benefits": "Key features"},
    {"bank": "Institution2", "product": "Product2", "rate": "Rate/Price", "fee": "Fees", "benefits": "Key features"},
    {"bank": "Institution3", "product": "Product3", "rate": "Rate/Price", "fee": "Fees", "benefits": "Key features"}
  ],
  "insights": ["Specific insight 1", "Specific insight 2", "Specific insight 3"]
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