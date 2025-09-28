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
  Award,
  Globe,
  Zap,
  Lock,
  Users,
  BarChart3,
  Globe2,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-lg opacity-30"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center relative z-10">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Unifiny</span>
                <div className="text-xs text-indigo-600 font-medium">Premium Finance</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a href="#products" className="text-gray-600 hover:text-blue-600 transition-colors font-medium group">
                Products
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-600"></span>
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium group">
                How It Works
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-600"></span>
              </a>
              <a href="#comparison" className="text-gray-600 hover:text-blue-600 transition-colors font-medium group">
                Compare
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-600"></span>
              </a>
              <Link href="/platform" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20 font-semibold">
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-blue-200 shadow-sm">
                <Globe className="w-4 h-4 mr-2" />
                Credit Cards | Loans | Insurance | Mortgages | Mutual Funds | Assets | Accounts
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-3xl md:text-4xl font-medium text-gray-600 mb-6">
                <span className="relative">
                  <span className="relative z-10">Unified Financial Product Platform</span>
                  <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-100 -z-10"></span>
                </span>
              </span>
              One Platform.
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                All Financial Solutions.
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Compare and get personalized recommendations with eligibility check and approval probability. 
              Get top 3 best-fit products with direct bank links.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/platform" className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 flex items-center gap-3 shadow-2xl shadow-blue-500/30">
                Find Best Products 
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-bold text-gray-700">AJ</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-bold text-gray-700">SR</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-bold text-gray-700">PK</div>
                  </div>
                </div>
                <span className="font-medium">Trusted by 10,000+ users</span>
              </div>
            </motion.div>

            {/* Product Categories Grid */}
            <motion.div 
              className="grid grid-cols-4 md:grid-cols-8 gap-5 max-w-5xl mx-auto"
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
                    className="flex flex-col items-center p-5 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer group border border-gray-100 hover:border-blue-200"
                    whileHover={{ scale: 1.05, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <category.icon className={`w-10 h-10 ${category.color} mb-3 relative z-10 group-hover:scale-110 transition-transform`} />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 text-center">{category.label}</span>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[
              { icon: Users, label: "10,000+ Users", desc: "Trusted by customers" },
              { icon: Globe, label: "500+ Partners", desc: "Banks & financial institutions" },
              { icon: Lock, label: "Bank Level Security", desc: "Protected transactions" },
              { icon: Zap, label: "Instant Results", desc: "Get recommendations in seconds" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-gray-900 text-lg">{item.label}</div>
                <div className="text-sm text-gray-600">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section id="products" className="py-24 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-20 h-1 rounded-full mx-auto"></div>
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CreditCard,
                title: "Credit Cards",
                subtitle: "All Types",
                items: ["Cashback Cards", "Travel Rewards", "Premium Benefits", "Student Cards"],
                color: "from-blue-500 to-blue-600",
                gradient: "bg-gradient-to-r from-blue-50 to-indigo-50"
              },
              {
                icon: PiggyBank,
                title: "Loans",
                subtitle: "Personal & Business",
                items: ["Personal Loans", "Home Loans", "Auto Loans", "Education Loans"],
                color: "from-purple-500 to-purple-600",
                gradient: "bg-gradient-to-r from-purple-50 to-pink-50"
              },
              {
                icon: Shield,
                title: "Insurance",
                subtitle: "Complete Coverage",
                items: ["Health Insurance", "Life Insurance", "Auto Insurance", "Home Insurance"],
                color: "from-red-500 to-red-600",
                gradient: "bg-gradient-to-r from-red-50 to-orange-50"
              },
              {
                icon: TrendingUp,
                title: "Mutual Funds",
                subtitle: "Investment Growth",
                items: ["Equity Funds", "Debt Funds", "Hybrid Funds", "Tax Saving"],
                color: "from-green-500 to-green-600",
                gradient: "bg-gradient-to-r from-green-50 to-emerald-50"
              },
              {
                icon: HomeIcon,
                title: "Mortgages",
                subtitle: "Home Financing",
                items: ["Home Purchase", "Refinancing", "Construction", "Plot Purchase"],
                color: "from-orange-500 to-orange-600",
                gradient: "bg-gradient-to-r from-orange-50 to-yellow-50"
              },
              {
                icon: Landmark,
                title: "Assets",
                subtitle: "Fixed Returns",
                items: ["Fixed Deposits", "Recurring Deposits", "Bonds", "PPF/EPF"],
                color: "from-indigo-500 to-indigo-600",
                gradient: "bg-gradient-to-r from-indigo-50 to-purple-50"
              },
              {
                icon: Building2,
                title: "Bank Accounts",
                subtitle: "All Account Types",
                items: ["Savings Account", "Current Account", "Salary Account", "NRI Accounts"],
                color: "from-cyan-500 to-cyan-600",
                gradient: "bg-gradient-to-r from-cyan-50 to-blue-50"
              },
              {
                icon: Wallet,
                title: "Debit Cards",
                subtitle: "Enhanced Banking",
                items: ["Platinum Cards", "International", "Cashback", "Zero Balance"],
                color: "from-teal-500 to-teal-600",
                gradient: "bg-gradient-to-r from-teal-50 to-green-50"
              }
            ].map((product, index) => (
              <Link href="/platform" key={index}>
                <motion.div
                  className={`p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all group cursor-pointer border border-gray-100 hover:border-blue-200 ${product.gradient}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                <div className={`w-16 h-16 bg-gradient-to-r ${product.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <product.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-6 font-medium">{product.subtitle}</p>
                <ul className="space-y-3">
                  {product.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-center">
                      <div className="w-5 h-5 mr-3 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <span className="text-sm font-semibold text-blue-600 group-hover:underline">Explore →</span>
                </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Engine Section */}
      <section id="comparison" className="py-24 bg-gradient-to-br from-gray-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-20 h-1 rounded-full mx-auto"></div>
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
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

          <div className="grid lg:grid-cols-3 gap-10">
            {[
              {
                icon: Calculator,
                title: "Smart Comparison",
                color: "text-blue-600",
                description: "Compare across banks with metrics like Interest Rate, Tenure, Charges, Benefits & Approval Probability",
                features: [
                  "Bank/Product comparison table",
                  "Real-time rates & charges",
                  "Approval probability scoring"
                ],
                gradient: "from-blue-500 to-indigo-600"
              },
              {
                icon: Target,
                title: "Eligibility Engine",
                color: "text-purple-600",
                description: "CIBIL/Experian integration with PAN/Aadhaar verification for accurate eligibility assessment",
                features: [
                  "Credit score analysis",
                  "Income verification",
                  "High approval products"
                ],
                gradient: "from-purple-500 to-pink-600"
              },
              {
                icon: Star,
                title: "Top 3 Results",
                color: "text-orange-600",
                description: "Get best-fit recommendations with approval probability, key benefits and direct apply links",
                features: [
                  "Personalized ranking",
                  "Direct bank/AMC links",
                  "Key benefits summary"
                ],
                gradient: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all group border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-indigo-50 transition-all">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-20 h-1 rounded-full mx-auto"></div>
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
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

          <div className="grid lg:grid-cols-2 gap-16">
            {/* User Input Flow */}
            <motion.div
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-3xl font-bold text-white">Flow 1: User Input Comparison</h3>
              </div>
              <div className="space-y-8">
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
                    className="flex items-start gap-6 p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
                      <p className="text-blue-100 text-lg">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Eligibility Flow */}
            <motion.div
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-3xl font-bold text-white">Flow 2: Eligibility Check</h3>
              </div>
              <div className="space-y-8">
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
                    className="flex items-start gap-6 p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
                      <p className="text-blue-100 text-lg">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sample Calculations Section */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-r from-green-500 to-teal-600 w-20 h-1 rounded-full mx-auto"></div>
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Credit Card Example */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-xl border border-blue-100/50"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Credit Card</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-700 mb-6 bg-white/50 p-4 rounded-xl">
                <p><span className="font-semibold">Input:</span> Age 28, ₹12 LPA, Travel + Shopping</p>
                <p><span className="font-semibold">CIBIL:</span> 760 → Premium cards eligible</p>
              </div>
              <div className="bg-white p-6 rounded-2xl mb-6 shadow-lg">
                <h4 className="font-bold text-lg text-blue-600 mb-3">Best Result: HDFC Regalia</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between">
                    <span>Annual Fee:</span>
                    <span className="font-semibold">₹2,500</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Cashback:</span>
                    <span className="font-semibold">~1.3%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Lounge:</span>
                    <span className="font-semibold">12/year</span>
                  </li>
                </ul>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg">
                Apply Now
              </button>
            </motion.div>

            {/* Personal Loan Example */}
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-3xl shadow-xl border border-purple-100/50"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4">
                  <PiggyBank className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Personal Loan</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-700 mb-6 bg-white/50 p-4 rounded-xl">
                <p><span className="font-semibold">Amount:</span> ₹5,00,000 | <span className="font-semibold">Tenure:</span> 3 years</p>
                <p><span className="font-semibold">Income:</span> ₹60,000/month | <span className="font-semibold">CIBIL:</span> 720</p>
              </div>
              <div className="space-y-3 mb-6 bg-white p-5 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center p-3 rounded-lg">
                  <span>HDFC @11%</span>
                  <span className="text-red-600 font-semibold">₹16,369 EMI</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-300">
                  <span className="font-semibold text-green-800">ICICI @10.5%</span>
                  <span className="text-green-600 font-bold">₹16,233 EMI</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg">
                  <span>SBI @12%</span>
                  <span className="text-red-600 font-semibold">₹16,607 EMI</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-[1.02] shadow-lg">
                Apply Now
              </button>
            </motion.div>

            {/* Mutual Fund Example */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-teal-100 p-8 rounded-3xl shadow-xl border border-green-100/50"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Mutual Fund</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-700 mb-6 bg-white/50 p-4 rounded-xl">
                <p><span className="font-semibold">Goal:</span> ₹10L in 10 years</p>
                <p><span className="font-semibold">SIP:</span> ₹10,000/month | <span className="font-semibold">Risk:</span> Moderate</p>
              </div>
              <div className="bg-white p-6 rounded-2xl mb-6 shadow-lg">
                <h4 className="font-bold text-lg text-green-600 mb-3">Best Result: Axis Bluechip</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">CAGR</div>
                    <div className="font-bold text-blue-700">~12%</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Projected Value</div>
                    <div className="font-bold text-green-700">₹23.2L</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Risk</div>
                    <div className="font-bold text-yellow-700">Moderate</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Rating</div>
                    <div className="font-bold text-purple-700">5★</div>
                  </div>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all transform hover:scale-[1.02] shadow-lg">
                Start SIP
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            className="inline-block mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-24 h-1 rounded-full mx-auto"></div>
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="block text-2xl md:text-3xl font-normal text-blue-300 mb-4">
              One Platform. All Financial Solutions.
            </span>
            Ready to Find Your Best Match?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-12 text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Compare products across banks, check eligibility, and get top 3 recommendations with direct apply links
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/platform" className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-6 rounded-2xl text-2xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-110 inline-flex items-center gap-4 shadow-2xl shadow-blue-500/30">
              Get Started Now 
              <ArrowRight className="w-8 h-8 transition-transform group-hover:translate-x-2" />
            </Link>
            <div className="text-gray-300 text-center">
              <div className="text-5xl font-bold text-white mb-2">98%</div>
              <div className="text-lg">User Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-gray-300 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-lg opacity-30"></div>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center relative z-10">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">Unifiny</span>
                  <div className="text-sm text-indigo-400 font-medium">Premium Finance Platform</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Making financial decisions smarter with AI-powered insights. Compare, analyze, and choose the best financial products for your needs.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 transition-all cursor-pointer">
                  <span className="font-bold text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 transition-all cursor-pointer">
                  <span className="font-bold text-sm">in</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 transition-all cursor-pointer">
                  <span className="font-bold text-sm">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Products</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors group flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  Credit Cards
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors group flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  Debit Cards
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors group flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  Personal Loans
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors group flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  Home Loans
                </a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Services</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors group flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  Insurance
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors group flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  Mutual Funds
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors group flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  Bank Accounts
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors group flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  Fixed Deposits
                </a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors group flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  About
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors group flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  Careers
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors group flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  Contact
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors group flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  Blog
                </a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">&copy; 2024 Unifiny. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
