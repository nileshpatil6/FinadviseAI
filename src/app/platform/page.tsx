'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Shield, 
  TrendingUp, 
  Home,
  ArrowRight,
  CheckCircle,
  Loader2,
  PiggyBank,
  Building2,
  Wallet,
  Landmark,
  Calculator,
  Target,
  Award,
  User,
  DollarSign,
  Star
} from 'lucide-react';
import Link from 'next/link';

type ProductCategory = 
  | 'credit-cards' 
  | 'debit-cards'
  | 'personal-loans' 
  | 'home-loans'
  | 'auto-loans'
  | 'education-loans'
  | 'health-insurance'
  | 'life-insurance'
  | 'auto-insurance'
  | 'home-insurance'
  | 'mutual-funds'
  | 'bank-accounts'
  | 'fixed-deposits'
  | 'bonds';

type FlowType = 'comparison' | 'eligibility';

export default function PlatformPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductCategory | null>(null);
  const [flowType, setFlowType] = useState<FlowType>('comparison');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);

  const productCategories = [
    {
      category: 'Credit Cards',
      icon: CreditCard,
      color: 'from-blue-500 to-blue-600',
      products: [
        { id: 'credit-cards', name: 'All Credit Cards', description: 'Cashback, Travel, Rewards, Premium' }
      ]
    },
    {
      category: 'Loans',
      icon: PiggyBank,
      color: 'from-purple-500 to-purple-600',
      products: [
        { id: 'personal-loans', name: 'Personal Loans', description: 'Instant approval, competitive rates' },
        { id: 'home-loans', name: 'Home Loans', description: 'Mortgages, refinancing, construction' },
        { id: 'auto-loans', name: 'Auto Loans', description: 'Car loans, bike loans' },
        { id: 'education-loans', name: 'Education Loans', description: 'Study abroad, domestic education' }
      ]
    },
    {
      category: 'Insurance',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      products: [
        { id: 'health-insurance', name: 'Health Insurance', description: 'Individual, family, senior citizen' },
        { id: 'life-insurance', name: 'Life Insurance', description: 'Term, endowment, ULIP' },
        { id: 'auto-insurance', name: 'Auto Insurance', description: 'Car, bike, commercial vehicle' },
        { id: 'home-insurance', name: 'Home Insurance', description: 'Property, contents, liability' }
      ]
    },
    {
      category: 'Investments',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      products: [
        { id: 'mutual-funds', name: 'Mutual Funds', description: 'Equity, debt, hybrid, tax-saving' }
      ]
    },
    {
      category: 'Banking',
      icon: Building2,
      color: 'from-cyan-500 to-cyan-600',
      products: [
        { id: 'bank-accounts', name: 'Bank Accounts', description: 'Savings, current, salary, NRI' },
        { id: 'debit-cards', name: 'Debit Cards', description: 'Platinum, international, cashback' }
      ]
    },
    {
      category: 'Assets',
      icon: Landmark,
      color: 'from-indigo-500 to-indigo-600',
      products: [
        { id: 'fixed-deposits', name: 'Fixed Deposits', description: 'Regular FD, tax-saving FD' },
        { id: 'bonds', name: 'Bonds', description: 'Government bonds, corporate bonds' }
      ]
    }
  ];

  if (selectedProduct) {
    return <ProductForm product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">FinadAI</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFlowType('comparison')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  flowType === 'comparison' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Compare Products
              </button>
              <button
                onClick={() => setFlowType('eligibility')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  flowType === 'eligibility' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Check Eligibility
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
              flowType === 'comparison' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {flowType === 'comparison' 
                ? 'Flow 1: User Input → Comparison → Top 3 Results' 
                : 'Flow 2: Login → Eligibility Check → Pre-Approved Products'
              }
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {flowType === 'comparison' 
              ? 'Select Product to Compare' 
              : 'Check Your Eligibility'
            }
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {flowType === 'comparison' 
              ? 'Choose a financial product category to compare options across banks and get personalized recommendations'
              : 'Login with PAN/Aadhaar to check your eligibility and get pre-approved products with high approval probability'
            }
          </motion.p>
        </div>

        {flowType === 'eligibility' ? (
          // Eligibility Login Section
          <motion.div
            className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center mb-6">
              <Target className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure Login</h2>
              <p className="text-gray-600">Login with your PAN/Aadhaar for eligibility check</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Send OTP
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                CIBIL/Experian credit score check
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Income verification
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Pre-approved product recommendations
              </div>
            </div>
          </motion.div>
        ) : (
          // Product Selection Grid
          <div className="space-y-8">
            {productCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                className="bg-white p-6 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.products.map((product, productIndex) => (
                    <motion.div
                      key={productIndex}
                      className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                      whileHover={{ y: -2 }}
                      onClick={() => setSelectedProduct(product.id as ProductCategory)}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      <div className="flex items-center text-blue-600 text-sm font-medium">
                        Compare Now <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Product-specific form component
function ProductForm({ product, onBack }: { product: ProductCategory; onBack: () => void }) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [comparisons, setComparisons] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleCompare = async () => {
    setLoading(true);
    setStep(2);
    
    try {
      // Call the actual API for real recommendations
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          product: product,
          requestType: 'comparison'
        }),
      });

      const data = await response.json();
      
      if (data.success && data.data) {
        // Handle structured JSON response
        console.log('Structured AI response received:', data.data);
        
        // Set recommendations from AI response
        if (data.data.recommendations && data.data.recommendations.length > 0) {
          const formattedRecs = data.data.recommendations.map((rec: any) => ({
            rank: rec.rank || 1,
            product: `${rec.bankName || 'Bank'} ${rec.productName || 'Product'}`,
            benefits: Array.isArray(rec.keyBenefits) ? rec.keyBenefits : [rec.keyBenefits || 'Benefits available'],
            approval: rec.approvalProbability || 'Contact bank',
            applyLink: rec.applyUrl || '#'
          }));
          setRecommendations(formattedRecs);
        } else {
          // If no recommendations, show message
          setRecommendations([{
            rank: 1,
            product: 'No suitable products found',
            benefits: ['Please check your inputs and try again', 'Consider adjusting your requirements'],
            approval: 'N/A',
            applyLink: '#'
          }]);
        }
        
        // Set comparisons from AI response
        if (data.data.comparisons && data.data.comparisons.length > 0) {
          setComparisons(data.data.comparisons);
        } else {
          setComparisons([]);
        }
      } else {
        console.error('API error:', data.error);
        alert('API Error: ' + data.error + '\nPlease check your Gemini API key configuration.');
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network Error: ' + error + '\nUnable to connect to the API. Please try again.');
      setLoading(false);
      return;
    }
    
    setLoading(false);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">FinadAI</span>
            </Link>
            
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step === 1 && <InputForm product={product} formData={formData} onInputChange={handleInputChange} onCompare={handleCompare} />}
        {step === 2 && <LoadingComparison />}
        {step === 3 && <ComparisonResults product={product} comparisons={comparisons} recommendations={recommendations} />}
      </div>
    </div>
  );
}

// Input Form Component
function InputForm({ product, formData, onInputChange, onCompare }: any) {
  const getProductForm = () => {
    switch (product) {
      case 'credit-cards':
        return <CreditCardForm formData={formData} onInputChange={onInputChange} />;
      case 'personal-loans':
        return <PersonalLoanForm formData={formData} onInputChange={onInputChange} />;
      case 'health-insurance':
        return <HealthInsuranceForm formData={formData} onInputChange={onInputChange} />;
      case 'mutual-funds':
        return <MutualFundForm formData={formData} onInputChange={onInputChange} />;
      case 'home-loans':
        return <HomeLoanForm formData={formData} onInputChange={onInputChange} />;
      default:
        return <GenericForm formData={formData} onInputChange={onInputChange} />;
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
          {product.replace('-', ' ')} Comparison
        </h1>
        <p className="text-gray-600">
          Enter your requirements to compare options across banks and get top 3 recommendations
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl">
        {getProductForm()}
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onCompare}
            className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Compare Products Across Banks
          </button>
        </div>
      </div>
    </div>
  );
}

// Credit Card Form
function CreditCardForm({ formData, onInputChange }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Credit Card Requirements</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onInputChange('ageRange', e.target.value)}
          >
            <option value="">Select age range</option>
            <option value="18-25">18-25 years</option>
            <option value="26-35">26-35 years</option>
            <option value="36-50">36-50 years</option>
            <option value="50+">50+ years</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income (₹)</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onInputChange('income', e.target.value)}
          >
            <option value="">Select income range</option>
            <option value="15k-50k">₹15k - ₹50k/month</option>
            <option value="50k-100k">₹50k - ₹1L/month</option>
            <option value="100k-200k">₹1L - ₹2L/month</option>
            <option value="200k+">₹2L+ /month</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onInputChange('employment', e.target.value)}
          >
            <option value="">Select employment type</option>
            <option value="salaried">Salaried</option>
            <option value="self-employed">Self-employed</option>
            <option value="student">Student</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CIBIL Score (if known)</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onInputChange('cibilScore', e.target.value)}
          >
            <option value="">Select CIBIL range</option>
            <option value="300-550">300-550 (Poor)</option>
            <option value="550-650">550-650 (Fair)</option>
            <option value="650-750">650-750 (Good)</option>
            <option value="750+">750+ (Excellent)</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Spending Pattern (Select all that apply)</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Travel', 'Online Shopping', 'Dining', 'Fuel', 'Groceries', 'Entertainment', 'Bills', 'Others'].map((pattern) => (
            <label key={pattern} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                onChange={(e) => {
                  const current = formData.spendingPattern || [];
                  const updated = e.target.checked 
                    ? [...current, pattern]
                    : current.filter((p: string) => p !== pattern);
                  onInputChange('spendingPattern', updated);
                }}
              />
              <span className="text-sm text-gray-700">{pattern}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Card Preferences</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['Cashback', 'Rewards Points', 'Travel Miles', 'Lounge Access', 'Premium Benefits', 'Low/No Annual Fee'].map((pref) => (
            <label key={pref} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="cardPreference"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                onChange={() => onInputChange('cardPreference', pref)}
              />
              <span className="text-sm text-gray-700">{pref}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// Personal Loan Form  
function PersonalLoanForm({ formData, onInputChange }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <PiggyBank className="w-8 h-8 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-900">Personal Loan Requirements</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹)</label>
          <input
            type="number"
            placeholder="e.g., 500000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onChange={(e) => onInputChange('loanAmount', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tenure</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onChange={(e) => onInputChange('tenure', e.target.value)}
          >
            <option value="">Select tenure</option>
            <option value="12">1 Year</option>
            <option value="24">2 Years</option>
            <option value="36">3 Years</option>
            <option value="48">4 Years</option>
            <option value="60">5 Years</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
          <input
            type="number"
            placeholder="e.g., 60000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onChange={(e) => onInputChange('monthlyIncome', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onChange={(e) => onInputChange('employment', e.target.value)}
          >
            <option value="">Select employment type</option>
            <option value="salaried">Salaried</option>
            <option value="self-employed">Self-employed</option>
            <option value="business">Business Owner</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CIBIL Score</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onChange={(e) => onInputChange('cibilScore', e.target.value)}
          >
            <option value="">Select CIBIL range</option>
            <option value="600-650">600-650</option>
            <option value="650-700">650-700</option>
            <option value="700-750">700-750</option>
            <option value="750+">750+</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onChange={(e) => onInputChange('purpose', e.target.value)}
          >
            <option value="">Select purpose</option>
            <option value="debt-consolidation">Debt Consolidation</option>
            <option value="home-renovation">Home Renovation</option>
            <option value="medical-emergency">Medical Emergency</option>
            <option value="business-expansion">Business Expansion</option>
            <option value="travel">Travel</option>
            <option value="wedding">Wedding</option>
            <option value="others">Others</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Interest Type Preference</label>
        <div className="flex gap-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="interestType"
              className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
              onChange={() => onInputChange('interestType', 'fixed')}
            />
            <span className="text-sm text-gray-700">Fixed Rate</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="interestType"
              className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
              onChange={() => onInputChange('interestType', 'floating')}
            />
            <span className="text-sm text-gray-700">Floating Rate</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// Other form components would follow similar patterns
function HealthInsuranceForm({ formData, onInputChange }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-red-600" />
        <h2 className="text-2xl font-bold text-gray-900">Health Insurance Requirements</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <input
            type="number"
            placeholder="e.g., 32"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            onChange={(e) => onInputChange('age', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Family Size</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            onChange={(e) => onInputChange('familySize', e.target.value)}
          >
            <option value="">Select family size</option>
            <option value="individual">Individual</option>
            <option value="couple">2 Adults</option>
            <option value="family">2 Adults + 1 Child</option>
            <option value="large-family">2 Adults + 2+ Children</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sum Insured (₹)</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            onChange={(e) => onInputChange('sumInsured', e.target.value)}
          >
            <option value="">Select sum insured</option>
            <option value="300000">₹3 Lakhs</option>
            <option value="500000">₹5 Lakhs</option>
            <option value="1000000">₹10 Lakhs</option>
            <option value="2000000">₹20 Lakhs</option>
            <option value="5000000">₹50 Lakhs</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Premium Budget (Annual)</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            onChange={(e) => onInputChange('premiumBudget', e.target.value)}
          >
            <option value="">Select budget range</option>
            <option value="5000-10000">₹5,000 - ₹10,000</option>
            <option value="10000-20000">₹10,000 - ₹20,000</option>
            <option value="20000-30000">₹20,000 - ₹30,000</option>
            <option value="30000+">₹30,000+</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Required Add-ons (Select all that apply)</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['Critical Illness', 'Maternity Cover', 'Dental Care', 'OPD Cover', 'Ambulance Cover', 'Mental Health'].map((addon) => (
            <label key={addon} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                onChange={(e) => {
                  const current = formData.addons || [];
                  const updated = e.target.checked 
                    ? [...current, addon]
                    : current.filter((a: string) => a !== addon);
                  onInputChange('addons', updated);
                }}
              />
              <span className="text-sm text-gray-700">{addon}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function MutualFundForm({ formData, onInputChange }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-8 h-8 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-900">Mutual Fund Investment</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <input
            type="number"
            placeholder="e.g., 32"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            onChange={(e) => onInputChange('age', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Investment Experience</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            onChange={(e) => onInputChange('experience', e.target.value)}
          >
            <option value="">Select experience</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly SIP Amount (₹)</label>
          <input
            type="number"
            placeholder="e.g., 10000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            onChange={(e) => onInputChange('sipAmount', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Investment Horizon</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            onChange={(e) => onInputChange('horizon', e.target.value)}
          >
            <option value="">Select time horizon</option>
            <option value="short">Short term (1-3 years)</option>
            <option value="medium">Medium term (3-7 years)</option>
            <option value="long">Long term (7+ years)</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Risk Appetite</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'low', label: 'Low Risk', desc: 'Stable returns, low volatility' },
            { value: 'medium', label: 'Medium Risk', desc: 'Balanced growth and safety' },
            { value: 'high', label: 'High Risk', desc: 'High growth potential' }
          ].map((risk) => (
            <label key={risk.value} className="cursor-pointer">
              <input
                type="radio"
                name="riskAppetite"
                className="sr-only peer"
                onChange={() => onInputChange('riskAppetite', risk.value)}
              />
              <div className="p-4 border-2 border-gray-200 rounded-lg peer-checked:border-green-600 peer-checked:bg-green-50 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">{risk.label}</div>
                <div className="text-sm text-gray-600 mt-1">{risk.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Investment Goal</label>
        <select 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          onChange={(e) => onInputChange('goal', e.target.value)}
        >
          <option value="">Select investment goal</option>
          <option value="wealth-creation">Wealth Creation</option>
          <option value="retirement">Retirement Planning</option>
          <option value="child-education">Child Education</option>
          <option value="tax-saving">Tax Saving</option>
          <option value="emergency-fund">Emergency Fund</option>
        </select>
      </div>
    </div>
  );
}

function HomeLoanForm({ formData, onInputChange }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Home className="w-8 h-8 text-orange-600" />
        <h2 className="text-2xl font-bold text-gray-900">Home Loan Requirements</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹)</label>
          <input
            type="number"
            placeholder="e.g., 4000000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            onChange={(e) => onInputChange('loanAmount', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tenure (Years)</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            onChange={(e) => onInputChange('tenure', e.target.value)}
          >
            <option value="">Select tenure</option>
            <option value="10">10 Years</option>
            <option value="15">15 Years</option>
            <option value="20">20 Years</option>
            <option value="25">25 Years</option>
            <option value="30">30 Years</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
          <input
            type="number"
            placeholder="e.g., 100000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            onChange={(e) => onInputChange('monthlyIncome', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CIBIL Score</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            onChange={(e) => onInputChange('cibilScore', e.target.value)}
          >
            <option value="">Select CIBIL range</option>
            <option value="650-700">650-700</option>
            <option value="700-750">700-750</option>
            <option value="750+">750+</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Apartment', 'Independent House', 'Villa', 'Plot'].map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="propertyType"
                className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                onChange={() => onInputChange('propertyType', type)}
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function GenericForm({ formData, onInputChange }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Product Requirements</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <input
            type="number"
            placeholder="Enter your age"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onInputChange('age', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
          <input
            type="number"
            placeholder="Enter monthly income"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onInputChange('monthlyIncome', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

// Loading Component
function LoadingComparison() {
  return (
    <div className="text-center py-16">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="inline-block"
      >
        <Calculator className="w-16 h-16 text-blue-600" />
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Comparing Products Across Banks</h2>
      <p className="text-gray-600 mb-8">Analyzing thousands of products to find your best matches...</p>
      <div className="max-w-md mx-auto space-y-2">
        <div className="text-left text-sm text-gray-600">✓ Fetching latest rates and offers</div>
        <div className="text-left text-sm text-gray-600">✓ Calculating approval probability</div>
        <div className="text-left text-sm text-gray-600">✓ Ranking products by suitability</div>
      </div>
    </div>
  );
}

// No mock data - only real API responses

// Comprehensive Comparison Results Component
function ComparisonResults({ product, comparisons, recommendations }: any) {
  const [filterType, setFilterType] = useState<'best-value' | 'best-overall' | 'best-match'>('best-match');

  const getProductDisplayName = (product: string) => {
    return product.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getComparisonHeaders = (product: string) => {
    const commonHeaders = ['Bank', 'Product', 'Approval %'];
    
    switch (product) {
      case 'credit-cards':
        return [...commonHeaders, 'Annual Fee', 'Reward Rate', 'Benefits'];
      case 'personal-loans':
        return [...commonHeaders, 'Interest Rate', 'EMI', 'Processing Fee'];
      case 'health-insurance':
        return [...commonHeaders, 'Premium', 'Sum Insured', 'Network Hospitals'];
      case 'mutual-funds':
        return [...commonHeaders, 'Expense Ratio', 'Return (3Y)', 'Fund Type'];
      case 'home-loans':
        return [...commonHeaders, 'Interest Rate', 'EMI', 'Processing Fee'];
      default:
        return [...commonHeaders, 'Rate', 'Features', 'Charges'];
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          ✓ Analysis Complete - {comparisons.length} Products Found
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getProductDisplayName(product)} Comparison Results
        </h1>
        <p className="text-gray-600">Based on your requirements, here are the best matches across banks</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200">
          {[
            { id: 'best-match', label: 'Best Match for You', icon: Target },
            { id: 'best-value', label: 'Best Value', icon: DollarSign },
            { id: 'best-overall', label: 'Best Overall', icon: Award }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterType(filter.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                filterType === filter.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <filter.icon className="w-4 h-4" />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Recommendations - Highlighted Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Top 3 Recommendations</h2>
            <Star className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600">
            Our AI has ranked these as your best matches with high approval probability
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {recommendations.slice(0, 3).map((rec: any, index: number) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-200 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Rank Badge */}
              <div className="absolute -top-3 left-4">
                <div className={`px-3 py-1 rounded-full text-sm font-bold text-white ${
                  index === 0 ? 'bg-gold bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  index === 1 ? 'bg-silver bg-gradient-to-r from-gray-400 to-gray-600' :
                  'bg-bronze bg-gradient-to-r from-orange-400 to-orange-600'
                }`}>
                  #{index + 1} {index === 0 ? 'BEST MATCH' : index === 1 ? 'RUNNER UP' : 'GOOD OPTION'}
                </div>
              </div>

              {/* Product Header */}
              <div className="mt-4 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{rec.product}</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-lg font-semibold text-green-600">{rec.approval} Approval Chance</span>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Benefits</h4>
                <ul className="space-y-2">
                  {rec.benefits.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Button */}
              <div className="space-y-3">
                <a
                  href={rec.applyLink}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  Apply Now - Official Bank Page
                </a>
                <div className="text-center text-xs text-gray-500">
                  Redirects to {rec.product.split(' ')[0]} official website
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Secure Application
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Instant Decision
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side-by-Side Comparison Table */}
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Side-by-Side Comparison</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                {getComparisonHeaders(product).map((header, index) => (
                  <th key={index} className="text-left p-4 font-semibold text-gray-900 border border-gray-200">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((comp: any, index: number) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                  <td className="p-4 border border-gray-200 font-medium text-gray-900">
                    {comp.bank}
                  </td>
                  <td className="p-4 border border-gray-200 text-gray-700">
                    {comp.product}
                  </td>
                  <td className="p-4 border border-gray-200">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      parseInt(comp.approval) >= 80 ? 'bg-green-100 text-green-800' :
                      parseInt(comp.approval) >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {comp.approval}
                    </span>
                  </td>
                  {product === 'credit-cards' && (
                    <>
                      <td className="p-4 border border-gray-200 text-gray-700">{comp.fee}</td>
                      <td className="p-4 border border-gray-200 text-gray-700">{comp.rate}</td>
                      <td className="p-4 border border-gray-200 text-gray-700">{comp.benefits}</td>
                    </>
                  )}
                  {product === 'personal-loans' && (
                    <>
                      <td className="p-4 border border-gray-200 text-gray-700">{comp.rate}</td>
                      <td className="p-4 border border-gray-200 font-semibold text-gray-900">{comp.emi}</td>
                      <td className="p-4 border border-gray-200 text-gray-700">{comp.processing || '1-2%'}</td>
                    </>
                  )}
                  {(product !== 'credit-cards' && product !== 'personal-loans') && (
                    <>
                      <td className="p-4 border border-gray-200 text-gray-700">{comp.rate || 'N/A'}</td>
                      <td className="p-4 border border-gray-200 text-gray-700">{comp.benefits || 'Standard'}</td>
                      <td className="p-4 border border-gray-200 text-gray-700">{comp.fee || 'As applicable'}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">How We Rank Products</h4>
              <p className="text-sm text-blue-800">
                Our AI considers your profile, current market rates, approval probability, and overall value 
                to rank products. The "Best Match" considers your specific requirements and eligibility.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="bg-gray-900 text-white p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
        <p className="text-gray-300 mb-6">
          These recommendations are personalized for your profile. Apply now to get the best rates and offers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Apply for Top Choice
          </button>
          <button className="border border-gray-300 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            Compare More Products
          </button>
        </div>
      </div>
    </div>
  );
}