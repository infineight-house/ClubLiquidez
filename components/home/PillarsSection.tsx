'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { 
  Users, 
  Bot, 
  GraduationCap, 
  Crown,
  ArrowRight,
  TrendingUp,
  Zap,
  BookOpen,
  Shield,
  DollarSign,
  Target
} from 'lucide-react'

const PillarsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const firstThreePillars = [
    {
      icon: Users,
      title: 'Copy Trading',
      description: 'A low-risk breakout strategy with auto-scaled equity. Your account mirrors the discipline of one master model.',
      features: ['Real-time trade replication', 'Controlled, consistent risk', 'Automated position sizing', 'Long-term compounding approach'],
      href: '/copy-trading',
      color: 'neon-gold',
      gradient: 'from-neon-gold/20 to-neon-gold-champagne/20'
    },
    {
      icon: Bot,
      title: 'Algo Models',
      description: 'Automated systems built with rule-based logic. No emotion. No impulsive trades. Just precision.',
      features: ['Rule-based automation', 'No emotional trading', 'Precise execution', 'Consistent performance'],
      href: '/algo-trading',
      color: 'neon-gold-champagne',
      gradient: 'from-neon-gold-champagne/20 to-neon-amber/20'
    },
    {
      icon: GraduationCap,
      title: 'Master-Level Course',
      description: 'A full training program teaching Technical Analysis, Risk Management, Psychology & Execution.',
      features: ['Fundamentals & Technical Analysis', 'Risk Management', 'Trading Psychology', 'Execution Mastery' , 'Live Trading Sessions'],
      href: '/academy',
      color: 'neon-gold-dark',
      gradient: 'from-neon-gold-dark/20 to-neon-gold/20'
    }
  ]

  const lastTwoPillars = [
    {
      icon: Crown,
      title: 'Membership Club',
      description: 'Subscription: access to portal, community, blogs, tools, algos, copy trading & Live Trading Sessions included.',
      features: ['Private portal access', 'Community support', 'Blogs & insights', 'Study Materials', 'All tools included'],
      href: '/contact',
      color: 'neon-amber',
      gradient: 'from-neon-amber/20 to-neon-gold/20'
    },
    {
      icon: Target,
      title: 'Funded Account Coaching',
      description: 'Clear evaluations. Earn real payouts. Build capital without risking your own.',
      features: ['Challenge rules mastery', 'Risk structuring', 'Lot sizing for evaluations', 'Streak recovery strategies', 'Drawdown control', 'Psychology under pressure'],
      href: '/academy',
      color: 'neon-gold',
      gradient: 'from-neon-gold/20 to-neon-gold-champagne/20'
    }
  ]

  const renderPillar = (pillar: typeof firstThreePillars[0], index: number) => (
    <motion.div
      key={pillar.title}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
      className="group relative"
    >
      <div className={`h-full bg-gradient-to-br ${pillar.gradient} bg-dark-800 rounded-2xl border border-gray-700 p-8 hover:border-neon-gold/50 transition-all duration-300 hover:shadow-2xl hover:shadow-neon-gold/20`}>
        <div className="flex items-start space-x-4 mb-6">
          <div className={`p-4 rounded-xl border group-hover:scale-110 transition-transform ${
            pillar.color === 'neon-gold' ? 'bg-neon-gold/20 border-neon-gold/30' :
            pillar.color === 'neon-gold-champagne' ? 'bg-neon-gold-champagne/20 border-neon-gold-champagne/30' :
            pillar.color === 'neon-gold-dark' ? 'bg-neon-gold-dark/20 border-neon-gold-dark/30' :
            pillar.color === 'neon-amber' ? 'bg-neon-amber/20 border-neon-amber/30' :
            'bg-neon-gold/20 border-neon-gold/30'
          }`}>
            <pillar.icon className={`w-8 h-8 ${
              pillar.color === 'neon-gold' ? 'text-neon-gold' :
              pillar.color === 'neon-gold-champagne' ? 'text-neon-gold-champagne' :
              pillar.color === 'neon-gold-dark' ? 'text-neon-gold-dark' :
              pillar.color === 'neon-amber' ? 'text-neon-amber' :
              'text-neon-gold'
            }`} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2">{pillar.title}</h3>
            <p className="text-gray-300 leading-relaxed">{pillar.description}</p>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {pillar.features.map((feature, idx) => (
            <li key={idx} className="flex items-center space-x-2 text-gray-400">
              <div className={`w-1.5 h-1.5 rounded-full ${
                pillar.color === 'neon-gold' ? 'bg-neon-gold' :
                pillar.color === 'neon-gold-champagne' ? 'bg-neon-gold-champagne' :
                pillar.color === 'neon-gold-dark' ? 'bg-neon-gold-dark' :
                pillar.color === 'neon-amber' ? 'bg-neon-amber' :
                'bg-neon-gold'
              }`} />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Link href={pillar.href}>
          <Button
            variant="secondary"
            size="md"
            className={`w-full group ${
              pillar.color === 'neon-gold' ? 'border-neon-gold text-neon-gold hover:bg-neon-gold hover:text-black' :
              pillar.color === 'neon-gold-champagne' ? 'border-neon-gold-champagne text-neon-gold-champagne hover:bg-neon-gold-champagne hover:text-black' :
              pillar.color === 'neon-gold-dark' ? 'border-neon-gold-dark text-neon-gold-dark hover:bg-neon-gold-dark hover:text-black' :
              pillar.color === 'neon-amber' ? 'border-neon-amber text-neon-amber hover:bg-neon-amber hover:text-black' :
              'border-neon-gold text-neon-gold hover:bg-neon-gold hover:text-black'
            }`}
          >
            Learn More → {pillar.title}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  )

  return (
    <section className="py-24 bg-gradient-to-b from-black via-dark-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-neon-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-gold-champagne rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-dark-800 rounded-full border border-neon-gold/30 mb-6"
          >
            <Shield className="w-4 h-4 text-neon-gold" />
            <span className="text-sm text-neon-gold font-medium">Our Core Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            What <span className="gradient-text">We Do</span>
          </motion.h2>
        </motion.div>

        {/* First 3 pillars in 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12">
          {firstThreePillars.map((pillar, index) => renderPillar(pillar, index))}
        </div>

        {/* Last 2 pillars in 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {lastTwoPillars.map((pillar, index) => renderPillar(pillar, index + 3))}
        </div>
      </div>
    </section>
  )
}

export default PillarsSection

