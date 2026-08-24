'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Shield,
  Ban,
  BarChart3,
  ShieldCheck,
  Brain,
  Compass,
  LineChart,
  Scale,
  Lock,
  ZapOff,
  Megaphone,
  FileText
} from 'lucide-react'

const TrustSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const trustFactors = [
    {
      icon: Ban,
      title: 'Learn the reasoning, not the signal',
      description: 'We teach you how to analyse a market and build your own trade decisions — not copy entries from screenshots.',
      color: 'neon-gold',
    },
    {
      icon: Scale,
      title: 'Risk before execution',
      description: 'Understand position sizing, leverage, volatility and drawdown before putting a strategy to work.',
      color: 'neon-gold-champagne',
    },
    {
      icon: Lock,
      title: 'Education, not account management',
      description: 'We teach the process. You make your own trading decisions and remain responsible for your capital.',
      color: 'neon-gold-dark',
    },
    {
      icon: ZapOff,
      title: 'Process over promises',
      description: 'Markets are uncertain. We focus on building skills, discipline and a repeatable process — not promising outcomes.',
      color: 'neon-amber',
    },
    {
      icon: Megaphone,
      title: 'Learn by doing',
      description: 'Apply concepts through chart work, structured exercises, backtesting, review and live market practice.',
      color: 'neon-gold',
    },
    {
      icon: FileText,
      title: 'Transparent learning paths',
      description: 'Programs, expectations and pricing are clearly explained before you enrol. No surprise upsells.',
      color: 'neon-gold-champagne',
    },
  ]

  const whatWeOffer = [
    { title: 'Market Structure', icon: BarChart3 },
    { title: 'Risk Management', icon: ShieldCheck },
    { title: 'Psychological drills', icon: Brain },
    { title: 'Strategy Development', icon: Compass },
    { title: 'Performance Review', icon: LineChart },
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-white text-black border-y border-neutral-200">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 mb-5">
            <Shield className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-medium text-neutral-800">Transparency charter</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-5">
            A different way to learn the market
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto tracking-tight">
            Structured education. Practical application. No Shortcuts
          </p>
        </motion.div>

        <div className="mb-12">
          <p className="text-center text-neutral-600 mb-6 uppercase tracking-wide text-xs font-semibold">
            What stays consistent inside every cohort
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {whatWeOffer.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.06 * index }}
                className="flex items-center gap-2 px-5 py-2.5 bg-neutral-50 rounded-full border border-neutral-200 shadow-sm"
              >
                <item.icon className="w-4 h-4 text-[#b89428]" />
                <span className="text-black font-medium text-sm">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {trustFactors.map((factor, index) => (
            <motion.div
              key={factor.title}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06 * index }}
              className="group"
            >
              <div className="h-full bg-neutral-50 rounded-2xl border border-neutral-200 p-7 hover:border-brand-gold transition-all duration-300 shadow-sm">
                <div className="p-3 rounded-xl border border-neutral-200 bg-white w-fit mb-5 group-hover:border-brand-gold transition-colors shadow-sm">
                  <factor.icon className="w-7 h-7 text-[#b89428]" />
                </div>

                <h3 className="text-lg font-bold tracking-tight text-black mb-2">{factor.title}</h3>
                <p className="text-neutral-700 leading-relaxed text-sm">{factor.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-neutral-700 mt-12 font-medium max-w-2xl mx-auto text-base"
        >
          No shortcuts. No hype. Just structured market education built to develop independent traders.
        </motion.p>
      </div>
    </section>
  )
}

export default TrustSection
