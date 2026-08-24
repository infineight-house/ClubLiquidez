'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import {
  GraduationCap,
  Crown,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  TrendingUp,
  Target,
  Award,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react'

export default function AcademyPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [pathsRef, pathsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [progressRef, progressInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const progressionLevels = [
    {
      level: 'Student',
      tag: '01 — Foundation',
      description: 'Build the fundamentals and learn the framework.',
      icon: GraduationCap,
      color: 'border-neutral-200',
    },
    {
      level: 'Intermediate',
      tag: '02 — Application',
      description: 'Apply the framework with greater independence and consistency.',
      icon: Target,
      color: 'border-neutral-200',
    },
    {
      level: 'Expert',
      tag: '03 — Mastery',
      description: 'Develop deeper technical understanding, strategy and execution skills.',
      icon: TrendingUp,
      color: 'border-neutral-200',
    },
    {
      level: 'Professional',
      tag: '04 — Ecosystem',
      description:
        'Develop the ability to apply your knowledge at a professional level and explore opportunities to build within the trading ecosystem.',
      icon: Crown,
      color: 'border-[#b89428]/40 bg-neutral-50/80',
    },
  ]

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white border-b border-neutral-200">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-neutral-100 rounded-full border border-neutral-200 mb-8"
            >
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span className="text-sm font-semibold text-[#b89428] tracking-wide uppercase">
                Learning Architecture
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black mb-6 leading-tight"
            >
              Your Learning Journey at <span className="text-[#b89428]">Club Liquidez</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl sm:text-2xl font-medium text-black max-w-2xl mx-auto mb-6 tracking-tight"
            >
              Start as a Student. Keep developing as a Club Member.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed border-l-2 border-brand-gold pl-4 text-left sm:text-center sm:border-l-0 sm:pl-0"
            >
              Club Liquidez is not built around a collection of beginner, intermediate and advanced courses.
              Instead, your development happens progressively through learning, practice, mentorship and continued
              participation inside the Club.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2 Core Learning Paths: Student & Club Member */}
      <section className="py-24 bg-neutral-50/60 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={pathsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

            {/* 01 — STUDENT */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={pathsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200">
                    <GraduationCap className="w-4 h-4 text-[#b89428]" />
                    <span className="text-xs font-bold text-black uppercase tracking-wider">01 — STUDENT</span>
                  </div>
                  <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
                    1-Year Validity
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3 tracking-tight">
                  Your first year of structured market education
                </h2>

                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-8">
                  Start your journey with a focused learning experience designed to build the core skills required to
                  understand and analyse markets.
                </p>

                <div className="space-y-3.5 mb-8 border-t border-neutral-100 pt-6">
                  {[
                    '1-year validity',
                    '60 live learning sessions',
                    'Market structure & price analysis',
                    'Liquidity, sessions & market context',
                    'Risk management & execution',
                    'Strategy development',
                    'Practical chart work & structured reviews',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3 text-neutral-700 text-sm sm:text-base">
                      <CheckCircle2 className="w-5 h-5 text-[#b89428] shrink-0 mt-0.5" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100">
                <p className="text-sm font-semibold text-[#b89428] mb-4">
                  Learn the framework. Build your foundation.
                </p>
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="w-full group justify-center">
                    Join as a Student
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.article>

            {/* 02 — CLUB MEMBER */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={pathsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-3xl border-2 border-brand-gold p-8 sm:p-10 flex flex-col justify-between shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-brand-gold text-black font-bold text-[11px] uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl">
                Long-Term Growth
              </div>

              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200">
                    <Crown className="w-4 h-4 text-[#b89428]" />
                    <span className="text-xs font-bold text-black uppercase tracking-wider">02 — CLUB MEMBER</span>
                  </div>
                  <span className="text-xs font-semibold text-[#b89428] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    Permanent Membership
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3 tracking-tight">
                  Continue developing beyond your Student journey
                </h2>

                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-8">
                  Students who want to continue learning can become permanent Club Members and keep developing their
                  skills inside the Club.
                </p>

                <div className="space-y-3.5 mb-8 border-t border-neutral-100 pt-6">
                  {[
                    'Permanent Club membership',
                    'Continued market education',
                    'New concepts & techniques',
                    'Algo trading & automation',
                    'Copy-trading concepts & systems',
                    'Ongoing mentorship and practical development',
                    'Opportunities to develop trading-related skills and businesses',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3 text-neutral-800 text-sm sm:text-base">
                      <Sparkles className="w-5 h-5 text-[#b89428] shrink-0 mt-0.5" />
                      <span className="font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100">
                <p className="text-sm font-semibold text-[#b89428] mb-4">
                  Don&apos;t just finish a course. Keep developing.
                </p>
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="w-full group justify-center">
                    Explore Club Membership
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.article>

          </div>
        </div>
      </section>

      {/* Progress Inside the Club Section */}
      <section className="py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={progressRef}
            initial={{ opacity: 0, y: 24 }}
            animate={progressInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-neutral-100 rounded-full border border-neutral-200 mb-6">
              <Layers className="w-4 h-4 text-[#b89428]" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Progressive Progression Path
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-black mb-6">
              Your Progress Inside <span className="text-[#b89428]">the Club</span>
            </h2>

            {/* Stepper Pill */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-6 py-3 bg-neutral-50 rounded-2xl border border-neutral-200 mb-8 shadow-sm">
              <span className="font-bold text-sm sm:text-base text-black">STUDENT</span>
              <ChevronRight className="w-4 h-4 text-[#b89428]" />
              <span className="font-bold text-sm sm:text-base text-neutral-700">INTERMEDIATE</span>
              <ChevronRight className="w-4 h-4 text-[#b89428]" />
              <span className="font-bold text-sm sm:text-base text-neutral-700">EXPERT</span>
              <ChevronRight className="w-4 h-4 text-[#b89428]" />
              <span className="font-bold text-sm sm:text-base text-[#b89428]">PROFESSIONAL</span>
            </div>

            <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              <strong className="text-black font-semibold">There is no shortcut between levels.</strong> Progress
              happens through continued learning, practical application, consistency, performance review and the
              development of real skills.
            </p>
          </motion.div>

          {/* 4 Progression Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {progressionLevels.map((lvl, idx) => (
              <motion.div
                key={lvl.level}
                initial={{ opacity: 0, y: 24 }}
                animate={progressInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-2xl border ${lvl.color} p-6 sm:p-7 flex flex-col justify-between bg-neutral-50/50 hover:border-brand-gold transition-all shadow-sm group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      {lvl.tag}
                    </span>
                    <div className="p-2 rounded-xl bg-white border border-neutral-200 group-hover:border-brand-gold transition-colors">
                      <lvl.icon className="w-5 h-5 text-[#b89428]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#b89428] transition-colors">
                    {lvl.level}
                  </h3>

                  <p className="text-neutral-600 text-sm leading-relaxed">{lvl.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={progressInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 text-center"
          >
            <p className="text-lg sm:text-xl font-semibold tracking-tight text-black border-t border-neutral-200 pt-8 max-w-2xl mx-auto">
              One starting point. A long-term path for those who choose to keep growing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Footer Block */}
      <section className="py-20 bg-neutral-50 text-center border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 tracking-tight">
            Ready to start your journey?
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Book a Call with our team to align on expectations and select your learning track.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg" className="group">
              Book an Mentor Call
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
