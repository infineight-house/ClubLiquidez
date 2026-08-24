'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowRight, Clock, Shield, Sparkles } from 'lucide-react'
import RealtimeBinanceChart from './RealtimeBinanceChart'

const HeroSection = () => {

  const features = [
    {
      icon: Clock,
      title: 'Technicals',
      description: 'Using price action to map liquidity windows',
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'position sizing for the market',
    },
    {
      icon: Sparkles,
      title: 'Market Psychology',
      description: 'Maintain discipline and emotional control',
    },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 md:pt-20 md:pb-0 bg-white text-black">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative h-16 sm:h-20 md:h-24 w-auto"
            >
              <Image
                src="/liquidez.png"
                alt="ClubLiquidez Logo"
                width={440}
                height={68}
                className="object-contain h-full w-auto"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-neutral-100"
            >
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-sm text-neutral-800 font-medium tracking-wide">
                Market · Educational programs only
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-[4.25rem] xl:text-7xl font-bold tracking-tight leading-[1.08] text-black"
            >
              Build The <span className="text-[#b89428]">Skill</span>{' '}
              to read the market.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="text-lg sm:text-xl text-neutral-600 max-w-xl leading-relaxed tracking-tight"
            >

              Learn how to read market <em className="text-black not-italic font-semibold">structure</em>, liquidity, sessions, volatility and risk,  and turn that framework into a repeatable trading process.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34 }}
              className="text-base text-neutral-600 max-w-xl leading-relaxed border-l-2 border-brand-gold pl-4"
            >
              Small cohorts • Live market drills • Mentorship • Optional classroom sessions in Kanchipuram.
              No signals. No managed accounts. No promises of returns.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact">
                <Button variant="primary" size="lg" className="group">
                  Book a Mentor Call
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/academy">
                <Button
                  variant="outline"
                  size="lg"
                >
                  Explore the Curriculum
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4"
            >
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <div className="p-2.5 rounded-xl bg-neutral-100 border border-neutral-200 h-fit">
                    <feature.icon className="w-5 h-5 text-[#b89428]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black text-sm">{feature.title}</h3>
                    <p className="text-xs text-neutral-600 leading-snug mt-0.5">{feature.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="relative w-full"
          >
            <RealtimeBinanceChart />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
