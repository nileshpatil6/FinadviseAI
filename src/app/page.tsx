'use client';

import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  Star,
  PiggyBank,
  Home as HomeIcon,
  Landmark,
  Building2,
  Wallet,
  Calculator,
  Target,
  Award
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">FinadAI</span>
            </motion.div>
            
            <motion.div 
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a href="#products" className="text-gray-600 hover:text-blue-600 transition-colors">Products</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#comparison" className="text-gray-600 hover:text-blue-600 transition-colors">Compare</a>
              <Link href="/platform" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Credit Cards | Loans | Insurance | Mortgages | Mutual Funds | Assets | Accounts
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-3xl md:text-4xl font-medium text-gray-600 mb-4">
                Unified Financial Product Platform
              </span>
              One Platform.
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                All Financial Solutions.
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Compare and get personalized recommendations with eligibility check and approval probability. 
              Get top 3 best-fit products with direct bank links.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/platform" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center gap-2">
                Find Best Products <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Product Categories Grid */}
            <motion.div 
              className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { icon: CreditCard, label: "Credit Cards", color: "text-blue-600", product: "credit-cards" },
                { icon: Wallet, label: "Debit Cards", color: "text-green-600", product: "debit-cards" },
                { icon: PiggyBank, label: "Loans", color: "text-purple-600", product: "personal-loans" },
                { icon: Shield, label: "Insurance", color: "text-red-600", product: "health-insurance" },
                { icon: HomeIcon, label: "Mortgages", color: "text-orange-600", product: "home-loans" },
                { icon: TrendingUp, label: "Mutual Funds", color: "text-emerald-600", product: "mutual-funds" },
                { icon: Landmark, label: "Assets", color: "text-indigo-600", product: "fixed-deposits" },
                { icon: Building2, label: "Accounts", color: "text-cyan-600", product: "bank-accounts" },
              ].map((category, index) => (
                <Link href={`/platform?product=${category.product}`} key={index}>
                  <motion.div
                    className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <category.icon className={`w-8 h-8 ${category.color} mb-2 group-hover:scale-110 transition-transform`} />
                    <span className="text-xs font-medium text-gray-700 text-center">{category.label}</span>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Complete Financial Product Suite
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Dual Flow: User Input → Comparison & Eligibility Check → Top 3 Personalized Products with Direct Bank Links
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CreditCard,
                title: "Credit Cards",
                subtitle: "All Types",
                items: ["Cashback Cards", "Travel Rewards", "Premium Benefits", "Student Cards"],
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: PiggyBank,
                title: "Loans",
                subtitle: "Personal & Business",
                items: ["Personal Loans", "Home Loans", "Auto Loans", "Education Loans"],
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Shield,
                title: "Insurance",
                subtitle: "Complete Coverage",
                items: ["Health Insurance", "Life Insurance", "Auto Insurance", "Home Insurance"],
                color: "from-red-500 to-red-600"
              },
              {
                icon: TrendingUp,
                title: "Mutual Funds",
                subtitle: "Investment Growth",
                items: ["Equity Funds", "Debt Funds", "Hybrid Funds", "Tax Saving"],
                color: "from-green-500 to-green-600"
              },
              {
                icon: HomeIcon,
                title: "Mortgages",
                subtitle: "Home Financing",
                items: ["Home Purchase", "Refinancing", "Construction", "Plot Purchase"],
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: Landmark,
                title: "Assets",
                subtitle: "Fixed Returns",
                items: ["Fixed Deposits", "Recurring Deposits", "Bonds", "PPF/EPF"],
                color: "from-indigo-500 to-indigo-600"
              },
              {
                icon: Building2,
                title: "Bank Accounts",
                subtitle: "All Account Types",
                items: ["Savings Account", "Current Account", "Salary Account", "NRI Accounts"],
                color: "from-cyan-500 to-cyan-600"
              },
              {
                icon: Wallet,
                title: "Debit Cards",
                subtitle: "Enhanced Banking",
                items: ["Platinum Cards", "International", "Cashback", "Zero Balance"],
                color: "from-teal-500 to-teal-600"
              }
            ].map((product, index) => (
              <Link href="/platform" key={index}>
                <motion.div
                  className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-lg transition-all group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                <div className={`w-12 h-12 bg-gradient-to-r ${product.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <product.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{product.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{product.subtitle}</p>
                <ul className="space-y-1">
                  {product.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Engine Section */}
      <section id="comparison" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Advanced Comparison Engine
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Side-by-side comparison with filters: Best Value | Best Overall | Best Match for You
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Calculator className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Comparison</h3>
              <p className="text-gray-600 mb-4">
                Compare across banks with metrics like Interest Rate, Tenure, Charges, Benefits & Approval Probability
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 text-green-500 mr-2" />
                  Bank/Product comparison table
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 text-green-500 mr-2" />
                  Real-time rates & charges
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 text-green-500 mr-2" />
                  Approval probability scoring
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Target className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Eligibility Engine</h3>
              <p className="text-gray-600 mb-4">
                CIBIL/Experian integration with PAN/Aadhaar verification for accurate eligibility assessment
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 text-green-500 mr-2" />
                  Credit score analysis
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 text-green-500 mr-2" />
                  Income verification
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 text-green-500 mr-2" />
                  High approval products
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Star className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Top 3 Results</h3>
              <p className="text-gray-600 mb-4">
                Get best-fit recommendations with approval probability, key benefits and direct apply links
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 text-green-500 mr-2" />
                  Personalized ranking
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 text-green-500 mr-2" />
                  Direct bank/AMC links
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 text-green-500 mr-2" />
                  Key benefits summary
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Dual User Flow System
            </motion.h2>
            <motion.p 
              className="text-xl text-blue-100 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Two ways to find your perfect financial product: Compare by input criteria or check eligibility with verification
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* User Input Flow */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Flow 1: User Input Comparison</h3>
              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Select Product Category",
                    description: "Choose from Credit Cards, Loans, Insurance, Mutual Funds, etc."
                  },
                  {
                    step: "2", 
                    title: "Enter Your Requirements",
                    description: "Age, Income, Spending Pattern, Risk Appetite, Loan Amount, etc."
                  },
                  {
                    step: "3",
                    title: "Compare Across Banks",
                    description: "System compares all available options with rates and features"
                  },
                  {
                    step: "4",
                    title: "Top 3 Best Results",
                    description: "Get personalized recommendations with apply links"
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{step.title}</h4>
                      <p className="text-blue-100 text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Eligibility Flow */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Flow 2: Eligibility Check</h3>
              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Secure Login",
                    description: "Login with PAN/Aadhaar/OTP for secure verification"
                  },
                  {
                    step: "2",
                    title: "Credit Bureau Check",
                    description: "System fetches CIBIL score, income, and liabilities data"
                  },
                  {
                    step: "3",
                    title: "Eligibility Engine",
                    description: "AI shortlists products you qualify for with high approval chance"
                  },
                  {
                    step: "4",
                    title: "Pre-Approved Products",
                    description: "Get products with high approval probability and instant apply"
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{step.title}</h4>
                      <p className="text-blue-100 text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sample Calculations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              See Real Results
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Sample calculations showing how our platform finds you the best deals across different financial products
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Credit Card Example */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-4">
                <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Credit Card</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p><strong>Input:</strong> Age 28, ₹12 LPA, Travel + Shopping</p>
                <p><strong>CIBIL:</strong> 760 → Premium cards eligible</p>
              </div>
              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-600 mb-2">Best Result: HDFC Regalia</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Annual Fee: ₹2,500</li>
                  <li>• Cashback: ~1.3%</li>
                  <li>• Lounge: 12/year</li>
                </ul>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </motion.div>

            {/* Personal Loan Example */}
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <PiggyBank className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Personal Loan</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p><strong>Amount:</strong> ₹5,00,000 | <strong>Tenure:</strong> 3 years</p>
                <p><strong>Income:</strong> ₹60,000/month | <strong>CIBIL:</strong> 720</p>
              </div>
              <div className="space-y-2 mb-4 text-sm">
                <div className="bg-white p-2 rounded flex justify-between">
                  <span>HDFC @11%</span>
                  <span className="text-red-600">₹16,369 EMI</span>
                </div>
                <div className="bg-green-100 p-2 rounded flex justify-between border-2 border-green-300">
                  <span className="font-semibold">ICICI @10.5%</span>
                  <span className="text-green-600 font-bold">₹16,233 EMI</span>
                </div>
                <div className="bg-white p-2 rounded flex justify-between">
                  <span>SBI @12%</span>
                  <span className="text-red-600">₹16,607 EMI</span>
                </div>
              </div>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Apply Now
              </button>
            </motion.div>

            {/* Mutual Fund Example */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Mutual Fund</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p><strong>Goal:</strong> ₹10L in 10 years</p>
                <p><strong>SIP:</strong> ₹10,000/month | <strong>Risk:</strong> Moderate</p>
              </div>
              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-green-600 mb-2">Best Result: Axis Bluechip</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• CAGR: ~12%</li>
                  <li>• Projected Value: ₹23.2L</li>
                  <li>• Risk: Moderate</li>
                </ul>
              </div>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                Start SIP
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="block text-2xl md:text-3xl font-normal text-blue-300 mb-2">
              One Platform. All Financial Solutions.
            </span>
            Ready to Find Your Best Match?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Compare products across banks, check eligibility, and get top 3 recommendations with direct apply links
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/platform" className="bg-blue-600 text-white px-10 py-4 rounded-xl text-xl font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center gap-3">
              Get Started Now <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-2xl font-bold text-white">FinadAI</span>
              </div>
              <p className="text-gray-400">Making financial decisions smarter with AI-powered insights.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Credit Cards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Debit Cards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Personal Loans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Home Loans</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Insurance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mutual Funds</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bank Accounts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fixed Deposits</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FinadAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
