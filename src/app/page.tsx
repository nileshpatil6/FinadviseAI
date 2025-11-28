'use client';

import { motion, useScroll, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Wallet,
  Calculator,
  Target,
  Globe,
  Lock,
  ChevronRight,
  ChevronDown,
  Search,
  Users,
  Home as HomeIcon,
  Heart,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// --- Components ---

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto px-4">
    {subtitle && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4"
      >
        {subtitle}
      </motion.div>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight"
    >
      {children}
    </motion.h2>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="h-1 w-24 bg-emerald-500 mx-auto mt-6 rounded-full"
    />
  </div>
);



const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg font-semibold text-slate-900">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-slate-600 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const router = useRouter();

  const handleProductClick = (path: string) => {
    router.push(path);
    setIsProductsOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="BankBuz Logo"
                width={150}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Features</a>

              <div
                className="relative"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <button
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1"
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                >
                  Products <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white rounded-2xl shadow-xl border border-slate-100 p-6 grid grid-cols-2 gap-6 z-50"
                    >
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Lending & Cards</h4>
                        <div onClick={() => handleProductClick("/platform?product=credit-cards")} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">Credit Cards</div>
                            <div className="text-xs text-slate-500">Compare rewards & fees</div>
                          </div>
                        </div>
                        <div onClick={() => handleProductClick("/platform?product=personal-loans")} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                            <Wallet className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">Personal Loans</div>
                            <div className="text-xs text-slate-500">Instant approval loans</div>
                          </div>
                        </div>
                        <div onClick={() => handleProductClick("/platform?product=home-loans")} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                          <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                            <HomeIcon className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">Home Loans</div>
                            <div className="text-xs text-slate-500">Best mortgage rates</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Investments & Insurance</h4>
                        <div onClick={() => handleProductClick("/platform?product=mutual-funds")} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                            <TrendingUp className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">Mutual Funds</div>
                            <div className="text-xs text-slate-500">Direct plans, 0% commission</div>
                          </div>
                        </div>
                        <div onClick={() => handleProductClick("/platform?product=health-insurance")} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                            <Shield className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">Health Insurance</div>
                            <div className="text-xs text-slate-500">Comprehensive coverage</div>
                          </div>
                        </div>
                        <div onClick={() => handleProductClick("/platform?product=emi-calculator")} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                          <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                            <Calculator className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">Calculators</div>
                            <div className="text-xs text-slate-500">EMI, SIP, & more</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">How it Works</a>
              <Link href="/platform" className="group bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
                Launch Platform <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-32 lg:pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50/50 via-white to-white z-0"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="max-w-2xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-medium mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Unified Financial Product Platform
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl lg:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.1]"
              >
                One Platform. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-emerald-800 to-slate-900">
                  All Financial Solutions.
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-slate-600 mb-10 leading-relaxed"
              >
                Compare and get personalized recommendations with eligibility check and approval probability. Get top 3 best-fit products with direct bank links.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/platform" className="bg-slate-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                  Start Free Analysis
                </Link>
                <a href="#how-it-works" className="px-8 py-4 rounded-xl text-lg font-medium text-slate-700 hover:bg-slate-50 transition-all border border-slate-200 flex items-center justify-center gap-2">
                  See How It Works
                </a>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-12 pt-8 border-t border-slate-100"
              >
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Instant Access to Premium Products</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { name: 'Credit Cards', icon: CreditCard, path: '/platform?product=credit-cards', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', shadow: 'shadow-blue-100' },
                    { name: 'Personal Loans', icon: Wallet, path: '/platform?product=personal-loans', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', shadow: 'shadow-purple-100' },
                    { name: 'Home Loans', icon: HomeIcon, path: '/platform?product=home-loans', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', shadow: 'shadow-indigo-100' },
                    { name: 'Mutual Funds', icon: TrendingUp, path: '/platform?product=mutual-funds', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', shadow: 'shadow-orange-100' },
                    { name: 'Health Ins.', icon: Shield, path: '/platform?product=health-insurance', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', shadow: 'shadow-emerald-100' },
                    { name: 'Life Ins.', icon: Heart, path: '/platform?product=life-insurance', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', shadow: 'shadow-rose-100' },
                    { name: 'Stocks', icon: BarChart3, path: '/platform?product=stocks', color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100', shadow: 'shadow-cyan-100' },
                    { name: 'Calculators', icon: Calculator, path: '/platform?product=emi-calculator', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', shadow: 'shadow-amber-100' },
                  ].map((product) => (
                    <motion.div
                      key={product.name}
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(product.path)}
                      className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-2xl border ${product.border} bg-white shadow-sm hover:shadow-xl hover:${product.shadow} transition-all duration-300 h-full group`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${product.bg}`}>
                        <product.icon className={`w-6 h-6 ${product.color}`} />
                      </div>
                      <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 text-center leading-tight">
                        {product.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900">
              <Image
                src="/images/hero-dashboard.png"
                alt="BankBuz Dashboard"
                width={800}
                height={600}
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none"></div>
            </div>

            {/* Floating Glass Cards */}
            <motion.div
              className="absolute -left-12 top-20 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 hidden lg:block max-w-xs"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Eligibility Confirmed</div>
                  <div className="text-sm font-bold text-slate-900">HDFC Regalia Gold</div>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[92%]"></div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-8 bottom-20 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 hidden lg:block"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xs text-slate-400 uppercase font-bold">Savings</div>
                  <div className="text-xl font-bold text-emerald-600">+₹12.5k</div>
                </div>
                <div className="h-8 w-px bg-slate-200"></div>
                <div className="text-center">
                  <div className="text-xs text-slate-400 uppercase font-bold">Score</div>
                  <div className="text-xl font-bold text-blue-600">785</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Analyzing products from top institutions</p>
        </div>
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {/* Repeated logos for seamless loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {['HDFC Bank', 'ICICI Bank', 'SBI Card', 'Axis Bank', 'Kotak Mahindra', 'American Express', 'IDFC First', 'Standard Chartered'].map((bank) => (
                <span key={bank} className="text-2xl font-bold text-slate-400 hover:text-slate-900 cursor-default">{bank}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Solution Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SectionHeading subtitle="The Problem">
                Finance is Complex. <br />
                <span className="text-slate-400">We Made It Simple.</span>
              </SectionHeading>
              <div className="space-y-8">
                <motion.div variants={itemVariants} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <Search className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Information Overload</h3>
                    <p className="text-slate-600">Hundreds of cards, thousands of schemes. Finding the right one manually is impossible.</p>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Hidden Charges</h3>
                    <p className="text-slate-600">Banks hide fees in fine print. We expose every single charge upfront.</p>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Generic Advice</h3>
                    <p className="text-slate-600">&quot;Best Card&quot; lists don&apos;t know your spending. We analyze YOUR data for custom matches.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">The Finadvise Advantage</h3>
                <ul className="space-y-6">
                  <li className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg">100% Unbiased Recommendations</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg">Real-time Eligibility Check</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg">Direct Bank Application Links</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg">Bank-Grade Data Security</span>
                  </li>
                </ul>
                <div className="mt-10 pt-10 border-t border-slate-700">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">0%</div>
                  <div className="text-slate-400">Commission from you. We are free forever.</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid (Bento) */}
      <section id="features" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Our Ecosystem">
            Everything You Need. <br />
            One Platform.
          </SectionHeading>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Large Card */}
            <motion.div
              className="md:col-span-2 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative z-10 max-w-lg">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  <CreditCard className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Smart Credit Card Engine</h3>
                <p className="text-lg text-slate-600 mb-8">
                  Don&apos;t just get a card. Get a card that pays you back. Our engine calculates potential rewards based on your actual spending patterns (dining, travel, fuel) to maximize your annual returns.
                </p>
                <Link href="/platform?product=credit-cards" className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Find Your Card <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>

            {/* Tall Card */}
            <motion.div
              className="md:row-span-2 bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Insurance Shield</h3>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Health, Life, and Auto insurance decoded. We strip away the jargon and highlight the exclusions, waiting periods, and claim settlement ratios that actually matter.
                  </p>
                </div>
                <div className="mt-8">
                  <div className="bg-slate-800/50 rounded-xl p-4 mb-4 border border-slate-700">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Coverage</span>
                      <span className="text-white font-bold">₹1 Cr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Premium</span>
                      <span className="text-emerald-400 font-bold">₹850/mo</span>
                    </div>
                  </div>
                  <Link href="/platform?product=health-insurance" className="text-emerald-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    Compare Plans <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Medium Card */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                <Wallet className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Personal Loans</h3>
              <p className="text-slate-600 mb-6">
                Instant approval loans with the lowest interest rates. Compare processing fees and foreclosure charges instantly.
              </p>
              <Link href="/platform?product=personal-loans" className="text-purple-600 font-semibold flex items-center gap-2">
                Check Rates <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Medium Card */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Mutual Funds</h3>
              <p className="text-slate-600 mb-6">
                Direct plans with 0% commission. curated portfolios based on your risk appetite and time horizon.
              </p>
              <Link href="/platform?product=mutual-funds" className="text-orange-600 font-semibold flex items-center gap-2">
                Start Investing <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works (Visual) */}
      <section id="how-it-works" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-blue-100 rounded-full blur-3xl opacity-50 transform -translate-x-1/2"></div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <Image
                  src="/images/mobile-app.png"
                  alt="BankBuz Mobile App"
                  width={600}
                  height={800}
                  className="w-full h-auto drop-shadow-2xl rounded-3xl"
                />
              </motion.div>
            </div>

            <div className="order-1 lg:order-2">
              <SectionHeading subtitle="Workflow">
                From Confusion to <br />
                Approval in 3 Steps.
              </SectionHeading>

              <div className="space-y-12 relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100"></div>

                {[
                  {
                    step: "01",
                    title: "Share Your Profile",
                    desc: "Tell us about your income, spending habits, and financial goals. No sensitive documents needed initially."
                  },
                  {
                    step: "02",
                    title: "AI Analysis",
                    desc: "Our engine scans 500+ products, calculating your eligibility probability and potential savings for each."
                  },
                  {
                    step: "03",
                    title: "Instant Application",
                    desc: "Select the best match and apply directly on the bank's official secure portal. No middlemen."
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="relative pl-24"
                  >
                    <div className="absolute left-0 top-0 w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm z-10 text-xl font-bold text-slate-300">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-sm font-medium mb-8">
              <Lock className="w-4 h-4" /> Bank-Grade Security
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Your Privacy is Our Priority.</h2>
            <p className="text-xl text-slate-400">
              We do not store your personal financial data. Your information is processed in real-time and never saved on our servers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm">
              <Lock className="w-10 h-10 text-emerald-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">No Data Storage</h3>
              <p className="text-slate-400">We operate on a zero-retention policy. Your data is processed in real-time and discarded immediately.</p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm">
              <Shield className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">No Spam Policy</h3>
              <p className="text-slate-400">We hate spam calls too. We never share your number with telemarketers.</p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm">
              <Globe className="w-10 h-10 text-purple-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">Official Partners</h3>
              <p className="text-slate-400">We redirect you to official bank websites for the final application. No phishing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="FAQ">
            Frequently Asked <br /> Questions
          </SectionHeading>

          <div className="space-y-2">
            <FaqItem
              question="Is BankBuz really free?"
              answer="Yes, 100%. We earn a small referral fee from banks only when your application is approved. This cost is never passed on to you."
            />
            <FaqItem
              question="Will checking my eligibility affect my credit score?"
              answer="No. We perform a 'soft inquiry' which does not impact your CIBIL score. Only when you submit the final application to the bank is a hard inquiry made."
            />
            <FaqItem
              question="How accurate are the approval chances?"
              answer="Our AI model is trained on thousands of successful applications. While no one can guarantee approval (that's up to the bank), our high-probability matches have a 90%+ success rate."
            />
            <FaqItem
              question="Do you offer business loans?"
              answer="Yes, we have a dedicated section for business finance including commercial credit cards, MSME loans, and working capital solutions."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
            Stop Overpaying. <br /> Start Optimizing.
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Join the platform that is simplifying finance for the modern Indian user. No fees, no spam, just results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/platform" className="bg-slate-900 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              Get Started Now <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Image
                  src="/images/logo.png"
                  alt="BankBuz Logo"
                  width={150}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <p className="text-slate-500 mb-6 max-w-sm leading-relaxed">
                The next generation of financial aggregation. We use AI to match you with the perfect financial products, saving you time and money.
              </p>
              <div className="flex gap-4">
                {/* Social Placeholders */}
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors">
                  <Globe className="w-5 h-5 text-slate-600" />
                </div>
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors">
                  <Users className="w-5 h-5 text-slate-600" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Products</h4>
              <ul className="space-y-4 text-slate-600">
                <li><Link href="/platform?product=credit-cards" className="hover:text-blue-600 transition-colors">Credit Cards</Link></li>
                <li><Link href="/platform?product=personal-loans" className="hover:text-blue-600 transition-colors">Personal Loans</Link></li>
                <li><Link href="/platform?product=home-loans" className="hover:text-blue-600 transition-colors">Home Loans</Link></li>
                <li><Link href="/platform?product=mutual-funds" className="hover:text-blue-600 transition-colors">Mutual Funds</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Company</h4>
              <ul className="space-y-4 text-slate-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
              <ul className="space-y-4 text-slate-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-500 text-sm">
              © 2025 BankBuz. All rights reserved.
            </div>
            <div className="text-slate-400 text-sm">
              Made with ❤️ for India 🇮🇳
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
