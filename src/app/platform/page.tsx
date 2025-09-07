'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  User, 
  DollarSign, 
  CreditCard, 
  Shield, 
  TrendingUp, 
  Home,
  ArrowRight,
  CheckCircle,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  // Personal Information
  age: z.number().min(18, "Age must be at least 18").max(100, "Age must be less than 100"),
  income: z.number().min(0, "Income cannot be negative"),
  creditScore: z.number().min(300, "Credit score must be at least 300").max(850, "Credit score cannot exceed 850"),
  employmentStatus: z.enum(['employed', 'self-employed', 'unemployed', 'student', 'retired']),
  
  // Financial Goals
  primaryGoal: z.enum([
    'build-credit',
    'save-money',
    'invest',
    'buy-home',
    'debt-consolidation',
    'emergency-fund',
    'retirement'
  ]),
  
  // Products Interested In
  interestedProducts: z.array(z.string()).min(1, "Please select at least one product you're interested in"),
  
  // Financial Situation
  currentDebt: z.number().min(0, "Debt cannot be negative"),
  monthlyExpenses: z.number().min(0, "Expenses cannot be negative"),
  existingAccounts: z.array(z.string()),
  riskTolerance: z.enum(['conservative', 'moderate', 'aggressive']),
  
  // Insurance Needs
  insuranceNeeds: z.array(z.string()),
  
  // Investment Preferences
  investmentTimeframe: z.enum(['short', 'medium', 'long']),
  investmentAmount: z.number().min(0, "Investment amount cannot be negative"),
});

type FormData = z.infer<typeof formSchema>;

interface RecommendationsResponse {
  success: boolean;
  recommendations?: string;
  error?: string;
}

export default function PlatformPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationsResponse | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interestedProducts: [],
      existingAccounts: [],
      insuranceNeeds: [],
    }
  });

  const totalSteps = 4;

  const onSubmit = async (data: FormData) => {
    console.log('Form submitted with data:', data);
    setLoading(true);
    
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      console.log('API response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('API result:', result);
        setRecommendations(result);
        setStep(5);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('API error:', errorData);
        alert('Failed to get recommendations. Please try again.');
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
      alert('An error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleArrayChange = (field: 'interestedProducts' | 'existingAccounts' | 'insuranceNeeds', value: string) => {
    const currentValues = watch(field) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    setValue(field, newValues);
  };

  const validateStep = (stepNumber: number) => {
    const formValues = watch();
    
    switch (stepNumber) {
      case 1:
        return formValues.age && formValues.income !== undefined && formValues.creditScore && formValues.employmentStatus;
      case 2:
        return formValues.primaryGoal && formValues.currentDebt !== undefined && formValues.monthlyExpenses !== undefined && formValues.riskTolerance;
      case 3:
        return formValues.interestedProducts && formValues.interestedProducts.length > 0;
      case 4:
        return formValues.investmentTimeframe && formValues.investmentAmount !== undefined;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  {...register('age', { valueAsNumber: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your age"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income ($)</label>
                <input
                  type="number"
                  {...register('income', { valueAsNumber: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="50000"
                />
                {errors.income && <p className="text-red-500 text-sm mt-1">{errors.income.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Credit Score</label>
                <input
                  type="number"
                  {...register('creditScore', { valueAsNumber: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="700"
                />
                {errors.creditScore && <p className="text-red-500 text-sm mt-1">{errors.creditScore.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status</label>
                <select
                  {...register('employmentStatus')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select employment status</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="student">Student</option>
                  <option value="retired">Retired</option>
                </select>
                {errors.employmentStatus && <p className="text-red-500 text-sm mt-1">{errors.employmentStatus.message}</p>}
              </div>
            </div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Financial Goals & Situation</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Financial Goal</label>
                <select
                  {...register('primaryGoal')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your primary goal</option>
                  <option value="build-credit">Build Credit</option>
                  <option value="save-money">Save Money</option>
                  <option value="invest">Start Investing</option>
                  <option value="buy-home">Buy a Home</option>
                  <option value="debt-consolidation">Debt Consolidation</option>
                  <option value="emergency-fund">Build Emergency Fund</option>
                  <option value="retirement">Retirement Planning</option>
                </select>
                {errors.primaryGoal && <p className="text-red-500 text-sm mt-1">{errors.primaryGoal.message}</p>}
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Debt ($)</label>
                  <input
                    type="number"
                    {...register('currentDebt', { valueAsNumber: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                  {errors.currentDebt && <p className="text-red-500 text-sm mt-1">{errors.currentDebt.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Expenses ($)</label>
                  <input
                    type="number"
                    {...register('monthlyExpenses', { valueAsNumber: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2000"
                  />
                  {errors.monthlyExpenses && <p className="text-red-500 text-sm mt-1">{errors.monthlyExpenses.message}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Risk Tolerance</label>
                <div className="grid grid-cols-3 gap-3">
                  {['conservative', 'moderate', 'aggressive'].map((risk) => (
                    <label key={risk} className="relative">
                      <input
                        type="radio"
                        {...register('riskTolerance')}
                        value={risk}
                        className="sr-only peer"
                      />
                      <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:bg-gray-50 transition-colors">
                        <div className="font-medium text-gray-900 capitalize">{risk}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {risk === 'conservative' && 'Low risk, steady returns'}
                          {risk === 'moderate' && 'Balanced risk and reward'}
                          {risk === 'aggressive' && 'High risk, high potential returns'}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.riskTolerance && <p className="text-red-500 text-sm mt-1">{errors.riskTolerance.message}</p>}
              </div>
            </div>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Product Preferences</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Which financial products are you interested in? (Select all that apply)
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { id: 'credit-cards', label: 'Credit Cards', icon: CreditCard },
                    { id: 'personal-loans', label: 'Personal Loans', icon: DollarSign },
                    { id: 'mortgages', label: 'Mortgages', icon: Home },
                    { id: 'insurance', label: 'Insurance', icon: Shield },
                    { id: 'investments', label: 'Investments', icon: TrendingUp },
                    { id: 'bank-accounts', label: 'Bank Accounts', icon: DollarSign },
                  ].map((product) => (
                    <label key={product.id} className="relative">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        onChange={() => handleArrayChange('interestedProducts', product.id)}
                      />
                      <div className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:bg-gray-50 transition-colors">
                        <product.icon className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">{product.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.interestedProducts && <p className="text-red-500 text-sm mt-1">{errors.interestedProducts.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Insurance Needs</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'Life Insurance',
                    'Health Insurance',
                    'Auto Insurance',
                    'Home/Renters Insurance',
                    'Disability Insurance',
                    'Travel Insurance'
                  ].map((insurance) => (
                    <label key={insurance} className="relative">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        onChange={() => handleArrayChange('insuranceNeeds', insurance.toLowerCase().replace('/', '-').replace(' ', '-'))}
                      />
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:bg-gray-50 transition-colors">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-900">{insurance}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Investment Preferences</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Time Frame</label>
                  <select
                    {...register('investmentTimeframe')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select timeframe</option>
                    <option value="short">Short Term (1-3 years)</option>
                    <option value="medium">Medium Term (3-10 years)</option>
                    <option value="long">Long Term (10+ years)</option>
                  </select>
                  {errors.investmentTimeframe && <p className="text-red-500 text-sm mt-1">{errors.investmentTimeframe.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount ($)</label>
                  <input
                    type="number"
                    {...register('investmentAmount', { valueAsNumber: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1000"
                  />
                  {errors.investmentAmount && <p className="text-red-500 text-sm mt-1">{errors.investmentAmount.message}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Existing Financial Accounts</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'Checking Account',
                    'Savings Account',
                    'Credit Cards',
                    '401(k)',
                    'IRA',
                    'Brokerage Account',
                    'Certificate of Deposit',
                    'Money Market Account'
                  ].map((account) => (
                    <label key={account} className="relative">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        onChange={() => handleArrayChange('existingAccounts', account.toLowerCase().replace(/[()]/g, '').replace(' ', '-'))}
                      />
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:bg-gray-50 transition-colors">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-900">{account}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Personalized Recommendations</h2>
            
            {recommendations && recommendations.recommendations ? (
              <div className="bg-white rounded-xl card-shadow p-8 text-left">
                <div className="recommendations">
                  <div dangerouslySetInnerHTML={{ __html: recommendations.recommendations }} />
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-8">
                <p className="text-gray-600">Your recommendations will appear here once generated.</p>
              </div>
            )}
          </motion.div>
        );
        
      default:
        return null;
    }
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
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">Step {step} of {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl card-shadow p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStep()}
            
            {/* Navigation Buttons */}
            {step < 5 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                
                <div className="ml-auto">
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary px-8 py-3 text-white rounded-lg flex items-center gap-2"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary px-8 py-3 text-white rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Get Recommendations <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}