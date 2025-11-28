'use client';

import { motion } from 'framer-motion';
import { Gamepad2, LineChart, PiggyBank, Scale, Target, Timer } from 'lucide-react';
import Link from 'next/link';

const tools = [
  {
    title: 'Budget Quest',
    description: 'Toggle real-life scenarios to see how your monthly budget survives unexpected surprises.',
    icon: PiggyBank,
    color: 'from-emerald-500 to-teal-500',
    href: '/playground/budget-quest',
    label: 'Gamified Budgeting',
  },
  {
    title: 'Investment Sprint',
    description: 'Simulate SIP versus lump-sum strategies and race toward your financial goal.',
    icon: LineChart,
    color: 'from-indigo-500 to-blue-500',
    href: '/playground/investment-sprint',
    label: 'Growth Simulator',
  },
  {
    title: 'Credit Score Dash',
    description: 'Make choices on bill payments, utilisation, and queries to maintain a perfect score.',
    icon: Gamepad2,
    color: 'from-purple-500 to-pink-500',
    href: '/playground/credit-score-dash',
    label: 'Decision Game',
  },
  {
    title: 'Risk Balancer',
    description: 'Build a sample portfolio and watch risk indicators respond in real time.',
    icon: Scale,
    color: 'from-yellow-500 to-orange-500',
    href: '/playground/risk-balancer',
    label: 'Portfolio Lab',
  },
  {
    title: 'Goal Planner Arena',
    description: 'Stack short, mid, and long-term goals and see what it takes to keep them on track.',
    icon: Target,
    color: 'from-rose-500 to-red-500',
    href: '/playground/goal-planner',
    label: 'Priority Builder',
  },
  {
    title: 'Speed Saver Challenge',
    description: 'Compete in a timed savings challenge and unlock tips to boost your saving rate.',
    icon: Timer,
    color: 'from-cyan-500 to-sky-500',
    href: '/playground/speed-saver',
    label: 'Time Trial',
  },
];

export function FinancePlayground() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-900 p-10 shadow-2xl border border-slate-800">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

      <motion.div
        className="relative z-10 mb-10 flex flex-col gap-4 text-white sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-3">
          <span className="inline-flex items-center rounded-full bg-slate-800 px-4 py-1 text-xs font-semibold tracking-wide text-slate-300 border border-slate-700">
            Interactive Labs
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl tracking-tight">Financial Simulation Arena</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Test your financial strategies in a risk-free environment. Simulate outcomes for budgeting, investing, and credit management.
          </p>
        </div>
        <Link
          href="/playground"
          className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100 hover:-translate-y-0.5"
        >
          Enter Lab
        </Link>
      </motion.div>

      <div className="relative z-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.title}
            className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-800/50 p-6 backdrop-blur-sm transition hover:border-slate-700 hover:bg-slate-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 border border-slate-700 text-slate-300 group-hover:text-white group-hover:border-slate-600 transition-colors`}
              >
                <tool.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-900/50 px-2 py-1 rounded border border-slate-800">
                {tool.label}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2">{tool.title}</h3>
            <p className="text-sm leading-relaxed text-slate-400 mb-4">{tool.description}</p>

            <Link
              href={tool.href}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 transition group-hover:text-emerald-400"
            >
              Launch Simulation
              <span className="translate-x-0 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
