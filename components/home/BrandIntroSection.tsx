'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Compass, Sparkles } from 'lucide-react'

const BrandIntroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.12,
  })

  return (
    <section className="py-20 bg-white text-black border-y border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 mb-6"
          >
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-medium text-neutral-800">Why market education — why now</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-6 leading-tight">
            Markets reward <span className="text-[#b89428]">preparation</span>—not prediction.
          </h2>

          <p className="text-lg sm:text-xl text-neutral-600 mb-5 leading-relaxed tracking-tight">
            Markets move through changing volatility, liquidity and session conditions. Our curriculum teaches you how to read price behaviour, identify context, manage risk and build a repeatable decision-making process.
          </p>


          <p className="text-base sm:text-lg text-neutral-600 mb-3 leading-relaxed max-w-3xl mx-auto">
            We approach trading as a skill that improves through deliberate practice, not guesswork. This means learning how to frame strategies around market structure, manage size and time your entries—not chasing signals or relying on hope.
          </p>
          <p className="text-sm sm:text-base text-neutral-500 font-medium mb-8 max-w-2xl mx-auto">
            Education only—we never execute trades for you or sell alerts.
          </p>

          <p className="text-lg font-semibold tracking-tight text-[#b89428] border-t border-neutral-200 pt-8 max-w-2xl mx-auto">
            Structured drills. Honest feedback. No get-rich narrative.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default BrandIntroSection
