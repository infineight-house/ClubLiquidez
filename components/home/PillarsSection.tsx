'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Users, Bot, GraduationCap, Crown, ArrowRight, Shield, Sparkles } from 'lucide-react'

const PillarsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const firstThreePillars = [
    {
      icon: GraduationCap,
      title: 'Market Core Curriculum',
      description:
        'From price behaviour to higher-timeframe context — learn how markets move through structure, liquidity, sessions and volatility.',
      features: [
        'Market structure & liquidity',
        'Multi-time frame analysis',
        'Context before execution',
        'Structured chart reviews',
      ],
      href: '/academy',
      color: 'neon-gold',
      gradient: 'from-neon-gold/15 to-neon-gold-champagne/15',
    },
    {
      icon: Shield,
      title: 'Risk Architecture & Execution',
      description:
        'Build a risk framework that adapts to volatility, position size, spread and drawdown across different instruments.',
      features: ['Position sizing',
        'Volatility & spread',
        'Drawdown management',
        'Execution planning'],
      href: '/tools',
      color: 'neon-gold-champagne',
      gradient: 'from-neon-gold-champagne/15 to-neon-amber/15',
    },
    {
      icon: Users,
      title: 'Mentorship & Live Labs',
      description:
        'Small-group learning with live chart walkthroughs, structured drills and feedback on how you think — not what to copy.',
      features: ['Live market sessions', 'Playback & replay reviews', 'Accountability checkpoints'],
      href: '/programs',
      color: 'neon-gold-dark',
      gradient: 'from-neon-gold-dark/15 to-neon-gold/15',
    },
  ]

  const lastTwoPillars = [
    {
      icon: Bot,
      title: 'Automation & Algo Development',
      description:
        'Learn how to translate your own trading rules into indicators, Expert Advisors and automated systems — without relying on pre-built black boxes.',
      features: ['Strategy → rules → automation', 'Indicator & EA development', 'Backtesting & validation', 'Automation risk & safeguards'],
      href: '/algo-trading',
      color: 'neon-amber',
      gradient: 'from-neon-amber/15 to-neon-gold/15',
    },
    {
      icon: Crown,
      title: 'Performance & Trader Development',
      description:
        'Build consistency through journaling, trade review, performance analysis and structured feedback — turning individual trades into measurable improvement.',
      features: ['Trading journal & performance metrics', 'Backtesting & replay', 'Error identification', 'Structured review & refinement'],
      href: '/programs',
      color: 'neon-gold',
      gradient: 'from-neon-gold/15 to-neon-gold-champagne/15',
    },
  ]

  const renderPillar = (pillar: (typeof firstThreePillars)[0], index: number) => (
    <motion.div
      key={pillar.title}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.08 * index }}
      className="group relative"
    >
      <div
        className="h-full bg-neutral-50 rounded-2xl border border-neutral-200 p-8 hover:border-brand-gold transition-all duration-300 flex flex-col justify-between shadow-sm"
      >
        <div>
          <div className="flex items-start gap-4 mb-6">
            <div className="p-4 rounded-xl border border-neutral-200 bg-white group-hover:border-brand-gold transition-colors shadow-sm">
              <pillar.icon className="w-8 h-8 text-[#b89428]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold tracking-tight text-black mb-2">{pillar.title}</h3>
              <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">{pillar.description}</p>
            </div>
          </div>

          <ul className="space-y-2.5 mb-8">
            {pillar.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-neutral-600 text-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#b89428] shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link href={pillar.href}>
          <Button variant="secondary" size="md" className="w-full group justify-center text-[#b89428]">
            Explore {pillar.title.split(' ')[0]}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  )

  return (
    <section className="py-24 relative overflow-hidden bg-white text-black border-y border-neutral-200">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-14 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 mb-5">
            <Shield className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-medium text-neutral-800">What you get inside ClubLiquidez</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-4">
            Built for <span className="text-[#b89428]">Traders who want a process</span>
          </h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            Five pillars. One mandate: teach durable process for trading education—not adrenaline-driven clicks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12">
          {firstThreePillars.map((pillar, index) => renderPillar(pillar, index))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {lastTwoPillars.map((pillar, index) => renderPillar(pillar, index + 3))}
        </div>
      </div>
    </section>
  )
}

export default PillarsSection
