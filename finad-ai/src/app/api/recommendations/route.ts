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
      console.log('Using demo mode - no valid API key found');
      
      // Demo response for testing
      const demoRecommendations = `
        <h1>Your Personalized Financial Recommendations</h1>
        
        <h2>🚀 Demo Mode</h2>
        <p><strong>Note:</strong> This is a demo response. To get real AI-powered recommendations, please set up your Gemini API key in the environment variables.</p>
        
        <h2>💳 Credit Card Recommendations</h2>
        <ul>
          <li><strong>Chase Sapphire Preferred:</strong> Great for travel rewards with 2x points on travel and dining. Perfect for your income level of $${data.income?.toLocaleString()}.</li>
          <li><strong>Capital One Venture Rewards:</strong> Simple 2x miles on every purchase. Good for building credit with your current score of ${data.creditScore}.</li>
          <li><strong>Discover it Cash Back:</strong> Rotating 5% categories and excellent for first-time credit users.</li>
        </ul>
        
        <h2>🏦 Banking Recommendations</h2>
        <ul>
          <li><strong>High-Yield Savings:</strong> Consider Marcus by Goldman Sachs or Ally Bank for emergency fund (aim for 3-6 months of your $${data.monthlyExpenses?.toLocaleString()} monthly expenses).</li>
          <li><strong>Checking Account:</strong> Chase Total Checking or Bank of America Core Checking for everyday banking.</li>
        </ul>
        
        <h2>📈 Investment Suggestions</h2>
        <ul>
          <li><strong>401(k) Maximization:</strong> Contribute enough to get full employer match.</li>
          <li><strong>Roth IRA:</strong> Perfect for your age of ${data.age} and ${data.investmentTimeframe}-term investment horizon.</li>
          <li><strong>Index Funds:</strong> Consider VTSAX or similar broad market index funds for ${data.riskTolerance} risk tolerance.</li>
        </ul>
        
        <h2>🛡️ Insurance Needs</h2>
        <ul>
          <li><strong>Health Insurance:</strong> Ensure adequate coverage through employer or marketplace.</li>
          <li><strong>Term Life Insurance:</strong> Consider 10-12x your annual income in coverage.</li>
          <li><strong>Disability Insurance:</strong> Often available through employer at reduced rates.</li>
        </ul>
        
        <h2>✅ Next Steps</h2>
        <ol>
          <li>Set up automatic transfers to savings account for emergency fund</li>
          <li>Review and optimize current debt payments (you have $${data.currentDebt?.toLocaleString()} in debt)</li>
          <li>Apply for recommended credit card to improve credit utilization</li>
          <li>Open investment accounts and set up automatic contributions</li>
          <li>Review insurance coverage and fill any gaps</li>
        </ol>
        
        <h2>💰 Money-Saving Tips</h2>
        <ul>
          <li>Track spending for one month to identify areas for optimization</li>
          <li>Use the 50/30/20 budgeting rule: 50% needs, 30% wants, 20% savings</li>
          <li>Negotiate bills (phone, internet, insurance) annually</li>
          <li>Consider cashback apps and credit card rewards for regular purchases</li>
          <li>Set up automatic savings to pay yourself first</li>
        </ul>
        
        <p><em>These recommendations are based on your profile: ${data.primaryGoal} goal, ${data.employmentStatus} employment status, and ${data.riskTolerance} risk tolerance. Always consult with a certified financial planner for personalized advice.</em></p>
      `;
      
      return NextResponse.json({
        success: true,
        recommendations: demoRecommendations
      });
    }
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    console.log('Model initialized');
    
    const prompt = `
    You are a professional financial advisor AI. Based on the following user profile, provide detailed and personalized financial product recommendations. Format your response in HTML with proper headings, bullet points, and professional styling.

    User Profile:
    - Age: ${data.age}
    - Annual Income: $${data.income?.toLocaleString()}
    - Credit Score: ${data.creditScore}
    - Employment Status: ${data.employmentStatus}
    - Primary Financial Goal: ${data.primaryGoal}
    - Current Debt: $${data.currentDebt?.toLocaleString()}
    - Monthly Expenses: $${data.monthlyExpenses?.toLocaleString()}
    - Risk Tolerance: ${data.riskTolerance}
    - Interested Products: ${data.interestedProducts?.join(', ')}
    - Insurance Needs: ${data.insuranceNeeds?.join(', ')}
    - Investment Timeframe: ${data.investmentTimeframe}
    - Investment Amount: $${data.investmentAmount?.toLocaleString()}
    - Existing Accounts: ${data.existingAccounts?.join(', ')}

    Please provide:
    1. **Credit Card Recommendations** (if interested): Suggest 2-3 specific credit cards with reasons why they're suitable
    2. **Loan Options** (if applicable): Personal loans, mortgages, or auto loans based on their needs
    3. **Insurance Recommendations** (if interested): Specific insurance products and coverage amounts
    4. **Investment Suggestions** (if interested): Mutual funds, ETFs, or other investment vehicles
    5. **Banking Products** (if interested): Savings accounts, CDs, or checking accounts
    6. **Action Steps**: 3-5 specific next steps they should take
    7. **Money-Saving Tips**: Personalized tips based on their profile

    Format the response professionally with HTML tags for better presentation. Include specific product names, rates, and benefits where applicable. Make recommendations realistic and actionable.
    `;

    console.log('Generating content with Gemini...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const recommendations = response.text();
    console.log('Content generated successfully');

    return NextResponse.json({
      success: true,
      recommendations: recommendations
    });
    
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