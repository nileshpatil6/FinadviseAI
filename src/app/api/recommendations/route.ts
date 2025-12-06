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
        model: 'gemini-3-pro-preview',
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

          return `You are a financial product expert with MANDATORY access to ONLY OFFICIAL BANK WEBSITES for Indian ${cardType}.

⚠️ CRITICAL: You MUST search and use ONLY real, verified data from official bank websites. NEVER generate fake or placeholder data.
⚠️ CRITICAL: You MUST include at least ONE card from ICICI Bank in your recommendations.

USER REQUIREMENTS:
${userProfile}
${profileDetails}
Spending Categories: ${data.spendingPattern?.join(', ') || 'general spending'}
Card Preferences: ${data.cardPreference?.join(', ') || 'general benefits'}

MANDATORY SEARCH INSTRUCTIONS - NO EXCEPTIONS:
1. Use Google Search to find CURRENT data (December 2024 - January 2025) from ONLY these official websites:
   - HDFC Bank: https://www.hdfcbank.com/personal/pay/cards/credit-cards
   - ICICI Bank: https://www.icicibank.com/personal-banking/cards/credit-card (MANDATORY - must include at least 1 ICICI card)
   - SBI Card: https://www.sbicard.com/en/personal
   - Axis Bank: https://www.axisbank.com/retail/cards/credit-card
   - Kotak Mahindra: https://www.kotak.com/en/personal-banking/cards/credit-cards.html
   - American Express India: https://www.americanexpress.com/in/credit-cards/

2. Product Type: STRICTLY ${isBusiness ? 'Business/Corporate/Commercial Credit Cards ONLY' : 'Personal/Retail Credit Cards ONLY'}
   - ${isBusiness ? 'Examples: HDFC Business MoneyBack Card, ICICI Bank Coral Business Credit Card, Axis Bank Corporate Credit Card' : 'Examples: HDFC Regalia Gold Credit Card, ICICI Amazon Pay Credit Card, SBI SimplyCLICK Credit Card'}
   - DO NOT mix business and personal cards
   - EACH card must be from a DIFFERENT bank

3. VERIFY before responding:
   - Is this the EXACT official card name? (Check the bank's website)
   - Are these the CURRENT fees as of December 2024/January 2025?
   - Are these the ACTUAL reward rates listed on the official page?
   - Is the apply URL pointing to the official bank website?

DATA ACCURACY REQUIREMENTS - REAL DATA ONLY:
✓ productName: EXACT official card name including "Credit Card" suffix
   - Correct: "HDFC Bank Regalia Gold Credit Card"
   - Wrong: "HDFC Regalia" or "Regalia Card"

✓ bankName: Official bank name exactly as shown on their website
   - Use: "HDFC Bank", "ICICI Bank", "SBI Card", "Axis Bank", "Kotak Mahindra Bank", "American Express"

✓ keyBenefits: Top 3 ACTUAL benefits with SPECIFIC numbers from official website
   - ✅ CORRECT: "Earn 4 reward points per ₹150 spent on dining and movies"
   - ✅ CORRECT: "Complimentary airport lounge access - 8 domestic visits per year"
   - ✅ CORRECT: "Welcome bonus: 10,000 reward points on spending ₹1 lakh in first 90 days"
   - ❌ WRONG: "Good rewards on dining" (too vague)
   - ❌ WRONG: "Airport lounge access" (no numbers)
   - ❌ WRONG: "Attractive welcome offer" (no specifics)

✓ rewardRate: EXACT reward structure from official website
   - Format: "4 reward points per ₹150" OR "5% cashback on online shopping (capped at ₹500/month)" OR "2 air miles per ₹100"
   - Include ALL conditions and caps

✓ interestRate: Current APR from official website (as of Jan 2025)
   - Format: "3.5% per month (42% p.a.)" OR "3.25% - 3.75% per month (39% - 45% p.a.)"
   - Use the actual current rate, not outdated data

✓ fees: EXACT joining and annual fees with waiver conditions
   - Format: "₹2,500 joining + ₹2,500 annual (waived on annual spend of ₹3 lakhs)"
   - OR: "₹0 joining fee, ₹500 annual fee (waived on 4 transactions)"
   - OR: "Lifetime free"
   - Include all waiver conditions

✓ applyUrl: Direct link to official card application/details page
   - Must be official bank domain (.hdfcbank.com, .icicibank.com, etc.)

INCOME-BASED CARD SELECTION (use appropriate tier for user's income):
- Entry Level (₹25K-₹50K/month): SBI SimplyCLICK, Axis Flipkart, ICICI Amazon Pay, HDFC MoneyBack
- Mid Level (₹50K-₹1L/month): HDFC Millennia, ICICI Coral, Axis Ace, Kotak Essentia
- Premium (₹1L-₹2L/month): HDFC Regalia Gold, ICICI Sapphiro, SBI Elite, Axis Vistara
- Super Premium (>₹2L/month): HDFC Infinia, ICICI Emeralde Amex, SBI Aurum, Amex Platinum Reserve

CRITICAL REQUIREMENTS FOR YOUR RESPONSE:
🔴 Return EXACTLY 3 recommendations + EXACTLY 5 comparisons
🔴 At least ONE recommendation must be from ICICI Bank
🔴 Each recommendation must be from a DIFFERENT bank
🔴 ALL data must be REAL and VERIFIED from official sources
🔴 NO placeholder text, NO made-up numbers, NO generic descriptions

RETURN FORMAT - STRICT JSON ONLY (NO other text):
{
  "recommendations": [
    {
      "rank": 1,
      "productName": "EXACT official card name with 'Credit Card' suffix",
      "bankName": "Official bank name",
      "keyBenefits": [
        "Specific benefit with exact numbers (e.g., Earn 4 reward points per ₹150 on dining)",
        "Another specific benefit with numbers (e.g., Complimentary lounge access - 8 visits/year)",
        "Third specific benefit with numbers (e.g., Welcome bonus: 5,000 points on ₹50,000 spend)"
      ],
      "rewardRate": "Exact reward structure with caps (e.g., 4 points per ₹150 OR 1% cashback up to ₹500/month)",
      "interestRate": "X.X% per month (XX% p.a.)",
      "fees": "₹XXX joining + ₹XXX annual (exact waiver conditions) OR Lifetime free",
      "applyUrl": "https://www.officialbank.com/exact-card-page-url"
    },
    {
      "rank": 2,
      "productName": "Second card - EXACT official name with suffix",
      "bankName": "Different bank from rank 1",
      "keyBenefits": ["Benefit with numbers", "Benefit with numbers", "Benefit with numbers"],
      "rewardRate": "Exact rate with conditions",
      "interestRate": "X.X% per month (XX% p.a.)",
      "fees": "Exact fees with waiver details",
      "applyUrl": "https://official-bank-url"
    },
    {
      "rank": 3,
      "productName": "Third card - EXACT official name (must include at least 1 ICICI card in top 3)",
      "bankName": "Different bank from ranks 1 and 2",
      "keyBenefits": ["Benefit with numbers", "Benefit with numbers", "Benefit with numbers"],
      "rewardRate": "Exact rate",
      "interestRate": "X.X% per month (XX% p.a.)",
      "fees": "Exact fees",
      "applyUrl": "https://official-url"
    }
  ],
  "comparisons": [
    {"bank": "Bank 1", "product": "Card 1 exact name", "rewardRate": "Exact rate", "fee": "₹XXX", "benefits": "Top differentiator", "interestRate": "XX% p.a."},
    {"bank": "Bank 2", "product": "Card 2 exact name", "rewardRate": "Exact rate", "fee": "₹XXX", "benefits": "Top differentiator", "interestRate": "XX% p.a."},
    {"bank": "Bank 3", "product": "Card 3 exact name", "rewardRate": "Exact rate", "fee": "₹XXX", "benefits": "Top differentiator", "interestRate": "XX% p.a."},
    {"bank": "Bank 4 (DIFFERENT from top 3)", "product": "Card 4 exact name", "rewardRate": "Exact rate", "fee": "₹XXX", "benefits": "Top differentiator", "interestRate": "XX% p.a."},
    {"bank": "Bank 5 (DIFFERENT from all above)", "product": "Card 5 exact name", "rewardRate": "Exact rate", "fee": "₹XXX", "benefits": "Top differentiator", "interestRate": "XX% p.a."}
  ],
  "insights": [
    "Specific insight about why card 1 is best (e.g., HDFC Regalia offers highest reward rate of 4 points per ₹150 on dining vs Card 2's 2 points per ₹150)",
    "Comparison insight with exact numbers (e.g., Card 1 has ₹2,500 annual fee but waived on ₹3L spend, while Card 2 is lifetime free but offers 50% lower rewards)",
    "Actionable advice (e.g., Apply for Card 1 first as your CIBIL score of 750+ qualifies for premium approval)"
  ]
}

PRE-SUBMISSION VALIDATION CHECKLIST - VERIFY BEFORE RESPONDING:
□ All 3 recommendations are ${isBusiness ? 'BUSINESS' : 'PERSONAL'} credit cards ONLY (not debit cards, loans, or insurance)
□ At least ONE card from ICICI Bank is included in top 3 recommendations
□ Each of the 3 recommendations is from a DIFFERENT bank
□ EXACTLY 5 comparison entries are included (not 3, not 4, but 5)
□ All 5 comparison cards are from DIFFERENT banks
□ All card names are EXACT official names verified from bank websites
□ All numbers (fees, rates, rewards) are REAL and CURRENT (Jan 2025)
□ All benefits include SPECIFIC numbers and details (no vague descriptions)
□ All URLs point to official bank websites (.hdfcbank.com, .icicibank.com, etc.)
□ NO placeholder text like "TBD", "varies", "check website"
□ NO made-up or estimated data

⚠️ IF YOU CANNOT FIND REAL DATA: Return an error instead of making up data. NEVER fabricate information for financial products.`;

        case 'debit-cards':
          return `You are a financial product expert with MANDATORY access to ONLY OFFICIAL BANK WEBSITES for Indian Debit Cards.

⚠️ CRITICAL: You MUST search and use ONLY real, verified data from official bank websites. NEVER generate fake or placeholder data.
⚠️ CRITICAL: Return DEBIT CARDS ONLY, NOT credit cards.

USER REQUIREMENTS:
${userProfile}
Account Type Preference: ${data.accountType || 'Savings Account'}
Usage Pattern: ${data.usagePattern?.join(', ') || 'ATM withdrawals, online shopping'}

MANDATORY SEARCH INSTRUCTIONS - NO EXCEPTIONS:
1. Use Google Search to find CURRENT data (December 2024 - January 2025) from ONLY these official websites:
   - HDFC Bank: https://www.hdfcbank.com/personal/pay/cards/debit-cards
   - ICICI Bank: https://www.icicibank.com/personal-banking/cards/debit-card
   - SBI: https://sbi.co.in/web/personal-banking/debit-card
   - Axis Bank: https://www.axisbank.com/retail/cards/debit-card
   - Kotak Mahindra: https://www.kotak.com/en/personal-banking/cards/debit-cards.html

2. Product Type: STRICTLY DEBIT CARDS ONLY (NOT credit cards!)
   - ✅ CORRECT: "HDFC Bank EasyShop Platinum Debit Card", "ICICI Bank Coral Debit Card"
   - ❌ WRONG: Credit cards, loans, insurance
   - Each card must be from a DIFFERENT bank

3. VERIFY before responding:
   - Is this a DEBIT CARD? (Not a credit card!)
   - Are the fees CURRENT as of January 2025?
   - Are the benefits REAL and verified?
   - Is the apply URL pointing to the official bank website?

DATA ACCURACY REQUIREMENTS - REAL DATA ONLY:
✓ productName: EXACT official debit card name with "Debit Card" suffix
   - Correct: "HDFC Bank EasyShop Platinum Debit Card"
   - Correct: "ICICI Bank Coral Debit Card"

✓ bankName: Official bank name
   - Use: "HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Mahindra Bank"

✓ keyBenefits: Top 3 ACTUAL benefits with SPECIFIC numbers
   - ✅ CORRECT: "1% cashback on online spends (capped at ₹500/month)"
   - ✅ CORRECT: "Free unlimited ATM withdrawals at all banks nationwide"
   - ✅ CORRECT: "Complimentary personal accident insurance cover of ₹2 Lakhs"
   - ❌ WRONG: "Good cashback" (not specific)

✓ rewardRate: Cashback/reward structure if applicable
   - Format: "1% cashback on online transactions (max ₹500/month)" OR "₹10 cashback on bill payments above ₹500"

✓ fees: EXACT annual maintenance charges with waiver conditions
   - Format: "₹200 annual (waived on maintaining ₹25,000 quarterly average balance)"
   - OR: "₹0 for first year, ₹500 from second year onwards"
   - OR: "Lifetime free"

✓ applyUrl: Direct link to official debit card page
   - Must be official bank domain (.hdfcbank.com, .icicibank.com, etc.)

DEBIT CARD CATEGORIES (select appropriate for user):
- Basic (Entry-level): SBI Maestro, HDFC EasyShop, ICICI Expressions
- Mid-tier: HDFC Platinum, ICICI Coral, Axis Liberty
- Premium: Axis Burgundy, ICICI Rubyx, HDFC Preferred
- International Travel: HDFC Visa Signature, SBI Global International, ICICI Travel Debit Card

CRITICAL REQUIREMENTS FOR YOUR RESPONSE:
🔴 Return EXACTLY 3 recommendations + EXACTLY 5 comparisons
🔴 ALL products must be DEBIT CARDS ONLY (absolutely NOT credit cards!)
🔴 Each recommendation must be from a DIFFERENT bank
🔴 ALL data must be REAL and VERIFIED from official sources
🔴 NO placeholder text, NO generic descriptions

RETURN FORMAT - STRICT JSON ONLY (NO other text):
{
  "recommendations": [
    {
      "rank": 1,
      "productName": "EXACT debit card name with 'Debit Card' suffix",
      "bankName": "Official bank name",
      "keyBenefits": ["Specific benefit with numbers", "Specific benefit with numbers", "Specific benefit with numbers"],
      "rewardRate": "Exact cashback/reward structure (if any) OR 'No rewards program'",
      "fees": "₹XXX annual (exact waiver conditions) OR Lifetime free",
      "applyUrl": "https://official-bank.com/debit-cards/card-name"
    },
    {
      "rank": 2,
      "productName": "Debit Card 2 - EXACT name with suffix",
      "bankName": "Different bank from rank 1",
      "keyBenefits": ["Benefit with numbers", "Benefit with numbers", "Benefit with numbers"],
      "rewardRate": "Exact structure",
      "fees": "Exact fees with waiver details",
      "applyUrl": "https://official-url"
    },
    {
      "rank": 3,
      "productName": "Debit Card 3 - EXACT name with suffix",
      "bankName": "Different bank from ranks 1 and 2",
      "keyBenefits": ["Benefit 1", "Benefit 2", "Benefit 3"],
      "rewardRate": "Structure",
      "fees": "Fees",
      "applyUrl": "https://official-url"
    }
  ],
  "comparisons": [
    {"bank": "Bank 1", "product": "Debit Card 1 exact name", "rewardRate": "Exact rate/cashback", "fee": "₹XXX", "benefits": "Key differentiator"},
    {"bank": "Bank 2", "product": "Debit Card 2 exact name", "rewardRate": "Exact rate/cashback", "fee": "₹XXX", "benefits": "Key differentiator"},
    {"bank": "Bank 3", "product": "Debit Card 3 exact name", "rewardRate": "Exact rate/cashback", "fee": "₹XXX", "benefits": "Key differentiator"},
    {"bank": "Bank 4 (DIFFERENT from top 3)", "product": "Debit Card 4 exact name", "rewardRate": "Rate", "fee": "₹XXX", "benefits": "Key feature"},
    {"bank": "Bank 5 (DIFFERENT from all above)", "product": "Debit Card 5 exact name", "rewardRate": "Rate", "fee": "₹XXX", "benefits": "Key feature"}
  ],
  "insights": ["Specific insight 1", "Specific insight 2", "Specific insight 3"]
}

PRE-SUBMISSION VALIDATION CHECKLIST - VERIFY BEFORE RESPONDING:
□ All 3 recommendations are DEBIT CARDS ONLY (absolutely NOT credit cards!)
□ Each of the 3 recommendations is from a DIFFERENT bank
□ EXACTLY 5 comparison entries are included (not 3, not 4, but 5)
□ All 5 comparison cards are from DIFFERENT banks
□ All card names include "Debit Card" suffix and are verified official names
□ All fees and benefits are REAL and CURRENT (January 2025)
□ All URLs point to official bank websites
□ NO placeholder text or made-up data

⚠️ IF YOU CANNOT FIND REAL DEBIT CARD DATA: Return an error instead of making up data or returning credit cards. NEVER fabricate information.`;

        case 'health-insurance':
          return `You are a health insurance expert with MANDATORY access to ONLY OFFICIAL HEALTH INSURANCE COMPANY WEBSITES in India.

⚠️ CRITICAL: You MUST search and return ONLY HEALTH INSURANCE PLANS. DO NOT return credit cards, debit cards, loans, or any other financial products.
⚠️ CRITICAL: You MUST use ONLY real, verified data from official insurance company websites. NEVER generate fake or placeholder data.

USER REQUIREMENTS:
${userProfile}
Family Size: ${data.familySize || 'Individual'}
Sum Insured Required: ${data.sumInsured || '₹5 Lakhs'}
Premium Budget: ${data.premiumBudget || '₹10,000-20,000 annually'}
Required Coverage: ${data.addons?.join(', ') || 'Basic hospitalization'}

MANDATORY SEARCH INSTRUCTIONS - NO EXCEPTIONS:
1. Use Google Search to find CURRENT data (December 2024 - January 2025) from ONLY these official websites:
   - HDFC ERGO: https://www.hdfcergo.com/health-insurance
   - ICICI Lombard: https://www.icicilombard.com/health-insurance
   - Star Health Insurance: https://www.starhealth.in/health-insurance
   - Care Health Insurance: https://www.careinsurance.com/health-insurance-plans.html
   - Max Bupa: https://www.maxbupa.com/health-insurance
   - Niva Bupa: https://www.nivabupa.com/health-insurance-plans.html
   - Aditya Birla Health: https://health.adityabirlacapital.com/health-insurance-plans

2. Product Type: STRICTLY HEALTH INSURANCE PLANS ONLY
   - ✅ CORRECT: "HDFC ERGO Optima Secure", "Star Comprehensive Insurance Policy", "Care Supreme"
   - ❌ WRONG: Credit cards, debit cards, loans, life insurance, auto insurance
   - Each plan must be from a DIFFERENT insurance company

3. VERIFY before responding:
   - Is this a HEALTH INSURANCE PLAN? (Not a credit card or other product)
   - Is the premium amount REAL and CURRENT as of January 2025?
   - Is the network hospital count verified from the official website?
   - Is the apply URL pointing to the official insurance company website?

DATA ACCURACY REQUIREMENTS - REAL DATA ONLY:
✓ productName: EXACT official health insurance plan name
   - Correct: "HDFC ERGO Optima Secure Plan"
   - Correct: "Star Comprehensive Insurance Policy"
   - Wrong: "HDFC Credit Card" (this is NOT health insurance!)

✓ bankName: Official insurance company name
   - Use: "HDFC ERGO", "ICICI Lombard", "Star Health Insurance", "Care Health Insurance", "Max Bupa", "Niva Bupa", "Aditya Birla Health Insurance"
   - NOT bank names like "HDFC Bank" or "ICICI Bank"

✓ keyBenefits: Top 3 ACTUAL features with SPECIFIC numbers from official website
   - ✅ CORRECT: "Network: 14,000+ cashless hospitals across India"
   - ✅ CORRECT: "Room rent: Single private AC room (no capping)"
   - ✅ CORRECT: "No claim bonus: 50% increase in sum insured every claim-free year (up to 100%)"
   - ✅ CORRECT: "Pre-hospitalization: 60 days, Post-hospitalization: 180 days"
   - ❌ WRONG: "Good hospital network" (no numbers)
   - ❌ WRONG: "Rewards on spending" (this is credit card language, NOT insurance!)

✓ premium: EXACT annual premium from official website calculator
   - Format: "₹8,450 per year (30-year-old individual, ₹5L cover)"
   - Format: "₹15,200 per year (35-year-old + spouse, ₹10L cover)"
   - Must include age and family structure context
   - Use REAL current premiums (January 2025)

✓ coverage: Sum insured amount
   - Format: "₹5 Lakhs" OR "₹10 Lakhs" OR "₹25 Lakhs" OR "₹50 Lakhs" OR "₹1 Crore"

✓ fees: Any additional charges or co-payment details
   - "No hidden charges" OR "Co-payment: 10% for senior citizens" OR "Deductible: ₹25,000 per claim"

✓ applyUrl: Direct link to official insurance plan page
   - Must be official insurer domain (.hdfcergo.com, .starhealth.in, etc.)

PLAN CATEGORIES BY COVERAGE (select appropriate for user's requirement):
- Basic (₹3-5 Lakhs): Star Young Star Insurance, Care Freedom Plan
- Standard (₹5-10 Lakhs): HDFC ERGO Optima Secure, ICICI Lombard Complete Health Insurance
- Premium (₹10-25 Lakhs): Max Bupa Health Companion, Niva Bupa ReAssure
- Super Premium (₹25L-1Cr): Star Comprehensive Insurance Policy, Care Supreme

MANDATORY FEATURES TO INCLUDE IN BENEFITS:
- Network hospital count (e.g., "14,000+ cashless hospitals")
- Room rent limits (e.g., "Single private AC, no capping" OR "₹10,000 per day limit")
- Pre/post hospitalization coverage (e.g., "60 days pre, 180 days post")
- No claim bonus (e.g., "50% increase per claim-free year, up to 100%")
- Restoration benefit if available
- Daycare procedures coverage

CRITICAL REQUIREMENTS FOR YOUR RESPONSE:
🔴 Return EXACTLY 3 recommendations + EXACTLY 5 comparisons
🔴 ALL products must be HEALTH INSURANCE PLANS ONLY (absolutely NO credit cards, loans, or other products)
🔴 Each recommendation must be from a DIFFERENT insurance company
🔴 ALL data must be REAL and VERIFIED from official insurance company sources
🔴 ALL premiums must be REAL current rates (not estimated or made-up)
🔴 NO placeholder text, NO generic descriptions

RETURN FORMAT - STRICT JSON ONLY (NO other text):
{
  "recommendations": [
    {
      "rank": 1,
      "productName": "EXACT official health insurance plan name",
      "bankName": "Insurance company name (NOT a bank name!)",
      "keyBenefits": [
        "Network: X,XXX+ cashless hospitals across India",
        "Room rent: Specific limit with numbers (e.g., Single private AC, no capping)",
        "No claim bonus: XX% increase per claim-free year (max XX%)"
      ],
      "premium": "₹XX,XXX per year (specify exact age/family: e.g., 30-year-old individual, ₹5L cover)",
      "coverage": "₹XX Lakhs",
      "fees": "No hidden charges OR exact co-payment/deductible details",
      "applyUrl": "https://official-insurer.com/health-insurance/plan-name"
    },
    {
      "rank": 2,
      "productName": "Health Insurance Plan 2 - EXACT name",
      "bankName": "Different insurance company from rank 1",
      "keyBenefits": ["Network details with numbers", "Room rent with specifics", "NCB or restoration benefit"],
      "premium": "₹XX,XXX per year (age/family details)",
      "coverage": "₹XX Lakhs",
      "fees": "Exact details",
      "applyUrl": "https://official-insurer-url"
    },
    {
      "rank": 3,
      "productName": "Health Insurance Plan 3 - EXACT name",
      "bankName": "Different insurance company from ranks 1 and 2",
      "keyBenefits": ["Network count", "Room rent details", "Pre/post hospitalization days"],
      "premium": "₹XX,XXX per year (age/family)",
      "coverage": "₹XX Lakhs",
      "fees": "Details",
      "applyUrl": "https://official-url"
    }
  ],
  "comparisons": [
    {"bank": "Insurer 1", "product": "Health Plan 1 exact name", "rate": "₹XX,XXX/year", "fee": "₹XX L coverage", "benefits": "Network: X,XXX hospitals, Room: specifics, NCB: XX%"},
    {"bank": "Insurer 2", "product": "Health Plan 2 exact name", "rate": "₹XX,XXX/year", "fee": "₹XX L coverage", "benefits": "Network: X,XXX hospitals, Room: specifics, NCB: XX%"},
    {"bank": "Insurer 3", "product": "Health Plan 3 exact name", "rate": "₹XX,XXX/year", "fee": "₹XX L coverage", "benefits": "Network: X,XXX hospitals, Room: specifics, NCB: XX%"},
    {"bank": "Insurer 4 (DIFFERENT from top 3)", "product": "Health Plan 4 exact name", "rate": "₹XX,XXX/year", "fee": "₹XX L coverage", "benefits": "Key features with numbers"},
    {"bank": "Insurer 5 (DIFFERENT from all above)", "product": "Health Plan 5 exact name", "rate": "₹XX,XXX/year", "fee": "₹XX L coverage", "benefits": "Key features with numbers"}
  ],
  "insights": [
    "Why Plan 1 is best for this user's age/family structure (e.g., Plan 1 offers best value with ₹8,450 premium for ₹5L cover vs Plan 2's ₹10,200 for same coverage)",
    "Network and coverage comparison (e.g., Plan 1 has 14,000+ hospitals vs Plan 2's 10,000, providing wider access)",
    "Specific add-on recommendation (e.g., Consider adding Critical Illness cover for ₹2,000 extra given your age of 35)"
  ]
}

PRE-SUBMISSION VALIDATION CHECKLIST - VERIFY BEFORE RESPONDING:
□ All 3 recommendations are HEALTH INSURANCE PLANS ONLY (absolutely NOT credit cards, debit cards, or loans!)
□ Each of the 3 recommendations is from a DIFFERENT insurance company
□ EXACTLY 5 comparison entries are included (not 3, not 4, but 5)
□ All 5 comparison plans are from DIFFERENT insurance companies
□ All plan names are EXACT official names verified from insurance company websites
□ All premiums are REAL current rates (January 2025) with age/family context
□ All benefits include SPECIFIC numbers (hospital count, room rent limits, NCB percentages)
□ All network hospital counts are accurate and verified
□ All URLs point to official insurance company websites (NOT bank websites)
□ NO placeholder text like "TBD", "competitive rates", "check website"
□ NO made-up or estimated data
□ NO credit card or loan terminology (rewards, EMI, interest rate, cashback)

⚠️ IF YOU CANNOT FIND REAL HEALTH INSURANCE DATA: Return an error instead of making up data or returning credit cards. NEVER fabricate information or return wrong product types.`;


        case 'personal-loans':
        case 'home-loans':
        case 'auto-loans':
        case 'education-loans':
          const loanType = productType.replace('-', ' ').toUpperCase();
          return `You are a loan expert with MANDATORY access to ONLY OFFICIAL BANK WEBSITES for Indian ${loanType}.

⚠️ CRITICAL: You MUST search and use ONLY real, verified data from official bank/NBFC websites. NEVER generate fake or placeholder data.
⚠️ CRITICAL: ALL EMI calculations MUST be accurate using the actual loan formula. Never estimate or make up EMI amounts.

USER REQUIREMENTS:
${userProfile}
Loan Amount: ${data.loanAmount || '₹5,00,000'}
Tenure: ${data.tenure || '3 years (36 months)'}
Monthly Income: ${data.monthlyIncome || '₹60,000'}
Purpose: ${data.purpose || 'General'}

MANDATORY SEARCH INSTRUCTIONS - NO EXCEPTIONS:
1. Use Google Search to find CURRENT data (December 2024 - January 2025) from ONLY these official websites:
   - HDFC Bank: https://www.hdfcbank.com/personal/borrow/popular-loans
   - ICICI Bank: https://www.icicibank.com/personal-banking/loans
   - SBI: https://sbi.co.in/web/personal-banking/loans
   - Axis Bank: https://www.axisbank.com/retail/loans
   - Kotak Mahindra Bank: https://www.kotak.com/en/personal-banking/loans.html
   - Bajaj Finserv: https://www.bajajfinserv.in/loans

2. Product Type: STRICTLY ${loanType} ONLY
   - ✅ CORRECT: ${productType === 'personal-loans' ? '"HDFC Bank Personal Loan", "ICICI Bank Insta Personal Loan", "SBI Xpress Credit Personal Loan"' : productType === 'home-loans' ? '"HDFC Home Loan", "SBI MaxGain Home Loan", "ICICI Bank Home Loan"' : productType === 'auto-loans' ? '"HDFC Bank Car Loan", "SBI New Car Loan", "ICICI Bank Auto Loan"' : '"HDFC Credila Education Loan", "SBI Scholar Loan", "Axis Bank Education Loan"'}
   - ❌ WRONG: Credit cards, debit cards, insurance, other loan types
   - Each loan must be from a DIFFERENT bank/NBFC

3. VERIFY before responding:
   - Is this the EXACT official loan product name?
   - Is the interest rate CURRENT as of January 2025?
   - Is the EMI ACCURATELY calculated using the correct formula?
   - Are the processing fees REAL and verified?
   - Is the apply URL pointing to the official lender website?

DATA ACCURACY REQUIREMENTS - REAL DATA ONLY:
✓ productName: EXACT official loan product name
   - Correct: "HDFC Bank Personal Loan", "SBI Xpress Credit Personal Loan"
   - Include full official name as shown on bank website

✓ bankName: Official bank/NBFC name
   - Use: "HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Mahindra Bank", "Bajaj Finserv"

✓ keyBenefits: Top 3 ACTUAL features with SPECIFIC details from official website
   - ✅ CORRECT: "Instant approval within 10 minutes"
   - ✅ CORRECT: "No collateral or guarantor required"
   - ✅ CORRECT: "Flexible repayment tenure: 12 to 60 months"
   - ✅ CORRECT: "Top-up facility available after 6 months of regular payments"
   - ❌ WRONG: "Quick approval" (not specific)
   - ❌ WRONG: "Flexible repayment" (no details)

✓ interestRate: EXACT current interest rate from official website (January 2025)
   - Format: "10.50% p.a. onwards" OR "10.50% - 18.00% p.a. (based on credit profile)"
   - Include eligibility-based variations if applicable
   - Use REAL current rates, not outdated or estimated rates

✓ emi: ACCURATELY CALCULATED monthly EMI - NEVER ESTIMATE
   - Formula: EMI = [P × R × (1+R)^N] / [(1+R)^N-1]
   - Where: P = Principal (loan amount), R = Monthly interest rate (annual rate / 12 / 100), N = Tenure in months
   - Format: "₹16,134/month (for ₹5L @ 10.5% p.a. for 36 months)"
   - MUST calculate precisely - do not round or estimate
   - Include loan amount, interest rate, and tenure in context

✓ fees: ALL charges clearly itemized from official website
   - Format: "Processing: 2% of loan amount (min ₹2,000, max ₹10,000) + GST"
   - Include: Processing fee, prepayment charges, late payment charges
   - Example: "Processing: ₹5,000 + GST | Prepayment: 2% if closed before 12 months | Late payment: ₹500"

✓ applyUrl: Direct link to official loan product page
   - Must be official lender domain (.hdfcbank.com, .sbi.co.in, etc.)

LOAN CATEGORIES BY PURPOSE (select appropriate for user's requirement):
${productType === 'personal-loans' ? `
- Debt Consolidation: HDFC Bank Personal Loan, ICICI Bank Insta Personal Loan
- Medical Emergency: Bajaj Finserv Instant Personal Loan, Axis Bank Personal Loan
- Wedding: SBI Xpress Credit, Kotak Personal Loan
- Home Renovation: HDFC Bank Personal Loan, ICICI Bank Personal Loan
- Travel: Axis Bank Personal Loan, Kotak Travel Loan
` : productType === 'home-loans' ? `
- Home Purchase: HDFC Home Loan, SBI MaxGain Home Loan, ICICI Bank Home Loan
- Home Construction: Axis Bank Home Loan, Kotak Home Loan
- Plot Purchase: HDFC Plot Loan, SBI Plot Loan
- Balance Transfer: ICICI Bank Home Loan Balance Transfer, Axis BT
- Extension/Renovation: HDFC Home Improvement Loan
` : productType === 'auto-loans' ? `
- New Car: HDFC Bank Car Loan, SBI New Car Loan, ICICI Bank Auto Loan
- Used Car: Axis Bank Used Car Loan, HDFC Pre-Owned Car Loan
- Two-Wheeler: Bajaj Auto Finance, HDFC Two-Wheeler Loan
- Electric Vehicle: SBI EV Loan, ICICI Green Car Loan
` : `
- Study Abroad: HDFC Credila Education Loan, Axis Bank Vidya Loan
- Domestic Education: SBI Scholar Loan, ICICI Bank Education Loan
- Vocational Courses: Bajaj Finserv Career Loan, Kotak Education Loan
`}

INTEREST RATE FACTORS (use to determine appropriate products):
- CIBIL Score: 750+ (best rates: 10-11%), 700-749 (standard: 12-14%), 650-699 (higher: 15-18%)
- Income Level: Higher income = lower rates (better negotiation power)
- Loan Amount: ₹1L-5L (standard rates), ₹5L-20L (better rates), >₹20L (best rates)
- Tenure: 12-24 months (lower rates), 36-48 months (standard), 60 months (slightly higher)

CRITICAL REQUIREMENTS FOR YOUR RESPONSE:
🔴 Return EXACTLY 3 recommendations + EXACTLY 5 comparisons
🔴 ALL products must be ${loanType} ONLY (not other loan types or financial products)
🔴 Each recommendation must be from a DIFFERENT bank/NBFC
🔴 ALL data must be REAL and VERIFIED from official sources
🔴 ALL EMI calculations must be ACCURATE (use the exact formula)
🔴 ALL interest rates must be CURRENT (January 2025)
🔴 NO placeholder text, NO estimated numbers

RETURN FORMAT - STRICT JSON ONLY (NO other text):
{
  "recommendations": [
    {
      "rank": 1,
      "productName": "EXACT official loan product name from bank website",
      "bankName": "Bank/NBFC name",
      "keyBenefits": [
        "Specific benefit with details (e.g., Instant approval in 10 minutes)",
        "Another benefit (e.g., No collateral or guarantor required)",
        "Third benefit (e.g., Flexible tenure: 12-60 months with part-prepayment option)"
      ],
      "interestRate": "X.XX% p.a. onwards (or X.XX% - X.XX% p.a. based on credit profile)",
      "emi": "₹XX,XXX/month (for ₹${data.loanAmount || '5L'} @ X.X% p.a. for ${data.tenure || '36 months'}) - MUST BE ACCURATELY CALCULATED",
      "fees": "Processing: X% of loan (min ₹XXX, max ₹XXX) + GST | Prepayment: X% if closed before X months | Late payment: ₹XXX",
      "applyUrl": "https://official-bank.com/loans/loan-type"
    },
    {
      "rank": 2,
      "productName": "Loan 2 - EXACT official name",
      "bankName": "Different bank from rank 1",
      "keyBenefits": ["Benefit with details", "Benefit with details", "Benefit with details"],
      "interestRate": "X.XX% p.a. onwards",
      "emi": "₹XX,XXX/month (accurately calculated for same amount and tenure)",
      "fees": "Complete fee breakdown",
      "applyUrl": "https://official-url"
    },
    {
      "rank": 3,
      "productName": "Loan 3 - EXACT official name",
      "bankName": "Different bank from ranks 1 and 2",
      "keyBenefits": ["Benefit 1", "Benefit 2", "Benefit 3"],
      "interestRate": "X.XX% p.a.",
      "emi": "₹XX,XXX/month (accurate calculation)",
      "fees": "Fee details",
      "applyUrl": "https://official-url"
    }
  ],
  "comparisons": [
    {"bank": "Bank 1", "product": "Loan 1 exact name", "rate": "X.XX% p.a.", "emi": "₹XX,XXX/month", "processing": "₹XXX + GST", "benefits": "Key differentiator (e.g., Lowest EMI, Fastest approval)"},
    {"bank": "Bank 2", "product": "Loan 2 exact name", "rate": "X.XX% p.a.", "emi": "₹XX,XXX/month", "processing": "₹XXX + GST", "benefits": "Key differentiator"},
    {"bank": "Bank 3", "product": "Loan 3 exact name", "rate": "X.XX% p.a.", "emi": "₹XX,XXX/month", "processing": "₹XXX + GST", "benefits": "Key differentiator"},
    {"bank": "Bank 4 (DIFFERENT from top 3)", "product": "Loan 4 exact name", "rate": "X.XX% p.a.", "emi": "₹XX,XXX/month", "processing": "₹XXX + GST", "benefits": "Key feature"},
    {"bank": "Bank 5 (DIFFERENT from all above)", "product": "Loan 5 exact name", "rate": "X.XX% p.a.", "emi": "₹XX,XXX/month", "processing": "₹XXX + GST", "benefits": "Key feature"}
  ],
  "insights": [
    "Why Loan 1 offers best value (e.g., Loan 1 has lowest total interest outgo of ₹45,824 vs Loan 2's ₹58,450 over 36 months)",
    "EMI comparison with exact numbers (e.g., Loan 1 EMI is ₹350 lower per month than Loan 2, saving ₹12,600 over loan tenure)",
    "Eligibility advice (e.g., Your CIBIL score of 750+ qualifies for best rates at Bank 1; apply there first for 10.50% vs Bank 2's 12.50%)"
  ]
}

PRE-SUBMISSION VALIDATION CHECKLIST - VERIFY BEFORE RESPONDING:
□ All 3 recommendations are ${loanType} ONLY (not other loan types, cards, or insurance)
□ Each of the 3 recommendations is from a DIFFERENT bank/NBFC
□ EXACTLY 5 comparison entries are included (not 3, not 4, but 5)
□ All 5 comparison loans are from DIFFERENT lenders
□ All loan names are EXACT official names verified from bank websites
□ All interest rates are REAL current rates (January 2025)
□ ALL EMI amounts are ACCURATELY CALCULATED using the loan formula (not estimated!)
□ All processing fees and charges are clearly itemized and verified
□ All URLs point to official bank/NBFC websites
□ NO placeholder text like "TBD", "competitive rates", "check with bank"
□ NO made-up or estimated data, especially EMI amounts

⚠️ IF YOU CANNOT FIND REAL DATA OR ACCURATELY CALCULATE EMI: Return an error instead of making up data. NEVER fabricate loan information or use estimated EMI amounts.`;

        case 'mutual-funds':
          return `You are a mutual fund expert with MANDATORY access to ONLY OFFICIAL AMC WEBSITES for Indian Mutual Funds.

⚠️ CRITICAL: You MUST search and use ONLY real, verified historical return data from official AMC websites. NEVER generate fake or estimated returns.
⚠️ CRITICAL: ALL returns data must be ACTUAL past performance as of December 2024/January 2025. Never make up return percentages.

USER REQUIREMENTS:
${userProfile}
Investment Amount: ${data.investmentAmount || '₹10,000/month (SIP)'}
Investment Goal: ${data.goal || 'Wealth creation'}
Risk Appetite: ${data.riskAppetite || 'Moderate'}
Time Horizon: ${data.timeHorizon || '5-7 years'}

MANDATORY SEARCH INSTRUCTIONS - NO EXCEPTIONS:
1. Use Google Search to find CURRENT data (December 2024 - January 2025) from ONLY these official websites:
   - HDFC Mutual Fund: https://www.hdfcfund.com/
   - ICICI Prudential MF: https://www.icicipruamc.com/
   - SBI Mutual Fund: https://www.sbimf.com/
   - Axis Mutual Fund: https://www.axismf.com/
   - Kotak Mutual Fund: https://www.kotakmf.com/
   - Nippon India MF: https://mf.nipponindiaim.com/
   - Aditya Birla Sun Life MF: https://mutualfund.adityabirlacapital.com/
   - Parag Parikh Mutual Fund: https://www.ppfas.com/
   - Mirae Asset MF: https://www.miraeassetmf.co.in/

2. Product Type: STRICTLY MUTUAL FUND SCHEMES ONLY
   - ✅ CORRECT: "HDFC Flexi Cap Fund - Direct Plan - Growth", "Axis Bluechip Fund - Direct Plan - Growth"
   - ❌ WRONG: Credit cards, loans, insurance, debit cards
   - Each fund must be from a DIFFERENT AMC (Asset Management Company)

3. VERIFY before responding:
   - Is this a MUTUAL FUND SCHEME? (Not a credit card or other product)
   - Are the returns REAL historical data as of Dec 2024/Jan 2025?
   - Is the expense ratio CURRENT and verified?
   - Does the fund name include Plan type (Direct/Regular) and Option (Growth/Dividend)?
   - Is the apply URL pointing to the official AMC website?

DATA ACCURACY REQUIREMENTS - REAL DATA ONLY:
✓ productName: EXACT official fund name with COMPLETE details
   - Correct: "HDFC Flexi Cap Fund - Direct Plan - Growth"
   - Correct: "Axis Bluechip Fund - Direct Plan - Growth"
   - Correct: "Parag Parikh Flexi Cap Fund - Direct Plan - Growth"
   - MUST include: Fund Name + Plan Type (Direct/Regular) + Option (Growth/Dividend/IDCW)

✓ bankName: Official AMC name
   - Use: "HDFC Mutual Fund", "ICICI Prudential Mutual Fund", "SBI Mutual Fund", "Axis Mutual Fund", "Kotak Mutual Fund", "Parag Parikh Mutual Fund"
   - NOT bank names like "HDFC Bank" or "Axis Bank"

✓ keyBenefits: Top 3 ACTUAL features with SPECIFIC REAL numbers from official NAV/factsheet
   - ✅ CORRECT: "3-year CAGR: 18.5% (as of 31-Dec-2024)"
   - ✅ CORRECT: "5-year CAGR: 16.2% (as of 31-Dec-2024)"
   - ✅ CORRECT: "AUM: ₹25,432 Crores | Fund Manager: [Actual Name] (Experience: 15 years)"
   - ✅ CORRECT: "Portfolio: 45% Large Cap, 35% Mid Cap, 20% Small Cap | Top holding: Reliance Industries (8.5%)"
   - ❌ WRONG: "Good returns" (not specific)
   - ❌ WRONG: "High AUM" (no numbers)
   - ❌ WRONG: Made-up return percentages

✓ returns: EXACT historical returns from official factsheet/NAV data
   - Format: "12.5% (1Y) | 18.2% (3Y CAGR) | 16.5% (5Y CAGR) - As of 31-Dec-2024"
   - MUST specify data date (e.g., "as of 31-Dec-2024")
   - MUST be REAL historical performance, not estimated
   - Include disclaimer: "Past performance"

✓ expenseRatio: Current expense ratio from official factsheet
   - Format: "0.45% (Direct Plan)" OR "Direct: 0.45%, Regular: 1.85%"
   - Use REAL current expense ratio (January 2025)

✓ fees: Exit load and other charges from scheme document
   - Format: "Exit load: 1% if redeemed within 1 year, Nil thereafter"
   - OR: "No exit load"
   - OR: "Exit load: 0.5% within 30 days, Nil thereafter"

✓ applyUrl: Direct link to official fund page on AMC website
   - Must be official AMC domain (.hdfcfund.com, .axismf.com, etc.)

FUND CATEGORIES BY RISK (select appropriate for user's risk appetite):
- Low Risk (Conservative): Liquid Funds, Overnight Funds, Ultra Short Duration, Short Duration, Banking & PSU Debt
- Moderate Risk: Corporate Bond, Dynamic Bond, Balanced Advantage, Conservative Hybrid, Large Cap
- High Risk (Aggressive): Flexi Cap, Multi Cap, Focused Funds, Mid Cap, Small Cap, Sectoral/Thematic

FUND SELECTION BY GOAL (select appropriate for user's investment goal):
${data.goal === 'retirement' ? `
- Retirement (Long-term 15+ years): Flexi Cap, Multi Cap, Index Funds
- Examples: HDFC Flexi Cap Fund, Parag Parikh Flexi Cap Fund, UTI Nifty 50 Index Fund
` : data.goal === 'child-education' ? `
- Child Education (Medium to Long-term 5-15 years): Balanced Advantage, Hybrid Equity Funds
- Examples: ICICI Prudential Balanced Advantage Fund, HDFC Hybrid Equity Fund
` : data.goal === 'wealth-creation' ? `
- Wealth Creation (5-10 years): Large Cap, Flexi Cap, Multi Cap
- Examples: Axis Bluechip Fund, HDFC Flexi Cap Fund, Parag Parikh Flexi Cap Fund
` : `
- General: Based on risk appetite
- Conservative: Debt Funds, Hybrid Funds
- Moderate: Balanced Advantage, Large Cap, Index Funds
- Aggressive: Mid Cap, Small Cap, Flexi Cap, Sectoral Funds
`}

CRITICAL REQUIREMENTS FOR YOUR RESPONSE:
🔴 Return EXACTLY 3 recommendations + EXACTLY 5 comparisons
🔴 ALL products must be MUTUAL FUND SCHEMES ONLY (not credit cards, loans, or insurance!)
🔴 Each recommendation must be from a DIFFERENT AMC
🔴 ALL returns data must be REAL historical performance (not estimated or made-up)
🔴 ALL fund names must include Plan Type (Direct/Regular) and Option (Growth/Dividend)
🔴 ALL data must be VERIFIED from official AMC sources
🔴 NO placeholder text, NO generic descriptions

RETURN FORMAT - STRICT JSON ONLY (NO other text):
{
  "recommendations": [
    {
      "rank": 1,
      "productName": "EXACT fund name - Plan Type - Option (e.g., HDFC Flexi Cap Fund - Direct Plan - Growth)",
      "bankName": "AMC name (e.g., HDFC Mutual Fund)",
      "keyBenefits": [
        "3-year CAGR: XX.X% | 5-year CAGR: XX.X% (as of 31-Dec-2024) - Past performance",
        "AUM: ₹XX,XXX Crores | Fund Manager: [Actual Name] | Expense Ratio: X.XX%",
        "Portfolio: XX% Large Cap, XX% Mid Cap, XX% Small Cap | Top 3 holdings: [Actual company names]"
      ],
      "returns": "XX.X% (1Y) | XX.X% (3Y CAGR) | XX.X% (5Y CAGR) - As of 31-Dec-2024 - Past performance",
      "expenseRatio": "X.XX% (Direct Plan)",
      "fees": "Exit load: 1% if redeemed within 1 year, Nil thereafter",
      "applyUrl": "https://official-amc.com/fund-details/fund-name"
    },
    {
      "rank": 2,
      "productName": "Fund 2 - EXACT name - Plan - Option",
      "bankName": "Different AMC from rank 1",
      "keyBenefits": ["Returns with actual numbers and date", "AUM and fund manager details", "Portfolio composition with percentages"],
      "returns": "XX.X% (1Y) | XX.X% (3Y CAGR) | XX.X% (5Y CAGR) - As of 31-Dec-2024",
      "expenseRatio": "X.XX% (Direct)",
      "fees": "Exit load details",
      "applyUrl": "https://official-amc-url"
    },
    {
      "rank": 3,
      "productName": "Fund 3 - EXACT name - Plan - Option",
      "bankName": "Different AMC from ranks 1 and 2",
      "keyBenefits": ["Returns with numbers", "AUM/Manager", "Portfolio composition"],
      "returns": "XX.X% (1Y) | XX.X% (3Y) | XX.X% (5Y) - As of Dec 2024",
      "expenseRatio": "X.XX%",
      "fees": "Exit load",
      "applyUrl": "https://official-url"
    }
  ],
  "comparisons": [
    {"bank": "AMC 1", "product": "Fund 1 - Direct - Growth", "rate": "XX.X% (3Y CAGR)", "fee": "X.XX% expense ratio", "benefits": "Category: Flexi Cap | AUM: ₹XX,XXX Cr | Risk: High"},
    {"bank": "AMC 2", "product": "Fund 2 - Direct - Growth", "rate": "XX.X% (3Y CAGR)", "fee": "X.XX% expense ratio", "benefits": "Category: Large Cap | AUM: ₹XX,XXX Cr | Risk: Moderate"},
    {"bank": "AMC 3", "product": "Fund 3 - Direct - Growth", "rate": "XX.X% (3Y CAGR)", "fee": "X.XX% expense ratio", "benefits": "Category: Multi Cap | AUM: ₹XX,XXX Cr | Risk: High"},
    {"bank": "AMC 4 (DIFFERENT from top 3)", "product": "Fund 4 - Direct - Growth", "rate": "XX.X% (3Y CAGR)", "fee": "X.XX% expense ratio", "benefits": "Category and risk details"},
    {"bank": "AMC 5 (DIFFERENT from all above)", "product": "Fund 5 - Direct - Growth", "rate": "XX.X% (3Y CAGR)", "fee": "X.XX% expense ratio", "benefits": "Category and risk details"}
  ],
  "insights": [
    "Why Fund 1 is best for ${data.goal || 'your goal'} (e.g., Fund 1 has consistently outperformed its benchmark Nifty 500 by 2.5% annually over 5 years)",
    "Risk-return analysis with actual numbers (e.g., Fund 1 offers 18.5% 3Y CAGR with 12.5% standard deviation vs Fund 2's 16.2% returns with 15% volatility - better risk-adjusted returns)",
    "SIP projection with calculation (e.g., ₹10,000 monthly SIP in Fund 1 for 10 years could grow to ₹23.5 Lakhs assuming 15% CAGR, vs ₹1.2L total investment)"
  ]
}

MANDATORY DISCLAIMERS (include in insights):
- "Past performance is not indicative of future returns"
- "Mutual fund investments are subject to market risks"
- "Please read the scheme information document carefully before investing"

PRE-SUBMISSION VALIDATION CHECKLIST - VERIFY BEFORE RESPONDING:
□ All 3 recommendations are MUTUAL FUND SCHEMES ONLY (absolutely NOT credit cards, loans, or insurance!)
□ Each of the 3 recommendations is from a DIFFERENT AMC
□ EXACTLY 5 comparison entries are included (not 3, not 4, but 5)
□ All 5 comparison funds are from DIFFERENT AMCs
□ All fund names include COMPLETE details: Fund Name + Plan Type (Direct/Regular) + Option (Growth/Dividend)
□ All returns are REAL historical data with specific dates (e.g., "as of 31-Dec-2024")
□ All expense ratios are CURRENT verified rates
□ All AUM figures are accurate and include fund manager names
□ All URLs point to official AMC websites
□ NO placeholder text like "TBD", "competitive returns", "check website"
□ NO made-up or estimated return percentages
□ NO credit card or loan terminology

⚠️ IF YOU CANNOT FIND REAL MUTUAL FUND DATA: Return an error instead of making up returns or data. NEVER fabricate historical performance numbers.`;

        default:
          // Generic fallback for other products
          return `You are a financial product expert. Search ONLY OFFICIAL WEBSITES for current ${productName} offers from major Indian banks and financial institutions.

⚠️ CRITICAL: You MUST use ONLY real, verified data from official websites. NEVER generate fake or placeholder data.

USER REQUIREMENTS:
${userProfile}

MANDATORY SEARCH INSTRUCTIONS - NO EXCEPTIONS:
1. Use Google Search to find CURRENT data (December 2024 - January 2025) from ONLY official bank/financial institution websites
2. Verify all data is REAL and verified from official sources
3. Use EXACT product names as listed officially on the websites
4. Include specific numbers and details in ALL fields, not generic descriptions
5. Each product must be from a DIFFERENT institution

CRITICAL REQUIREMENTS FOR YOUR RESPONSE:
🔴 Return EXACTLY 3 recommendations + EXACTLY 5 comparisons
🔴 Each recommendation must be from a DIFFERENT bank/institution
🔴 ALL data must be REAL and VERIFIED from official sources
🔴 NO placeholder text, NO made-up numbers, NO generic descriptions

RETURN FORMAT - STRICT JSON ONLY (NO other text):
{
  "recommendations": [
    {
      "rank": 1,
      "productName": "EXACT official product name from website",
      "bankName": "Official institution name",
      "keyBenefits": ["Specific benefit 1 with numbers", "Specific benefit 2 with numbers", "Specific benefit 3 with numbers"],
      "fees": "Exact fees/charges with all details",
      "applyUrl": "https://official-website.com/product-page"
    },
    {
      "rank": 2,
      "productName": "Product 2 - EXACT name",
      "bankName": "Different institution from rank 1",
      "keyBenefits": ["Benefit 1 with numbers", "Benefit 2 with numbers", "Benefit 3 with numbers"],
      "fees": "Exact fees",
      "applyUrl": "https://official-url"
    },
    {
      "rank": 3,
      "productName": "Product 3 - EXACT name",
      "bankName": "Different institution from ranks 1 and 2",
      "keyBenefits": ["B1 with numbers", "B2 with numbers", "B3 with numbers"],
      "fees": "Exact fees",
      "applyUrl": "https://official-url"
    }
  ],
  "comparisons": [
    {"bank": "Institution 1", "product": "Product 1 exact name", "rate": "Exact Rate/Price", "fee": "Exact Fees", "benefits": "Specific key features with numbers"},
    {"bank": "Institution 2", "product": "Product 2 exact name", "rate": "Exact Rate/Price", "fee": "Exact Fees", "benefits": "Specific key features with numbers"},
    {"bank": "Institution 3", "product": "Product 3 exact name", "rate": "Exact Rate/Price", "fee": "Exact Fees", "benefits": "Specific key features with numbers"},
    {"bank": "Institution 4 (DIFFERENT from top 3)", "product": "Product 4 exact name", "rate": "Exact Rate/Price", "fee": "Exact Fees", "benefits": "Key features"},
    {"bank": "Institution 5 (DIFFERENT from all above)", "product": "Product 5 exact name", "rate": "Exact Rate/Price", "fee": "Exact Fees", "benefits": "Key features"}
  ],
  "insights": ["Specific insight 1 with actual numbers/comparisons", "Specific insight 2 with data", "Specific insight 3 with actionable advice"]
}

PRE-SUBMISSION VALIDATION CHECKLIST - VERIFY BEFORE RESPONDING:
□ EXACTLY 3 recommendations included
□ Each of the 3 recommendations is from a DIFFERENT institution
□ EXACTLY 5 comparison entries are included (not 3, not 4, but 5)
□ All 5 comparison products are from DIFFERENT institutions
□ All product names are EXACT official names verified from websites
□ All numbers and fees are REAL and CURRENT (January 2025)
□ All benefits include SPECIFIC numbers and details
□ All URLs point to official websites
□ NO placeholder text like "TBD", "competitive", "varies"
□ NO made-up or estimated data

⚠️ IF YOU CANNOT FIND REAL DATA: Return an error instead of making up data. NEVER fabricate information for financial products.`;
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

      // Validate comparisons array - should have exactly 5 entries
      if (!structuredData.comparisons || !Array.isArray(structuredData.comparisons)) {
        console.warn('No comparisons array in response');
        // Create empty comparisons array as fallback
        structuredData.comparisons = [];
      }

      if (structuredData.comparisons.length < 5) {
        console.warn(`Only ${structuredData.comparisons.length} comparisons received, expected 5`);
        // Don't fail, but log the warning - the frontend can handle fewer comparisons
      }

      // Ensure we have at most 5 comparisons
      structuredData.comparisons = structuredData.comparisons.slice(0, 5);

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