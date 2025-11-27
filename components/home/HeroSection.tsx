'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowRight, TrendingUp, BarChart3, Zap, BookOpen } from 'lucide-react'

const HeroSection = () => {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Animated candlestick chart
      const tl = gsap.timeline({ repeat: -1, yoyo: true })
      
      tl.to(chartRef.current, {
        duration: 2,
        scale: 1.05,
        ease: "power2.inOut"
      })
      
      // Add floating animation
      gsap.to(chartRef.current, {
        y: -20,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      })
    }
  }, [])

  const features = [
    {
      icon: TrendingUp,
      title: 'Copy Trading',
      description: 'Real-time trade replication'
    },
    {
      icon: BarChart3,
      title: 'Algo Trading',
      description: 'Trade automation based on predefined rules'
    },
    {
      icon: BookOpen,
      title: 'Master Course',
      description: 'Comprehensive trading from basics to advanced strategies'
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-dark-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-48 h-48 md:w-72 md:h-72 bg-neon-gold rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-20 w-64 h-64 md:w-96 md:h-96 bg-neon-gold-champagne rounded-full blur-3xl opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8 md:pt-0">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-dark-800 rounded-full border border-neon-gold/20"
              >
                <div className="w-2 h-2 bg-neon-gold rounded-full animate-pulse" />
                <span className="text-sm text-neon-gold">Powered by Precision</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
              >
                <span className="gradient-text">CLUB LIQUIDEZ</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl text-gray-300 max-w-lg"
              >
                A premium trading ecosystem offering: Copy Trading, Algo Models, Master-Level Trading Course, and Membership Club.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-base sm:text-lg text-gray-400 max-w-lg"
              >
                Designed for traders who want structure, discipline, and long-term compounding, not hype.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/auth">
                <Button variant="primary" size="lg" className="group">
                  Enter the Ecosystem
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg">
                  Explore Services
                </Button>
              </Link>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="p-2 bg-dark-800 rounded-lg border border-neon-gold/20">
                    <feature.icon className="w-5 h-5 text-neon-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div
              ref={chartRef}
              className="relative w-full h-96 bg-dark-800 rounded-2xl border border-gray-700 overflow-hidden"
            >
              {/* Chart Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-900" />
              
              {/* Animated Candlesticks */}
              <div className="absolute inset-0 p-6">
                <div className="flex items-end justify-between h-full space-x-1">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: Math.random() * 100 + 20 }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                      className={`w-2 rounded-sm ${
                        Math.random() > 0.5 ? 'bg-neon-gold-champagne' : 'bg-neon-gold'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Chart Overlay */}
              <div className="absolute top-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-neon-gold rounded-full" />
                    <span className="text-sm text-white font-medium">XAU/USD</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">$4,320.00</div>
                    <div className="text-sm text-neon-gold-champagne">+2.45%</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/4 w-2 h-2 bg-neon-gold rounded-full"
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-neon-gold-champagne rounded-full"
              />
            </div>

            {/* Partner Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center"
            >
              {/* <p className="text-sm text-gray-400 mb-4">Trusted by leading exchanges</p>
              <div className="flex items-center justify-center space-x-8 opacity-60">
                {['Binance', 'Coinbase', 'Kraken', 'FTX'].map((exchange) => (
                  <div key={exchange} className="text-gray-500 font-medium text-sm">
                    {exchange}
                  </div>
                ))}
              </div> */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 