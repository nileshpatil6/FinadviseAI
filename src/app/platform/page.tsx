'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Shield, 
  TrendingUp, 
  Home,
  ArrowRight,
  CheckCircle,
  PiggyBank,
  Building2,
  Landmark,
  Calculator,
  Target,
  Award,
  DollarSign,
  Star,
  Sparkles,
  ArrowLeft
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

interface FormData {
  [key: string]: string | string[] | number | undefined;
}

interface Recommendation {
  rank: number;
  product: string;
  benefits: string[];
  approval: string;
  applyLink: string;
}

interface Comparison {
  bank: string;
  product: string;
  rate?: string;
  fee?: string;
  benefits?: string;
  approval: string;
  emi?: string;
  processing?: string;
}

interface ApiRecommendation {
  rank?: number;
  bankName?: string;
  productName?: string;
  keyBenefits?: string | string[];
  approvalProbability?: string;
  applyUrl?: string;
}

function PlatformContent() {
  const [selectedProduct, setSelectedProduct] = useState<ProductCategory | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const productParam = searchParams.get('product');
    if (productParam) {
      setSelectedProduct(productParam as ProductCategory);
    }
  }, [searchParams]);

  const productCategories = [
    {
      category: 'Credit Cards',
      icon: CreditCard,
      color: 'from-blue-500 to-blue-600',
      gradient: 'bg-gradient-to-r from-blue-50 to-indigo-50',
      products: [
        { id: 'credit-cards', name: 'All Credit Cards', description: 'Cashback, Travel, Rewards, Premium' }
      ]
    },
    {
      category: 'Loans',
      icon: PiggyBank,
      color: 'from-purple-500 to-purple-600',
      gradient: 'bg-gradient-to-r from-purple-50 to-pink-50',
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
      gradient: 'bg-gradient-to-r from-red-50 to-orange-50',
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
      gradient: 'bg-gradient-to-r from-green-50 to-emerald-50',
      products: [
        { id: 'mutual-funds', name: 'Mutual Funds', description: 'Equity, debt, hybrid, tax-saving' }
      ]
    },
    {
      category: 'Banking',
      icon: Building2,
      color: 'from-cyan-500 to-cyan-600',
      gradient: 'bg-gradient-to-r from-cyan-50 to-blue-50',
      products: [
        { id: 'bank-accounts', name: 'Bank Accounts', description: 'Savings, current, salary, NRI' },
        { id: 'debit-cards', name: 'Debit Cards', description: 'Platinum, international, cashback' }
      ]
    },
    {
      category: 'Assets',
      icon: Landmark,
      color: 'from-indigo-500 to-indigo-600',
      gradient: 'bg-gradient-to-r from-indigo-50 to-purple-50',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-lg opacity-30"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center relative z-10">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">FinadAI</span>
                <div className="text-xs text-indigo-600 font-medium">Premium Finance</div>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/20">
                Find Best Products
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-20 h-1 rounded-full mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-blue-200">
              Compare Products → Get Top Recommendations → Apply
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Find Your Perfect Financial Product
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose a financial product category to compare options across banks and get AI-powered personalized recommendations
          </motion.p>
        </div>

        {/* Product Selection Grid */}
        <div className="space-y-12">
          {productCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                className={`p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all ${category.gradient} border border-gray-100/50`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <div 
                  className="flex items-center mb-8 cursor-pointer group"
                  onClick={() => setSelectedProduct(category.products[0]?.id as ProductCategory)}
                >
                  <div className="relative mr-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{category.category}</h2>
                  <div className="ml-auto">
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                  {category.products.map((product, productIndex) => (
                    <motion.div
                      key={productIndex}
                      className="p-6 border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer group bg-white/50 backdrop-blur-sm"
                      whileHover={{ y: -8, scale: 1.02 }}
                      onClick={() => setSelectedProduct(product.id as ProductCategory)}
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                      <div className="flex items-center text-blue-600 font-semibold group-hover:underline">
                        Compare Now <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default function PlatformPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-lg text-gray-600">Loading...</div>
    </div>}>
      <PlatformContent />
    </Suspense>
  );
}

// Product-specific form component
function ProductForm({ product, onBack }: { product: ProductCategory; onBack: () => void }) {
  const [step, setStep] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  
  const handleInputChange = (field: string, value: string | string[] | number) => {
    setFormData((prev: FormData) => ({ ...prev, [field]: value }));
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
        
        // Set recommendations from AI response
        if (data.data.recommendations && data.data.recommendations.length > 0) {
          const formattedRecs = data.data.recommendations.map((rec: ApiRecommendation) => ({
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-lg opacity-30"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-606 rounded-xl flex items-center justify-center relative z-10">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">FinadAI</span>
                <div className="text-xs text-indigo-600 font-medium">Premium Finance</div>
              </div>
            </Link>
            
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Products
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {step === 1 && <InputForm product={product} formData={formData} onInputChange={handleInputChange} onCompare={handleCompare} />}
        {step === 2 && <LoadingComparison />}
        {step === 3 && <ComparisonResults product={product} comparisons={comparisons} recommendations={recommendations} />}
      </div>
    </div>
  );
}

// Input Form Component
function InputForm({ 
  product, 
  formData, 
  onInputChange, 
  onCompare 
}: { 
  product: ProductCategory; 
  formData: FormData; 
  onInputChange: (field: string, value: string | string[] | number) => void; 
  onCompare: () => void; 
}) {
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
      <div className="text-center mb-12">
        <motion.div
          className="inline-block mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-20 h-1 rounded-full mx-auto"></div>
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 capitalize">
          {product.replace('-', ' ')} Comparison
        </h1>
        <p className="text-xl text-gray-600">
          Enter your requirements to compare options across banks and get top 3 recommendations
        </p>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100/50 backdrop-blur-sm">
        {getProductForm()}
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={onCompare}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 rounded-2xl text-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
          >
            <Calculator className="w-6 h-6" />
            Compare Products Across Banks
          </button>
        </div>
      </div>
    </div>
  );
}

// Credit Card Form
function CreditCardForm({ 
  formData, 
  onInputChange 
}: { 
  formData: FormData; 
  onInputChange: (field: string, value: string | string[] | number) => void; 
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
          <CreditCard className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Credit Card Requirements</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Age</label>
          <select 
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
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
          <label className="block text-sm font-medium text-gray-700 mb-3">Annual Income (₹)</label>
          <select 
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            onChange={(e) => onInputChange('income', e.target.value)}
          >
      <option value="">Select income range</option>
      <option value="50k-100k">₹50k - ₹1L/month</option>
      <option value="100k-200k">₹1L - ₹2L/month</option>
      <option value="200k+">₹2L+ /month</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Employment Type</label>
          <select 
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            onChange={(e) => onInputChange('employment', e.target.value)}
          >
            <option value="">Select employment type</option>
            <option value="salaried">Salaried</option>
            <option value="self-employed">Self-employed</option>
            <option value="student">Student</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">CIBIL Score (if known)</label>
          <select 
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
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
        <label className="block text-sm font-medium text-gray-700 mb-4">Spending Pattern (Select all that apply)</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Travel', 'Online Shopping', 'Dining', 'Fuel', 'Groceries', 'Entertainment', 'Bills', 'Others'].map((pattern) => (
            <label key={pattern} className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-blue-50 transition-colors">
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                onChange={(e) => {
                  const current = Array.isArray(formData.spendingPattern) ? formData.spendingPattern : [];
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
        <label className="block text-sm font-medium text-gray-700 mb-4">Card Preferences</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['Cashback', 'Rewards Points', 'Travel Miles', 'Lounge Access', 'Premium Benefits', 'Low/No Annual Fee'].map((pref) => (
            <label key={pref} className="flex items-center space-x-3 cursor-pointer p-4 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100">
              <input
                type="radio"
                name="cardPreference"
                className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
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
function PersonalLoanForm({ 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formData: _formData, 
  onInputChange 
}: { 
  formData: FormData; 
  onInputChange: (field: string, value: string | string[] | number) => void; 
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
          <PiggyBank className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Personal Loan Requirements</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Loan Amount (₹)</label>
          <input
            type="number"
            placeholder="e.g., 500000"
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
            onChange={(e) => onInputChange('loanAmount', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Tenure</label>
          <select 
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
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
          <label className="block text-sm font-medium text-gray-700 mb-3">Monthly Income (₹)</label>
          <input
            type="number"
            placeholder="e.g., 60000"
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
            onChange={(e) => onInputChange('monthlyIncome', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Employment Type</label>
          <select 
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
            onChange={(e) => onInputChange('employment', e.target.value)}
          >
            <option value="">Select employment type</option>
            <option value="salaried">Salaried</option>
            <option value="self-employed">Self-employed</option>
            <option value="business">Business Owner</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">CIBIL Score</label>
          <select 
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
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
          <label className="block text-sm font-medium text-gray-700 mb-3">Purpose</label>
          <select 
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
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
        <label className="block text-sm font-medium text-gray-700 mb-3">Interest Type Preference</label>
        <div className="flex gap-6">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="interestType"
              className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
              onChange={() => onInputChange('interestType', 'fixed')}
            />
            <span className="text-sm text-gray-700">Fixed Rate</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="interestType"
              className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
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
function HealthInsuranceForm({ 
  formData: _formData, 
  onInputChange 
}: { 
  formData: FormData; 
  onInputChange: (field: string, value: string | string[] | number) => void; 
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl flex items-center justify-center">
          <Shield className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Health Insurance Requirements</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Age</label>
          <input
            type="number"
            placeholder="e.g., 32"
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
            onChange={(e) => onInputChange('age', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Family Size</label>
          <select 
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
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
          <label className="block text-sm font-medium text-gray-700 mb-3">Sum Insured (₹)</label>
          <select 
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
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
          <label className="block text-sm font-medium text-gray-700 mb-3">Premium Budget (Annual)</label>
          <select 
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
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
        <label className="block text-sm font-medium text-gray-700 mb-4">Required Add-ons (Select all that apply)</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['Critical Illness', 'Maternity Cover', 'Dental Care', 'OPD Cover', 'Ambulance Cover', 'Mental Health'].map((addon) => (
            <label key={addon} className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-red-50 transition-colors">
              <input
                type="checkbox"
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                onChange={(e) => {
                  const current = Array.isArray(_formData.addons) ? _formData.addons : [];
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

function MutualFundForm({ 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formData: _formData, 
  onInputChange 
}: { 
  formData: FormData; 
  onInputChange: (field: string, value: string | string[] | number) => void; 
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center">
          <TrendingUp className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Mutual Fund Investment</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Age</label>
          <input
            type="number"
            placeholder="e.g., 32"
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
            onChange={(e) => onInputChange('age', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Investment Experience</label>
          <select 
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
            onChange={(e) => onInputChange('experience', e.target.value)}
          >
            <option value="">Select experience</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Monthly SIP Amount (₹)</label>
          <input
            type="number"
            placeholder="e.g., 10000"
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
            onChange={(e) => onInputChange('sipAmount', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Investment Horizon</label>
          <select 
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
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
        <label className="block text-sm font-medium text-gray-700 mb-3">Risk Appetite</label>
        <div className="grid grid-cols-3 gap-4">
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
              <div className="p-5 border-2 border-gray-200 rounded-2xl peer-checked:border-green-600 peer-checked:bg-green-50 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900 text-lg">{risk.label}</div>
                <div className="text-sm text-gray-600 mt-2">{risk.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Investment Goal</label>
        <select 
          className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
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

function HomeLoanForm({ 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formData: _formData, 
  onInputChange 
}: { 
  formData: FormData; 
  onInputChange: (field: string, value: string | string[] | number) => void; 
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
          <Home className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Home Loan Requirements</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Loan Amount (₹)</label>
          <input
            type="number"
            placeholder="e.g., 4000000"
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white shadow-sm"
            onChange={(e) => onInputChange('loanAmount', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Tenure (Years)</label>
          <select 
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white shadow-sm"
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
          <label className="block text-sm font-medium text-gray-700 mb-3">Monthly Income (₹)</label>
          <input
            type="number"
            placeholder="e.g., 100000"
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white shadow-sm"
            onChange={(e) => onInputChange('monthlyIncome', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">CIBIL Score</label>
          <select 
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white shadow-sm"
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
        <label className="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Apartment', 'Independent House', 'Villa', 'Plot'].map((type) => (
            <label key={type} className="flex items-center space-x-3 cursor-pointer p-4 rounded-xl hover:bg-orange-50 transition-colors border border-gray-100">
              <input
                type="radio"
                name="propertyType"
                className="w-5 h-5 text-orange-600 border-gray-300 focus:ring-orange-500"
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

function GenericForm({ 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formData: _formData, 
  onInputChange 
}: { 
  formData: FormData; 
  onInputChange: (field: string, value: string | string[] | number) => void; 
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
          <CreditCard className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Product Requirements</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Age</label>
          <input
            type="number"
            placeholder="Enter your age"
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            onChange={(e) => onInputChange('age', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Monthly Income (₹)</label>
          <input
            type="number"
            placeholder="Enter monthly income"
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
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
    <div className="text-center py-24">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="inline-block mx-auto mb-8"
      >
        <Calculator className="w-20 h-20 text-blue-600" />
      </motion.div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Comparing Products Across Banks</h2>
      <p className="text-xl text-gray-600 mb-12">Analyzing thousands of products to find your best matches...</p>
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center text-left text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
          <span>Fetching latest rates and offers</span>
        </div>
        <div className="flex items-center text-left text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
          <span>Calculating approval probability</span>
        </div>
        <div className="flex items-center text-left text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
          <span>Ranking products by suitability</span>
        </div>
      </div>
    </div>
  );
}

// No mock data - only real API responses

// Comprehensive Comparison Results Component
function ComparisonResults({ 
  product, 
  comparisons, 
  recommendations 
}: { 
  product: ProductCategory; 
  comparisons: Comparison[]; 
  recommendations: Recommendation[]; 
}) {
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
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full text-lg font-medium mb-6 border border-green-200">
          <CheckCircle className="w-5 h-5 mr-2" />
          Analysis Complete - {comparisons.length} Products Found
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {getProductDisplayName(product)} Comparison Results
        </h1>
        <p className="text-xl text-gray-600">Based on your requirements, here are the best matches across banks</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-xl shadow-lg border border-gray-200">
          {[
            { id: 'best-match', label: 'Best Match for You', icon: Target },
            { id: 'best-value', label: 'Best Value', icon: DollarSign },
            { id: 'best-overall', label: 'Best Overall', icon: Award }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterType(filter.id as 'best-value' | 'best-overall' | 'best-match')}
              className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-3 ${
                filterType === filter.id 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
              }`}
            >
              <filter.icon className="w-5 h-5" />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Recommendations - Highlighted Section */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-12 rounded-3xl border-2 border-blue-200">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Star className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-900">Top 3 Recommendations</h2>
            <Star className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-xl text-gray-600">
            Our AI has ranked these as your best matches with high approval probability
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {recommendations.slice(0, 3).map((rec: Recommendation, index: number) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-blue-200 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-l from-blue-100 to-transparent opacity-50 -z-10"></div>
              
              {/* Rank Badge */}
              <div className="absolute -top-4 -left-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                  'bg-gradient-to-r from-orange-400 to-orange-600'
                }`}>
                  #{index + 1}
                </div>
              </div>

              {/* Product Header */}
              <div className="mt-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{rec.product}</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-xl font-bold text-green-600">{rec.approval} Approval Chance</span>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="mb-8">
                <h4 className="font-bold text-lg text-gray-900 mb-4">Key Benefits</h4>
                <ul className="space-y-3">
                  {rec.benefits.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Button */}
              <div className="space-y-4">
                <a
                  href={rec.applyLink}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg"
                >
                  <ArrowRight className="w-5 h-5" />
                  Apply Now - Official Bank Page
                </a>
                <div className="text-center text-sm text-gray-500">
                  Redirects to {rec.product.split(' ')[0]} official website
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Secure Application
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Instant Decision
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side-by-Side Comparison Table */}
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100/50">
        <div className="flex items-center gap-4 mb-8">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">Side-by-Side Comparison</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-blue-50">
                {getComparisonHeaders(product).map((header, index) => (
                  <th key={index} className="text-left p-5 font-bold text-gray-900 border border-gray-200 text-lg">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((comp: Comparison, index: number) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                  <td className="p-5 border border-gray-200 font-bold text-gray-900 text-lg">
                    {comp.bank}
                  </td>
                  <td className="p-5 border border-gray-200 text-gray-700">
                    {comp.product}
                  </td>
                  <td className="p-5 border border-gray-200">
                    <span className={`px-4 py-2 rounded-full text-base font-bold ${
                      parseInt(comp.approval) >= 80 ? 'bg-green-100 text-green-800' :
                      parseInt(comp.approval) >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {comp.approval}
                    </span>
                  </td>
                  {product === 'credit-cards' && (
                    <>
                      <td className="p-5 border border-gray-200 text-gray-700">{comp.fee}</td>
                      <td className="p-5 border border-gray-200 text-gray-700">{comp.rate}</td>
                      <td className="p-5 border border-gray-200 text-gray-700">{comp.benefits}</td>
                    </>
                  )}
                  {product === 'personal-loans' && (
                    <>
                      <td className="p-5 border border-gray-200 text-gray-700">{comp.rate}</td>
                      <td className="p-5 border border-gray-200 font-bold text-gray-900 text-lg">{comp.emi}</td>
                      <td className="p-5 border border-gray-200 text-gray-700">{comp.processing || '1-2%'}</td>
                    </>
                  )}
                  {(product !== 'credit-cards' && product !== 'personal-loans') && (
                    <>
                      <td className="p-5 border border-gray-200 text-gray-700">{comp.rate || 'N/A'}</td>
                      <td className="p-5 border border-gray-200 text-gray-700">{comp.benefits || 'Standard'}</td>
                      <td className="p-5 border border-gray-200 text-gray-700">{comp.fee || 'As applicable'}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-bold text-xl text-blue-900 mb-2">How We Rank Products</h4>
              <p className="text-blue-800">
                Our AI considers your profile, current market rates, approval probability, and overall value 
                to rank products. The "Best Match" considers your specific requirements and eligibility.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white p-12 rounded-3xl text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Apply?</h2>
        <p className="text-xl text-gray-300 mb-8">
          These recommendations are personalized for your profile. Apply now to get the best rates and offers.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30">
            Apply for Top Choice
          </button>
          <button className="border-2 border-white text-white px-10 py-4 rounded-2xl font-bold hover:bg-white hover:text-gray-900 transition-all">
            Compare More Products
          </button>
        </div>
      </div>
    </div>
  );
}