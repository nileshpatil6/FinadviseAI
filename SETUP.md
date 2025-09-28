# Unifiny - Personal Financial Advisory Platform

A comprehensive financial advisory platform powered by Google's Gemini AI that helps users make smarter financial decisions across credit cards, loans, insurance, investments, and more.

## Features

- **Professional Landing Page**: Beautiful, responsive design with smooth animations
- **Multi-step Financial Assessment**: Comprehensive form to capture user's financial profile
- **AI-Powered Recommendations**: Personalized recommendations using Google Gemini AI
- **Comprehensive Coverage**: Credit cards, loans, insurance, investments, bank accounts
- **Responsive Design**: Works perfectly across all devices and screen sizes
- **Professional UI/UX**: Modern, clean interface with smooth animations

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **AI Integration**: Google Gemini AI API
- **Icons**: Lucide React

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Get Gemini API Key**:
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Replace `your_gemini_api_key_here` with your actual API key

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## Application Structure

### Landing Page (`/`)
- Hero section with compelling value proposition
- Feature highlights
- How it works explanation
- Call-to-action buttons leading to the platform

### Platform (`/platform`)
- **Step 1**: Personal Information (age, income, credit score, employment)
- **Step 2**: Financial Goals & Situation (goals, debt, expenses, risk tolerance)
- **Step 3**: Product Preferences (interested products, insurance needs)
- **Step 4**: Investment Preferences (timeframe, amount, existing accounts)
- **Step 5**: AI-Generated Recommendations

### API Endpoints
- `POST /api/recommendations`: Processes user data and returns personalized financial recommendations

## Key Features

### Multi-Step Form
- Progressive disclosure of information
- Form validation with Zod
- Visual progress indicator
- Smooth transitions between steps

### AI Integration
- Comprehensive financial analysis
- Personalized product recommendations
- Specific action steps
- Money-saving tips

### Professional Design
- Modern gradient backgrounds
- Card-based layouts with shadows
- Responsive grid systems
- Smooth hover effects
- Custom scrollbars
- Professional typography

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Flexible grid layouts
- Adaptive navigation

## Customization

The platform is highly customizable:

1. **Styling**: Modify `src/app/globals.css` for global styles
2. **Colors**: Update Tailwind classes throughout components
3. **Content**: Modify text content in component files
4. **AI Prompts**: Customize the recommendation logic in `src/app/api/recommendations/route.ts`

## Financial Products Covered

- **Credit Cards**: Rewards, cashback, travel, business cards
- **Loans**: Personal loans, mortgages, auto loans, student loans
- **Insurance**: Life, health, auto, home, disability, travel
- **Investments**: Mutual funds, ETFs, stocks, bonds, retirement accounts
- **Banking**: Checking, savings, CDs, money market accounts

## Security & Privacy

- No sensitive data stored locally
- API calls use environment variables
- Form validation prevents malicious input
- Secure communication with Gemini AI

## Future Enhancements

- User authentication and profile saving
- Comparison tools for financial products
- Market data integration
- Financial calculators
- Educational content
- Push notifications for better deals

## Troubleshooting

### If you encounter hydration errors:
- Clear your browser cache
- Delete `.next` folder and rebuild: `rm -rf .next && npm run build`
- Make sure you're using a supported Node.js version (18+)

### If Gemini API calls fail:
- Verify your API key is correctly set in `.env.local` as `GEMINI_API_KEY`
- The app includes a **demo mode** that works without an API key for testing
- Check the browser console for detailed error messages

### If the build fails:
- The app is configured to run without Turbopack to avoid compatibility issues
- Make sure all dependencies are properly installed: `npm install`
- Check TypeScript errors: `npx tsc --noEmit`
- Try clearing cache: `npm run build -- --no-cache`

### If the recommendation form doesn't submit:
- Open browser developer tools and check the Console tab for errors
- Ensure all required fields are filled in each step
- The form has step validation to prevent skipping required information

## Support

For issues or questions, please check the console for any errors and ensure:
1. Gemini API key is correctly set (or use demo mode)
2. All dependencies are installed
3. Node.js version is compatible (18+)
4. Browser supports modern JavaScript features

## License

This project is for educational and commercial use. Please ensure compliance with Google's Gemini AI terms of service.