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
  Star,
  ArrowLeft,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FinancialAdvisorChat } from '../../components/FinancialAdvisorChat';
import { EMICalculator, SIPCalculator, InsuranceCalculator, RetirementCalculator, SavingsCalculator } from '../../components/Calculators';

type ProductCategory =
  | 'credit-cards'
  | 'debit-cards'
  | 'personal-loans'
  | 'home-loans'
  | 'auto-loans'
  | 'education-loans'
  | 'business-loans'
  | 'health-insurance'
  | 'life-insurance'
  | 'auto-insurance'
  | 'home-insurance'
  | 'travel-insurance'
  | 'mutual-funds'
  | 'stocks'
  | 'nps'
  | 'bank-accounts'
  | 'fixed-deposits'
  | 'bonds'
  | 'gold'
  | 'emi-calculator'
  | 'sip-calculator'
  | 'insurance-calculator'
  | 'retirement-calculator'
  | 'savings-calculator';

interface FormData {
  [key: string]: string | string[] | number | undefined;
}

interface Recommendation {
  rank: number;
  product: string;
  benefits: string[];
  rewardRate?: string;
  interestRate?: string;
  fees?: string;
  premium?: string;  // For insurance
  coverage?: string;  // For insurance
  emi?: string;  // For loans
  returns?: string;  // For mutual funds
  expenseRatio?: string;  // For mutual funds
  applyLink: string;
}

interface Comparison {
  bank: string;
  product: string;
  applyLink?: string;
  applyUrl?: string;
  rewardRate?: string;
  rate?: string;
  fee?: string;
  benefits?: string;
  interestRate?: string;
  emi?: string;
  processing?: string;
}

interface ApiRecommendation {
  rank?: number;
  bankName?: string;
  productName?: string;
  keyBenefits?: string | string[];
  rewardRate?: string;
  interestRate?: string;
  fees?: string;
  premium?: string;  // For insurance
  coverage?: string;  // For insurance
  emi?: string;  // For loans
  returns?: string;  // For mutual funds
  expenseRatio?: string;  // For mutual funds
  applyUrl?: string;
}

interface GroundingSource {
  uri: string;
  title: string;
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
        { id: 'credit-cards', name: 'All Credit Cards', description: 'Cashback, Travel, Rewards, Premium, Business' }
      ]
    },
    {
      category: 'Loans & Mortgages',
      icon: Home,
      color: 'from-purple-500 to-purple-600',
      gradient: 'bg-gradient-to-r from-purple-50 to-pink-50',
      hasCalculator: true,
      calculatorType: 'EMI Calculator',
      calculatorId: 'emi-calculator',
      products: [
        { id: 'personal-loans', name: 'Personal Loans', description: 'Instant approval, competitive rates, debt consolidation' },
        { id: 'home-loans', name: 'Home Loans', description: 'Purchase, refinancing, construction, balance transfer' },
        { id: 'auto-loans', name: 'Auto Loans', description: 'New car, used car, two-wheeler loans' },
        { id: 'education-loans', name: 'Education Loans', description: 'Study abroad, domestic, skill development' },
        { id: 'business-loans', name: 'Business Loans', description: 'MSME, working capital, equipment financing' }
      ]
    },
    {
      category: 'Insurance',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      gradient: 'bg-gradient-to-r from-red-50 to-orange-50',
      hasCalculator: true,
      calculatorType: 'Premium Calculator',
      calculatorId: 'insurance-calculator',
      products: [
        { id: 'health-insurance', name: 'Health Insurance', description: 'Individual, family, senior citizen, critical illness' },
        { id: 'life-insurance', name: 'Life Insurance', description: 'Term, endowment, ULIP, whole life' },
        { id: 'auto-insurance', name: 'Vehicle Insurance', description: 'Car, bike, commercial vehicle, comprehensive' },
        { id: 'home-insurance', name: 'Home Insurance', description: 'Property, contents, liability, natural disasters' },
        { id: 'travel-insurance', name: 'Travel Insurance', description: 'Domestic, international, family, student' }
      ]
    },
    {
      category: 'Investments',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      gradient: 'bg-gradient-to-r from-green-50 to-emerald-50',
      hasCalculator: true,
      calculatorType: 'SIP Calculator',
      calculatorId: 'sip-calculator',
      products: [
        { id: 'mutual-funds', name: 'Mutual Funds', description: 'Equity, debt, hybrid, tax-saving (ELSS), index funds' },
        { id: 'stocks', name: 'Stocks & ETFs', description: 'Direct equity, ETFs, sectoral funds' },
        { id: 'nps', name: 'NPS & Pension', description: 'National Pension System, retirement planning' }
      ]
    },
    {
      category: 'Banking',
      icon: Building2,
      color: 'from-cyan-500 to-cyan-600',
      gradient: 'bg-gradient-to-r from-cyan-50 to-blue-50',
      products: [
        { id: 'bank-accounts', name: 'Bank Accounts', description: 'Savings, current, salary, zero-balance, NRI' },
        { id: 'debit-cards', name: 'Debit Cards', description: 'Platinum, international, cashback, contactless' }
      ]
    },
    {
      category: 'Assets & Deposits',
      icon: Landmark,
      color: 'from-indigo-500 to-indigo-600',
      gradient: 'bg-gradient-to-r from-indigo-50 to-purple-50',
      products: [
        { id: 'fixed-deposits', name: 'Fixed Deposits', description: 'Regular FD, tax-saving FD, senior citizen FD' },
        { id: 'bonds', name: 'Bonds & Debentures', description: 'Government bonds, corporate bonds, tax-free bonds' },
        { id: 'gold', name: 'Gold Investment', description: 'Digital gold, sovereign gold bonds, gold ETFs' }
      ]
    },
    {
      category: 'Calculators & Tools',
      icon: Calculator,
      color: 'from-amber-500 to-amber-600',
      gradient: 'bg-gradient-to-r from-amber-50 to-yellow-50',
      isCalculatorOnly: true,
      products: [
        { id: 'emi-calculator', name: 'EMI Calculator', description: 'Calculate monthly installments for loans' },
        { id: 'sip-calculator', name: 'SIP Calculator', description: 'Plan your mutual fund investments' },
        { id: 'insurance-calculator', name: 'Insurance Premium Calculator', description: 'Estimate your insurance costs' },
        { id: 'retirement-calculator', name: 'Retirement Planner', description: 'Plan your retirement corpus' },
        { id: 'savings-calculator', name: 'Savings Calculator', description: 'Plan your savings goals' }
      ]
    }
  ];

  if (selectedProduct) {
    return <ProductForm product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/unyfiny-logo.png"
                alt="UnyFiny Logo"
                width={180}
                height={50}
                className="h-14 w-auto object-contain"
              />
            </Link>

            <div className="flex items-center gap-4">
              <div className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium shadow-md hover:bg-slate-800 transition-colors">
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              AI-Powered Analysis
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Find Your Perfect <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-slate-900 via-emerald-800 to-slate-900">Financial Product</span>
          </motion.h1>

          <motion.p
            className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Compare. Choose. Save.
          </motion.p>
        </div>



        {/* Product Selection Grid */}
        <div className="space-y-8">
          {productCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center cursor-pointer group" onClick={() => !category.isCalculatorOnly && setSelectedProduct(category.products[0]?.id as ProductCategory)}>
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mr-6 group-hover:bg-slate-900 transition-colors duration-300 border border-slate-100">
                    <category.icon className="w-7 h-7 text-slate-900 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{category.category}</h2>
                    <p className="text-sm text-slate-500 mt-1">
                      {category.products.length} {category.isCalculatorOnly ? 'tools' : 'products'} available
                    </p>
                  </div>
                </div>
                {category.hasCalculator && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      if (category.calculatorId) {
                        setSelectedProduct(category.calculatorId as ProductCategory);
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl cursor-pointer hover:bg-emerald-100 transition-colors"
                  >
                    <Calculator className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-700">{category.calculatorType}</span>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.products.map((product, productIndex) => (
                  <motion.div
                    key={productIndex}
                    className="p-5 rounded-2xl bg-slate-50 border border-transparent hover:bg-white hover:border-slate-200 hover:shadow-lg transition-all cursor-pointer group/item"
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedProduct(product.id as ProductCategory)}
                  >
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover/item:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center text-xs font-bold text-slate-400 group-hover/item:text-emerald-600 uppercase tracking-wider transition-colors">
                      {category.isCalculatorOnly ? 'Open' : 'Compare'} <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <FinancialAdvisorChat />
    </div>
  );
}

export default function PlatformPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center">
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
  const [sources, setSources] = useState<GroundingSource[]>([]);

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

        const normalizeText = (value?: string) =>
          (value || '').toLowerCase().replace(/[^a-z0-9]/g, '');

        const normalizeExternalUrl = (url?: string) => {
          if (!url) {
            return undefined;
          }

          const raw = url.trim();
          const normalizedRaw = raw.toLowerCase();

          if (
            !raw ||
            raw === '#' ||
            normalizedRaw.includes('official-url') ||
            normalizedRaw.includes('officialbank.com') ||
            normalizedRaw.includes('example.com')
          ) {
            return undefined;
          }

          const withProtocol = /^https?:\/\//i.test(raw)
            ? raw
            : /^(www\.|[a-z0-9.-]+\.[a-z]{2,})(\/|$)/i.test(raw)
              ? `https://${raw}`
              : raw;

          try {
            const parsedUrl = new URL(withProtocol);
            const isHttp = parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
            return isHttp ? parsedUrl.toString() : undefined;
          } catch {
            return undefined;
          }
        };

        // Set recommendations from AI response
        let recommendationRows: ApiRecommendation[] = [];
        if (data.data.recommendations && data.data.recommendations.length > 0) {
          recommendationRows = data.data.recommendations;
          const formattedRecs = data.data.recommendations.map((rec: ApiRecommendation) => ({
            rank: rec.rank || 1,
            product: `${rec.bankName || 'Bank'} ${rec.productName || 'Product'}`,
            benefits: Array.isArray(rec.keyBenefits) ? rec.keyBenefits : [rec.keyBenefits || 'Benefits available'],
            rewardRate: rec.rewardRate,
            interestRate: rec.interestRate,
            fees: rec.fees,
            premium: rec.premium,  // For insurance
            coverage: rec.coverage,  // For insurance
            emi: rec.emi,  // For loans
            returns: rec.returns,  // For mutual funds
            expenseRatio: rec.expenseRatio,  // For mutual funds
            applyLink: normalizeExternalUrl(rec.applyUrl) || '#'
          }));
          setRecommendations(formattedRecs);
        } else {
          // If no recommendations, show message
          setRecommendations([{
            rank: 1,
            product: 'No suitable products found',
            benefits: ['Please check your inputs and try again', 'Consider adjusting your requirements'],
            applyLink: '#'
          }]);
        }

        // Set comparisons from AI response
        if (data.data.comparisons && data.data.comparisons.length > 0) {
          const groundedSources: GroundingSource[] = Array.isArray(data.sources) ? data.sources : [];

          const enrichedComparisons = data.data.comparisons.map((comp: Comparison) => {
            const directLink = normalizeExternalUrl(comp.applyLink) || normalizeExternalUrl(comp.applyUrl);

            if (directLink) {
              return { ...comp, applyLink: directLink };
            }

            const compBank = normalizeText(comp.bank);
            const compProduct = normalizeText(comp.product);

            const matchedRecommendation = recommendationRows.find((rec) => {
              const recBank = normalizeText(rec.bankName);
              const recProduct = normalizeText(rec.productName);

              const bankMatches = compBank && recBank && (compBank.includes(recBank) || recBank.includes(compBank));
              const productMatches = compProduct && recProduct && (compProduct.includes(recProduct) || recProduct.includes(compProduct));

              return bankMatches || productMatches;
            });

            const matchedSource = groundedSources.find((source: GroundingSource) => {
              const sourceText = normalizeText(`${source.title} ${source.uri}`);
              const bankMatches = compBank && sourceText.includes(compBank);
              const productMatches = compProduct && sourceText.includes(compProduct);

              return bankMatches || productMatches;
            });

            return {
              ...comp,
              applyLink: normalizeExternalUrl(matchedRecommendation?.applyUrl)
                || normalizeExternalUrl(matchedSource?.uri),
            };
          });

          setComparisons(enrichedComparisons);
        } else {
          setComparisons([]);
        }

        // Set sources from grounding
        if (data.sources && data.sources.length > 0) {
          setSources(data.sources);
        } else {
          setSources([]);
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/unyfiny-logo.png"
                alt="UnyFiny Logo"
                width={180}
                height={50}
                className="h-14 w-auto object-contain"
              />
            </Link>

            <button
              onClick={onBack}
              className="flex items-center text-slate-500 hover:text-slate-900 transition-colors font-medium group text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Products
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {step === 1 && <InputForm product={product} formData={formData} onInputChange={handleInputChange} onCompare={handleCompare} />}
        {step === 2 && <LoadingComparison />}
        {step === 3 && <ComparisonResults product={product} comparisons={comparisons} recommendations={recommendations} sources={sources} />}
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
      case 'emi-calculator':
        return <EMICalculator />;
      case 'sip-calculator':
        return <SIPCalculator />;
      case 'insurance-calculator':
        return <InsuranceCalculator />;
      case 'retirement-calculator':
        return <RetirementCalculator />;
      case 'savings-calculator':
        return <SavingsCalculator />;
      default:
        return <GenericForm formData={formData} onInputChange={onInputChange} />;
    }
  };

  // If it's a calculator, don't show the "Compare" button or the header in the same way
  if (product.includes('calculator')) {
    return (
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200">
        {getProductForm()}
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6">
            <Calculator className="w-3 h-3" />
            Comparison Engine
          </div>
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 capitalize tracking-tight">
          {product.replace('-', ' ')} Comparison
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Enter your requirements to compare options across banks and get top 3 recommendations
        </p>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200">
        {getProductForm()}

        <div className="mt-12 pt-8 border-t border-slate-100">
          <button
            onClick={onCompare}
            className="w-full bg-slate-900 text-white py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
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
function CreditCardForm({
  formData,
  onInputChange
}: {
  formData: FormData;
  onInputChange: (field: string, value: string | string[] | number) => void;
}) {
  const isBusiness = formData['cardCategory'] === 'business';

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
          <CreditCard className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Credit Card Requirements</h2>
      </div>

      {/* Card Category Selection */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <label className="block text-sm font-bold text-slate-900 mb-4">Card Category</label>
        <div className="flex flex-col sm:flex-row gap-6">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="cardCategory"
              value="retail"
              defaultChecked
              className="w-5 h-5 text-emerald-600 border-slate-300 focus:ring-emerald-500"
              onChange={() => onInputChange('cardCategory', 'retail')}
            />
            <div>
              <span className="block text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Retail (Personal)</span>
              <span className="text-xs text-slate-500">For personal use, shopping, travel</span>
            </div>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="cardCategory"
              value="business"
              className="w-5 h-5 text-emerald-600 border-slate-300 focus:ring-emerald-500"
              onChange={() => onInputChange('cardCategory', 'business')}
            />
            <div>
              <span className="block text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Commercial (Business)</span>
              <span className="text-xs text-slate-500">For business expenses, shopkeepers, corporates</span>
            </div>
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
          <select
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
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
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {isBusiness ? 'Monthly Business Income / Turnover' : 'Monthly Income'}
          </label>
          <select
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
            onChange={(e) => onInputChange('income', e.target.value)}
          >
            <option value="">Select income range</option>
            <option value="50k-100k">₹50k - ₹1L</option>
            <option value="100k-200k">₹1L - ₹2L</option>
            <option value="200k-500k">₹2L - ₹5L</option>
            <option value="500k+">₹5L+ (Premium)</option>
          </select>
        </div>

        {!isBusiness && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Employment Type</label>
            <select
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
              onChange={(e) => onInputChange('employment', e.target.value)}
            >
              <option value="">Select employment type</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self-employed</option>
              <option value="student">Student</option>
            </select>
          </div>
        )}

        {isBusiness && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Business Type</label>
            <select
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
              onChange={(e) => onInputChange('businessType', e.target.value)}
            >
              <option value="">Select business type</option>
              <option value="retail-shop">Retail Shop / Store</option>
              <option value="wholesale">Wholesale / Distributor</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="services">Services / Consultant</option>
              <option value="freelancer">Freelancer / Professional</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">CIBIL Score (if known)</label>
          <select
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
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
        <label className="block text-sm font-medium text-slate-700 mb-4">
          {isBusiness ? 'Business Spending Needs' : 'Spending Pattern (Select all that apply)'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(isBusiness
            ? ['Inventory', 'Travel/Hotels', 'Utility Bills', 'Office Supplies', 'Dining/Client Meetings', 'Fuel', 'Online Ads', 'Software/SaaS']
            : ['Travel', 'Online Shopping', 'Dining', 'Fuel', 'Groceries', 'Entertainment', 'Bills', 'Others']
          ).map((pattern) => (
            <label key={pattern} className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                onChange={(e) => {
                  const current = Array.isArray(formData.spendingPattern) ? formData.spendingPattern : [];
                  const updated = e.target.checked
                    ? [...current, pattern]
                    : current.filter((p: string) => p !== pattern);
                  onInputChange('spendingPattern', updated);
                }}
              />
              <span className="text-sm text-slate-700">{pattern}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-4">Card Preferences</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['Cashback', 'Rewards Points', 'Travel Miles', 'Lounge Access', 'Premium Benefits', 'Low/No Annual Fee'].map((pref) => (
            <label key={pref} className="flex items-center space-x-3 cursor-pointer p-4 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100 hover:border-slate-200">
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                checked={Array.isArray(formData.cardPreference) ? formData.cardPreference.includes(pref) : false}
                onChange={(e) => {
                  const current = Array.isArray(formData.cardPreference) ? formData.cardPreference : [];
                  const updated = e.target.checked
                    ? [...current, pref]
                    : current.filter((p: string) => p !== pref);
                  onInputChange('cardPreference', updated);
                }}
              />
              <span className="text-sm text-slate-700">{pref}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// Personal Loan Form  
// Personal Loan Form
function PersonalLoanForm({
  onInputChange
}: {
  formData: FormData;
  onInputChange: (field: string, value: string | string[] | number) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
          <PiggyBank className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Personal Loan Requirements</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Loan Amount (₹)</label>
          <input
            type="number"
            placeholder="e.g., 500000"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
            onChange={(e) => onInputChange('loanAmount', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Tenure</label>
          <select
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
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
          <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Income (₹)</label>
          <input
            type="number"
            placeholder="e.g., 60000"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
            onChange={(e) => onInputChange('monthlyIncome', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Employment Type</label>
          <select
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
            onChange={(e) => onInputChange('employment', e.target.value)}
          >
            <option value="">Select employment type</option>
            <option value="salaried">Salaried</option>
            <option value="self-employed">Self-employed</option>
            <option value="business">Business Owner</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">CIBIL Score</label>
          <select
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
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
          <label className="block text-sm font-medium text-slate-700 mb-2">Purpose</label>
          <select
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
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
        <label className="block text-sm font-medium text-slate-700 mb-3">Interest Type Preference</label>
        <div className="flex gap-6">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="interestType"
              className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
              onChange={() => onInputChange('interestType', 'fixed')}
            />
            <span className="text-sm text-slate-700 group-hover:text-emerald-700 transition-colors">Fixed Rate</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="interestType"
              className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
              onChange={() => onInputChange('interestType', 'floating')}
            />
            <span className="text-sm text-slate-700 group-hover:text-emerald-700 transition-colors">Floating Rate</span>
          </label>
        </div>
      </div>
    </div>
  );
}

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
        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
          <Shield className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Health Insurance Requirements</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
          <input
            type="number"
            placeholder="e.g., 32"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
            onChange={(e) => onInputChange('age', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Family Size</label>
          <select
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
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
          <label className="block text-sm font-medium text-slate-700 mb-2">Sum Insured (₹)</label>
          <select
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
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
          <label className="block text-sm font-medium text-slate-700 mb-2">Premium Budget (Annual)</label>
          <select
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
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
        <label className="block text-sm font-medium text-slate-700 mb-4">Required Add-ons (Select all that apply)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            'Critical Illness',
            'Maternity Cover',
            'OPD Cover',
            'Room Rent Waiver',
            'No Claim Bonus Protector',
            'Consumables Cover',
            'Daily Hospital Cash',
            'AYUSH Cover',
            'Mental Health',
            'Home Care Treatment',
            'Personal Accident Cover',
            'International Treatment Cover',
            'Top-up / Deductible Add-on',
            'Emergency Services (Ambulance + Air Ambulance)',
            'Other'
          ].map((addon) => (
            <label key={addon} className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 shrink-0"
                onChange={(e) => {
                  const current = Array.isArray(_formData.addons) ? _formData.addons : [];
                  const updated = e.target.checked
                    ? [...current, addon]
                    : current.filter((a: string) => a !== addon);
                  onInputChange('addons', updated);
                }}
              />
              <span className="text-sm text-slate-700">{addon}</span>
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
        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Mutual Fund Investment</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
          <input
            type="number"
            placeholder="e.g., 32"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
            onChange={(e) => onInputChange('age', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Investment Experience</label>
          <select
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
            onChange={(e) => onInputChange('experience', e.target.value)}
          >
            <option value="">Select experience</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Monthly SIP Amount (₹)</label>
          <input
            type="number"
            placeholder="e.g., 10000"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
            onChange={(e) => onInputChange('sipAmount', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Investment Horizon</label>
          <select
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
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
        <label className="block text-sm font-medium text-slate-700 mb-3">Risk Appetite</label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: 'low', label: 'Low Risk', desc: 'Stable returns, low volatility' },
            { value: 'medium', label: 'Medium Risk', desc: 'Balanced growth and safety' },
            { value: 'high', label: 'High Risk', desc: 'High growth potential' }
          ].map((risk) => (
            <label key={risk.value} className="cursor-pointer group">
              <input
                type="radio"
                name="riskAppetite"
                className="sr-only peer"
                onChange={() => onInputChange('riskAppetite', risk.value)}
              />
              <div className="p-5 border border-slate-200 rounded-2xl peer-checked:border-emerald-600 peer-checked:bg-emerald-50 hover:bg-slate-50 transition-all hover:shadow-sm">
                <div className="font-medium text-slate-900 text-lg group-hover:text-emerald-700 transition-colors">{risk.label}</div>
                <div className="text-sm text-slate-600 mt-2">{risk.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Investment Goal</label>
        <select
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
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
        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
          <Home className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Home Loan Requirements</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Loan Amount (₹)</label>
          <input
            type="number"
            placeholder="e.g., 4000000"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
            onChange={(e) => onInputChange('loanAmount', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Tenure (Years)</label>
          <select
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
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
          <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Income (₹)</label>
          <input
            type="number"
            placeholder="e.g., 100000"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
            onChange={(e) => onInputChange('monthlyIncome', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">CIBIL Score</label>
          <select
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
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
        <label className="block text-sm font-medium text-slate-700 mb-3">Property Type</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Apartment', 'Independent House', 'Villa', 'Plot'].map((type) => (
            <label key={type} className="flex items-center space-x-3 cursor-pointer p-4 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100 hover:border-slate-200">
              <input
                type="radio"
                name="propertyType"
                className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
                onChange={() => onInputChange('propertyType', type)}
              />
              <span className="text-sm text-slate-700">{type}</span>
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
        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
          <CreditCard className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Product Requirements</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
          <input
            type="number"
            placeholder="Enter your age"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
            onChange={(e) => onInputChange('age', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Income (₹)</label>
          <input
            type="number"
            placeholder="Enter monthly income"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-slate-300"
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
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="inline-block mx-auto mb-8 p-4 bg-white rounded-full shadow-lg border border-slate-100"
      >
        <Calculator className="w-12 h-12 text-emerald-500" />
      </motion.div>
      <h2 className="text-3xl font-bold text-slate-900 mb-4">Analyzing Financial Products</h2>
      <p className="text-xl text-slate-600 mb-12 max-w-lg mx-auto">
        Our AI is comparing thousands of options across banks to find your perfect match...
      </p>
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center text-left text-sm font-medium text-slate-600 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-4 animate-pulse"></div>
          <span>Fetching real-time interest rates and offers</span>
        </div>
        <div className="flex items-center text-left text-sm font-medium text-slate-600 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-4 animate-pulse delay-75"></div>
          <span>Calculating approval probability based on your profile</span>
        </div>
        <div className="flex items-center text-left text-sm font-medium text-slate-600 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-4 animate-pulse delay-150"></div>
          <span>Ranking products by value and benefits</span>
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
  recommendations,
  sources
}: {
  product: ProductCategory;
  comparisons: Comparison[];
  recommendations: Recommendation[];
  sources: GroundingSource[];
}) {
  const normalizeExternalUrl = (url?: string) => {
    if (!url) {
      return undefined;
    }

    const raw = url.trim();
    const normalizedRaw = raw.toLowerCase();

    if (
      !raw ||
      raw === '#' ||
      normalizedRaw.includes('official-url') ||
      normalizedRaw.includes('officialbank.com') ||
      normalizedRaw.includes('example.com')
    ) {
      return undefined;
    }

    const withProtocol = /^https?:\/\//i.test(raw)
      ? raw
      : /^(www\.|[a-z0-9.-]+\.[a-z]{2,})(\/|$)/i.test(raw)
        ? `https://${raw}`
        : raw;

    try {
      const parsedUrl = new URL(withProtocol);
      const isHttp = parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';

      return isHttp ? parsedUrl.toString() : undefined;
    } catch {
      return undefined;
    }
  };

  const isValidExternalLink = (url?: string) => {
    const normalizedUrl = normalizeExternalUrl(url);
    if (!normalizedUrl) {
      return false;
    }

    try {
      const parsedUrl = new URL(normalizedUrl);
      const isHttp = parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
      if (!isHttp) {
        return false;
      }

      if (typeof window !== 'undefined') {
        return parsedUrl.origin !== window.location.origin;
      }

      return true;
    } catch {
      return false;
    }
  };

  const normalizeText = (value?: string) =>
    (value || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  const getComparisonApplyLink = (comp: Comparison) => {
    const compDirectLink = normalizeExternalUrl(comp.applyLink) || normalizeExternalUrl(comp.applyUrl);
    if (isValidExternalLink(compDirectLink)) {
      return compDirectLink;
    }

    const compBank = normalizeText(comp.bank);
    const compProduct = normalizeText(comp.product);

    const matchedRecommendation = recommendations.find((rec) => {
      const recProduct = normalizeText(rec.product);
      const bankMatches = compBank && recProduct.includes(compBank);
      const productMatches = compProduct && recProduct.includes(compProduct);

      return bankMatches || productMatches;
    });

    const matchedSource = sources.find((source) => {
      const sourceText = normalizeText(`${source.title} ${source.uri}`);
      const bankMatches = compBank && sourceText.includes(compBank);
      const productMatches = compProduct && sourceText.includes(compProduct);

      return bankMatches || productMatches;
    });

    const sourceUrl = normalizeExternalUrl(matchedSource?.uri);
    if (isValidExternalLink(sourceUrl)) {
      return sourceUrl;
    }

    const recommendationUrl = normalizeExternalUrl(matchedRecommendation?.applyLink);
    return isValidExternalLink(recommendationUrl)
      ? recommendationUrl
      : undefined;
  };

  const getProductDisplayName = (product: string) => {
    return product.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getComparisonHeaders = (product: string) => {
    const commonHeaders = ['Bank', 'Product'];

    switch (product) {
      case 'credit-cards':
        return [...commonHeaders, 'Reward Rate', 'Annual Fee', 'Interest (APR)', 'Key Benefits'];
      case 'personal-loans':
        return [...commonHeaders, 'Interest Rate', 'Processing Fee', 'EMI', 'Features'];
      case 'health-insurance':
        return [...commonHeaders, 'Premium', 'Sum Insured', 'Network Hospitals', 'Features'];
      case 'mutual-funds':
        return [...commonHeaders, 'Expense Ratio', 'Return (3Y)', 'Fund Type', 'Risk'];
      case 'home-loans':
        return [...commonHeaders, 'Interest Rate', 'Processing Fee', 'EMI', 'Features'];
      default:
        return [...commonHeaders, 'Rate', 'Fee', 'Features', 'Terms'];
    }
  };

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold mb-8">
          <CheckCircle className="w-4 h-4" />
          Analysis Complete • {comparisons.length} Products Found
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          {getProductDisplayName(product)} Comparison Results
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Based on your unique profile and requirements, our AI has identified the best matches across top banks.
        </p>
      </div>

      {/* Top 3 Recommendations - Highlighted Section */}
      <div className="relative">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
            <h2 className="text-3xl font-bold text-slate-900">Top 3 Recommendations</h2>
            <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
          </div>
          <p className="text-lg text-slate-600">
            Ranked by approval probability and value for you
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {recommendations.slice(0, 3).map((rec: Recommendation, index: number) => (
            <motion.div
              key={index}
              className={`bg-white rounded-3xl shadow-xl border overflow-hidden relative flex flex-col h-full ${index === 0 ? 'border-amber-200 ring-4 ring-amber-50 shadow-amber-100' : 'border-slate-200'
                }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Rank Badge */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-transparent via-slate-200 to-transparent"></div>
              {index === 0 && <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-amber-300 via-yellow-400 to-amber-300"></div>}

              <div className="p-8 pb-0">
                <div className="flex justify-between items-start mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl font-bold text-xl shadow-sm ${index === 0 ? 'bg-amber-100 text-amber-700' :
                    index === 1 ? 'bg-slate-100 text-slate-700' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                    #{index + 1}
                  </div>
                  {index === 0 && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider rounded-full">
                      Best Match
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-6 leading-tight min-h-16">{rec.product}</h3>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Credit Cards: Reward Rate */}
                  {rec.rewardRate && (
                    <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="text-xs uppercase tracking-wide text-slate-500 mb-1 font-semibold">Rewards</div>
                      <div className="text-lg font-bold text-emerald-600">{rec.rewardRate}</div>
                    </div>
                  )}

                  {/* Insurance: Premium & Coverage */}
                  {rec.premium && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-xs uppercase tracking-wide text-slate-500 mb-1 font-semibold">Premium</div>
                      <div className="text-base font-bold text-slate-900">{rec.premium}</div>
                    </div>
                  )}
                  {rec.coverage && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-xs uppercase tracking-wide text-slate-500 mb-1 font-semibold">Coverage</div>
                      <div className="text-base font-bold text-slate-900">{rec.coverage}</div>
                    </div>
                  )}

                  {/* Loans: EMI */}
                  {rec.emi && (
                    <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="text-xs uppercase tracking-wide text-slate-500 mb-1 font-semibold">Monthly EMI</div>
                      <div className="text-lg font-bold text-emerald-600">{rec.emi}</div>
                    </div>
                  )}

                  {/* Mutual Funds: Returns */}
                  {rec.returns && (
                    <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="text-xs uppercase tracking-wide text-slate-500 mb-1 font-semibold">3Y Returns</div>
                      <div className="text-lg font-bold text-emerald-600">{rec.returns}</div>
                    </div>
                  )}

                  {/* Secondary Metrics */}
                  {(rec.fees || rec.interestRate || rec.expenseRatio) && (
                    <>
                      <div className="bg-white p-3 rounded-xl border border-slate-100">
                        <div className="text-xs uppercase tracking-wide text-slate-400 mb-1 font-medium">
                          {rec.premium ? 'Fees' : rec.emi ? 'Proc. Fee' : rec.expenseRatio ? 'Exp. Ratio' : 'Fees'}
                        </div>
                        <div className="text-sm font-semibold text-slate-700">{rec.fees || rec.expenseRatio || '-'}</div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-100">
                        <div className="text-xs uppercase tracking-wide text-slate-400 mb-1 font-medium">
                          {rec.emi ? 'Rate' : 'Interest'}
                        </div>
                        <div className="text-sm font-semibold text-slate-700">{rec.interestRate || '-'}</div>
                      </div>
                    </>
                  )}
                </div>

                {/* Benefits List */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Key Benefits</h4>
                  <ul className="space-y-3">
                    {rec.benefits.slice(0, 3).map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Action */}
              <div className="mt-auto p-6 pt-0">
                <a
                  href={rec.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-lg ${index === 0
                    ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20'
                    : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                  Apply Now <ExternalLink className="w-4 h-4" />
                </a>
                <div className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" /> Official Bank Link
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sources Section - Collapsible */}
      {sources.length > 0 && (
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm">
                <ExternalLink className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Verified Sources</h3>
            </div>
            <button
              onClick={() => {
                const sourcesGrid = document.getElementById('sources-grid');
                const btn = document.getElementById('sources-toggle-btn');
                if (sourcesGrid && btn) {
                  const isHidden = sourcesGrid.classList.contains('hidden');
                  sourcesGrid.classList.toggle('hidden');
                  btn.textContent = isHidden ? 'Hide Sources' : 'View All Sources';
                }
              }}
              id="sources-toggle-btn"
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2"
            >
              View All Sources
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <p className="text-slate-600 mb-6 text-sm">
            Information verified from {sources.length} official bank websites in real-time
          </p>
          <div id="sources-grid" className="md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sources.map((source, idx) => (
              <a
                key={idx}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group flex items-start gap-3"
              >
                <div className="mt-1">
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {source.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                    {new URL(source.uri).hostname}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <Calculator className="w-5 h-5 text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Side-by-Side Comparison</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/50">
                {getComparisonHeaders(product).map((header, index) => (
                  <th key={index} className="p-5 font-semibold text-slate-900 border-b border-slate-200 text-sm uppercase tracking-wider whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisons.map((comp: Comparison, index: number) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-bold text-slate-900">
                    <button
                      className={`font-bold bg-transparent border-none px-0 py-0 focus:outline-none ${getComparisonApplyLink(comp)
                        ? 'text-emerald-700 underline cursor-pointer hover:text-emerald-900'
                        : 'text-slate-500 cursor-not-allowed'
                        }`}
                      onClick={() => {
                        const applyLink = getComparisonApplyLink(comp);
                        if (applyLink) {
                          window.open(applyLink, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      disabled={!getComparisonApplyLink(comp)}
                    >
                      {comp.bank}
                    </button>
                  </td>
                  <td className="p-5 text-slate-700 font-medium">
                    <button
                      className={`font-semibold bg-transparent border-none px-0 py-0 focus:outline-none ${getComparisonApplyLink(comp)
                        ? 'text-blue-700 underline cursor-pointer hover:text-blue-900'
                        : 'text-slate-500 cursor-not-allowed'
                        }`}
                      onClick={() => {
                        const applyLink = getComparisonApplyLink(comp);
                        if (applyLink) {
                          window.open(applyLink, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      disabled={!getComparisonApplyLink(comp)}
                    >
                      {comp.product}
                    </button>
                  </td>
                  {product === 'credit-cards' && (
                    <>
                      <td className="p-5 text-emerald-600 font-semibold">{comp.rewardRate || '-'}</td>
                      <td className="p-5 text-slate-600">{comp.fee || '-'}</td>
                      <td className="p-5 text-slate-600">{comp.interestRate || '-'}</td>
                      <td className="p-5 text-slate-600 text-sm max-w-xs">{comp.benefits || '-'}</td>
                    </>
                  )}
                  {(product === 'personal-loans' || product === 'home-loans' || product === 'auto-loans' || product === 'education-loans') && (
                    <>
                      <td className="p-5 text-slate-600">{comp.rate || '-'}</td>
                      <td className="p-5 text-slate-600">{comp.processing || '-'}</td>
                      <td className="p-5 font-bold text-slate-900">{comp.emi || '-'}</td>
                      <td className="p-5 text-slate-600 text-sm max-w-xs">{comp.benefits || '-'}</td>
                    </>
                  )}
                  {(product === 'health-insurance' || product === 'life-insurance' || product === 'auto-insurance' || product === 'home-insurance') && (
                    <>
                      <td className="p-5 text-emerald-600 font-semibold">{comp.rate || '-'}</td>
                      <td className="p-5 text-slate-600">{comp.fee || '-'}</td>
                      <td className="p-5 text-slate-600">{comp.benefits || '-'}</td>
                      <td className="p-5 text-slate-600 text-sm max-w-xs">{comp.benefits || '-'}</td>
                    </>
                  )}
                  {product === 'mutual-funds' && (
                    <>
                      <td className="p-5 text-slate-600">{comp.fee || '-'}</td>
                      <td className="p-5 text-emerald-600 font-semibold">{comp.rate || '-'}</td>
                      <td className="p-5 text-slate-600">{comp.benefits || '-'}</td>
                      <td className="p-5 text-slate-600">{comp.benefits || '-'}</td>
                    </>
                  )}
                  {!['credit-cards', 'personal-loans', 'home-loans', 'auto-loans', 'education-loans', 'health-insurance', 'life-insurance', 'auto-insurance', 'home-insurance', 'mutual-funds'].includes(product) && (
                    <>
                      <td className="p-5 text-slate-600">{comp.rate || '-'}</td>
                      <td className="p-5 text-slate-600">{comp.fee || '-'}</td>
                      <td className="p-5 text-slate-600">{comp.benefits || 'Standard'}</td>
                      <td className="p-5 text-slate-600">{comp.benefits || 'Standard'}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">How We Rank Products</h4>
              <p className="text-sm text-slate-600">
                Our AI considers your profile, current market rates, approval probability, and overall value
                to rank products. The &quot;Best Match&quot; considers your specific requirements and eligibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
