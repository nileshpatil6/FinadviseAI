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
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-900 p-10 shadow-2xl">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/40 blur-3xl" />
      <div className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-purple-500/30 blur-3xl" />

      <motion.div
        className="relative z-10 mb-10 flex flex-col gap-4 text-white sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-3">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide text-blue-100 ring-1 ring-white/20">
            Interactive Learning Hub
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl">Play, experiment, and master your money</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-blue-100 sm:text-base">
            FinadAI Playground keeps personal finance engaging. Pick a challenge, tweak variables, and see how your
            decisions shape outcomes without risking real money.
          </p>
        </div>
        <Link
          href="/playground"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:scale-105 hover:bg-slate-100"
        >
          Explore Playground
        </Link>
      </motion.div>

      <div className="relative z-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg transition hover:border-white/20 hover:shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <div
              className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${tool.color} opacity-30 blur-3xl transition-all group-hover:opacity-60`}
            />

            <div className="relative z-10 flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-lg`}
              >
                <tool.icon className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-blue-100">{tool.label}</span>
                <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
              </div>
            </div>

            <p className="relative z-10 mt-4 text-sm leading-relaxed text-blue-100">{tool.description}</p>

            <Link
              href={tool.href}
              className="relative z-10 mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-200 transition group-hover:text-white"
            >
              Launch Experience
              <span className="translate-x-0 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
