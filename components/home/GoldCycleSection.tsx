'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TrendingUp, Calendar, DollarSign, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const GoldCycleSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const cycleMonths = [
    { month: 'Jan', value: 45, color: 'bg-neon-gold/30' },
    { month: 'Feb', value: 95, color: 'bg-neon-gold', highlight: true },
    { month: 'Mar', value: 65, color: 'bg-neon-gold-champagne/40' },
    { month: 'Apr', value: 50, color: 'bg-neon-gold/30' },
    { month: 'May', value: 40, color: 'bg-neon-gold-dark/30' },
    { month: 'Jun', value: 35, color: 'bg-neon-gold-dark/20' },
    { month: 'Jul', value: 30, color: 'bg-neon-gold-dark/20' },
    { month: 'Aug', value: 35, color: 'bg-neon-gold-dark/30' },
    { month: 'Sep', value: 40, color: 'bg-neon-gold/30' },
    { month: 'Oct', value: 50, color: 'bg-neon-gold-champagne/40' },
    { month: 'Nov', value: 60, color: 'bg-neon-gold-champagne/50' },
    { month: 'Dec', value: 70, color: 'bg-neon-gold/40' },
  ]

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.1),transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-dark-800 rounded-full border border-neon-gold/30 mb-6"
          >
            <Calendar className="w-4 h-4 text-neon-gold" />
            <span className="text-sm text-neon-gold font-medium">Proven Pattern</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Gold Repeats One Pattern <span className="gradient-text">Every Year</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-4"
          >
            And Most Traders Miss It.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto space-y-2 mb-6"
          >
            <p><span className="text-neon-gold font-semibold">2024</span> — February breakout → New All-Time High</p>
            <p><span className="text-neon-gold font-semibold">2025</span> — February breakout → New All-Time High</p>
            <p className="text-white font-semibold mt-4">Two years. Same month. Same behaviour. Same no-retracement rally.</p>
            <p className="text-neon-gold font-semibold text-xl mt-4">Now we're approaching February 2026.</p>
            <p className="text-gray-300 mt-4">This is why Club Liquidez positions early — not after the move starts. Our breakout model is built for exactly this kind of momentum.</p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Chart Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-dark-800 rounded-2xl border border-gray-700 p-8"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Annual Performance Cycle</h3>
              <p className="text-gray-400">Gold trading performance by month</p>
            </div>

            <div className="space-y-4">
              {cycleMonths.map((item, index) => (
                <motion.div
                  key={item.month}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 text-sm font-medium text-gray-400">{item.month}</div>
                  <div className="flex-1 relative h-8 bg-dark-700 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${item.value}%` } : {}}
                      transition={{ duration: 1, delay: 0.7 + index * 0.05 }}
                      className={`h-full ${item.color} ${item.highlight ? 'ring-2 ring-neon-gold ring-offset-2 ring-offset-dark-700' : ''} rounded-lg flex items-center justify-end pr-2`}
                    >
                      {item.highlight && (
                        <span className="text-xs font-bold text-black">{item.value}%</span>
                      )}
                    </motion.div>
                  </div>
                  {!item.highlight && (
                    <div className="w-16 text-right text-sm text-gray-500">{item.value}%</div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-neon-gold/10 border border-neon-gold/30 rounded-lg">
              <div className="flex items-center space-x-2 text-neon-gold mb-4">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">February Peak: Consistent Breakout Pattern</span>
              </div>
              <Link href="/copy-trading">
                <Button variant="primary" size="md" className="w-full group">
                  Start Copy Trading
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Key Insights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-dark-800 rounded-2xl border border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-neon-gold/20 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-neon-gold" />
                </div>
                <h3 className="text-xl font-bold text-white">Why February?</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                February consistently shows the highest returns due to seasonal market patterns, 
                institutional rebalancing, and historical trend continuation from January momentum.
              </p>
            </div>

            <div className="bg-dark-800 rounded-2xl border border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-neon-gold-champagne/20 rounded-lg">
                  <DollarSign className="w-6 h-6 text-neon-gold-champagne" />
                </div>
                <h3 className="text-xl font-bold text-white">Our Strategy</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We optimize our algorithms and trading strategies specifically for the February cycle, 
                leveraging historical patterns while maintaining strict risk management protocols.
              </p>
            </div>

            <div className="bg-gradient-to-br from-neon-gold/20 to-neon-gold-champagne/20 rounded-2xl border border-neon-gold/30 p-6">
              <h4 className="text-lg font-bold text-white mb-2">Key Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-bold text-neon-gold mb-1">95%</div>
                  <div className="text-sm text-gray-300">Feb Performance</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neon-gold-champagne mb-1">12</div>
                  <div className="text-sm text-gray-300">Years Tracked</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neon-gold-dark mb-1">87%</div>
                  <div className="text-sm text-gray-300">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neon-amber mb-1">2.4x</div>
                  <div className="text-sm text-gray-300">Avg Return</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GoldCycleSection


