'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { 
  BookOpen, 
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Shield,
  Brain,
  Target,
  BarChart3,
  Users,
  Award,
  PlayCircle,
  FileText,
  Zap
} from 'lucide-react'

export default function AcademyPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const modules = [
    {
      id: 1,
      title: 'Breakout Strategy',
      icon: TrendingUp,
      description: 'Master the art of identifying and trading breakouts with precision. Learn entry, exit, and stop-loss techniques.',
      topics: [
        'Identifying breakout patterns',
        'Volume confirmation techniques',
        'Entry and exit strategies',
        'False breakout prevention',
        'Breakout trading psychology'
      ],
      duration: '4 weeks',
      color: 'neon-gold'
    },
    {
      id: 2,
      title: 'Risk Management',
      icon: Shield,
      description: 'Build unshakeable risk management systems. Protect your capital while maximizing profit potential.',
      topics: [
        'Position sizing formulas',
        'Risk-reward ratios',
        'Stop-loss placement',
        'Portfolio risk management',
        'Drawdown control strategies'
      ],
      duration: '3 weeks',
      color: 'neon-gold-champagne'
    },
    {
      id: 3,
      title: 'Psychology',
      icon: Brain,
      description: 'Develop the mental fortitude of a professional trader. Overcome emotional barriers and maintain discipline.',
      topics: [
        'Trading psychology fundamentals',
        'Emotional control techniques',
        'Dealing with losses',
        'Building confidence',
        'Maintaining consistency'
      ],
      duration: '3 weeks',
      color: 'neon-gold-dark'
    },
    {
      id: 4,
      title: 'Execution Discipline',
      icon: Target,
      description: 'Execute trades flawlessly with strict discipline. Learn to follow your plan without deviation.',
      topics: [
        'Trade execution protocols',
        'Discipline frameworks',
        'Journaling and review',
        'Performance tracking',
        'Continuous improvement'
      ],
      duration: '2 weeks',
      color: 'neon-amber'
    },
    {
      id: 5,
      title: 'Strategy Building',
      icon: BarChart3,
      description: 'Create your own profitable trading strategy from scratch. Build, test, and refine your approach.',
      topics: [
        'Strategy development process',
        'Backtesting methodologies',
        'Forward testing protocols',
        'Strategy optimization',
        'Live implementation'
      ],
      duration: '4 weeks',
      color: 'neon-gold'
    }
  ]

  const learningOutcomes = [
    {
      icon: CheckCircle2,
      text: 'Develop a complete trading strategy from scratch'
    },
    {
      icon: CheckCircle2,
      text: 'Master breakout trading with 85%+ accuracy'
    },
    {
      icon: CheckCircle2,
      text: 'Implement professional risk management systems'
    },
    {
      icon: CheckCircle2,
      text: 'Build unshakeable trading psychology'
    },
    {
      icon: CheckCircle2,
      text: 'Execute trades with perfect discipline'
    },
    {
      icon: CheckCircle2,
      text: 'Achieve consistent profitability'
    }
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-dark-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.03),transparent_60%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-dark-800 rounded-full border border-neon-gold-deep/30 mb-8"
            >
              <Award className="w-4 h-4 text-neon-gold" />
              <span className="text-sm text-neon-gold font-medium">Master-Level Course</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              Master <span className="gradient-text">Trading Course</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Our goal: Help traders gain <span className="text-neon-gold">clarity</span>, 
              <span className="text-neon-blue"> structure</span> & 
              <span className="text-neon-gold-champagne"> confidence</span>. 
              Transform from beginner to master trader.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-neon-gold" />
                <span>30 + 30 days Duration</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-neon-gold" />
                <span>30 Days course + 30 days Live Sessions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-neon-gold" />
                <span>Certificate of Completion</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Duration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-dark-800 rounded-2xl p-8 border border-gray-700"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-neon-gold/20 rounded-xl border border-neon-gold/30">
                  <Clock className="w-8 h-8 text-neon-gold" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Duration</h3>
                  <p className="text-gray-400 text-sm">Total Course Length</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Duration</span>
                  <span className="text-white font-semibold text-lg">30 + 30 Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Course Sessions</span>
                  <span className="text-white font-semibold">30 Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Live Market Sessions</span>
                  <span className="text-white font-semibold">30 Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Format</span>
                  <span className="text-white font-semibold">Online</span>
                </div>
              </div>
            </motion.div>

            {/* Fees */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-neon-gold/20 to-neon-gold-champagne/20 rounded-2xl p-8 border border-neon-gold/30"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-neon-gold rounded-xl">
                  <DollarSign className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Zero Fees</h3>
                  <p className="text-gray-300 text-sm">Investment in Your Future</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-4xl font-bold text-neon-gold mb-2">$0</div>
                  <p className="text-gray-300 text-sm">Zero Fees - Reach out to us for more details</p>
                </div>
                <div className="pt-4 border-t border-neon-gold/30 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-neon-gold" />
                    <span>All modules included</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-neon-gold" />
                    <span>Lifetime access to materials</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-neon-gold" />
                    <span>Community access</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-neon-gold" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-dark-800 rounded-2xl p-8 border border-gray-700"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-neon-gold rounded-xl">
                  <DollarSign className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Course Fees</h3>
                  <p className="text-gray-300 text-sm">Investment in Your Future</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-4xl font-bold text-neon-gold mb-2">$250</div>
                  <p className="text-gray-300 text-sm">One-time payment</p>
                </div>
                <div className="pt-4 border-t border-neon-gold/30 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-neon-gold" />
                    <span>All modules included</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-neon-gold" />
                    <span>Lifetime access to materials</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-neon-gold" />
                    <span>Community access</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-neon-gold" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* What You'll Learn */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-dark-800 rounded-2xl p-8 border border-gray-700"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-neon-blue/20 rounded-xl border border-neon-blue/30">
                  <BookOpen className="w-8 h-8 text-neon-blue" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">What You'll Learn</h3>
                  <p className="text-gray-400 text-sm">Key Outcomes</p>
                </div>
              </div>
              <div className="space-y-3">
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <outcome.icon className="w-5 h-5 text-neon-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{outcome.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Syllabus */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-dark-800 rounded-full border border-neon-gold/30 mb-6"
            >
              <FileText className="w-4 h-4 text-neon-gold" />
              <span className="text-sm text-neon-gold font-medium">Complete Curriculum</span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Course <span className="gradient-text">Syllabus</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A comprehensive 5-module program designed to transform you into a master trader
            </p>
          </motion.div>

          <div className="space-y-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-dark-800 rounded-2xl border border-gray-700 p-8 hover:border-neon-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-neon-gold/10">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Module Header */}
                    <div className="lg:w-1/3">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className={`p-4 rounded-xl border ${
                          module.color === 'neon-gold' ? 'bg-neon-gold/20 border-neon-gold/30' :
                          module.color === 'neon-gold-champagne' ? 'bg-neon-gold-champagne/20 border-neon-gold-champagne/30' :
                          module.color === 'neon-gold-dark' ? 'bg-neon-gold-dark/20 border-neon-gold-dark/30' :
                          'bg-neon-amber/20 border-neon-amber/30'
                        }`}>
                          <module.icon className={`w-8 h-8 ${
                            module.color === 'neon-gold' ? 'text-neon-gold' :
                            module.color === 'neon-gold-champagne' ? 'text-neon-gold-champagne' :
                            module.color === 'neon-gold-dark' ? 'text-neon-gold-dark' :
                            'text-neon-amber'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-medium text-gray-400">Module {module.id}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-400">{module.duration}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">{module.title}</h3>
                          <p className="text-gray-300 leading-relaxed">{module.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Topics List */}
                    <div className="lg:w-2/3">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                        <PlayCircle className="w-5 h-5 text-neon-gold" />
                        <span>Topics Covered</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-start space-x-2">
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                              module.color === 'neon-gold' ? 'text-neon-gold' :
                              module.color === 'neon-gold-champagne' ? 'text-neon-gold-champagne' :
                              module.color === 'neon-gold-dark' ? 'text-neon-gold-dark' :
                              'text-neon-amber'
                            }`} />
                            <span className="text-gray-300 text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Formats */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Learning <span className="gradient-text">Formats</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Multiple ways to learn and engage with the material
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: PlayCircle,
                title: 'Video Modules',
                description: 'Pre-recorded comprehensive video lessons',
                color: 'neon-gold'
              },
              {
                icon: Users,
                title: 'Live Zoom Sessions',
                description: 'Interactive live training 2x per week',
                color: 'neon-gold-champagne'
              },
              {
                icon: FileText,
                title: 'Weekly Q&A',
                description: 'Get your questions answered weekly',
                color: 'neon-gold-dark'
              },
              {
                icon: Award,
                title: 'Mentorship',
                description: 'One-on-one mentorship support',
                color: 'neon-amber'
              }
            ].map((format, index) => (
              <motion.div
                key={format.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800 rounded-2xl p-6 border border-gray-700 text-center hover:border-neon-gold/50 transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                  format.color === 'neon-gold' ? 'bg-neon-gold/20 border border-neon-gold/30' :
                  format.color === 'neon-gold-champagne' ? 'bg-neon-gold-champagne/20 border border-neon-gold-champagne/30' :
                  format.color === 'neon-gold-dark' ? 'bg-neon-gold-dark/20 border border-neon-gold-dark/30' :
                  'bg-neon-amber/20 border border-neon-amber/30'
                }`}>
                  <format.icon className={`w-8 h-8 ${
                    format.color === 'neon-gold' ? 'text-neon-gold' :
                    format.color === 'neon-gold-champagne' ? 'text-neon-gold-champagne' :
                    format.color === 'neon-gold-dark' ? 'text-neon-gold-dark' :
                    'text-neon-amber'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{format.title}</h3>
                <p className="text-gray-400 text-sm">{format.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-black via-dark-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05),transparent_60%)]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-dark-800 rounded-full border border-neon-gold-deep/30 mb-8"
            >
              <Zap className="w-4 h-4 text-neon-gold" />
              <span className="text-sm text-neon-gold font-medium">Limited Spots Available</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Ready to Join the <span className="gradient-text">Course</span>?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed"
            >
              Transform your trading journey. Gain <span className="text-neon-gold">clarity</span>, 
              <span className="text-neon-blue"> structure</span> & 
              <span className="text-neon-gold-champagne"> confidence</span> with our master-level course.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/auth">
                <Button variant="primary" size="lg" className="group">
                  Join the Course
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Schedule a Call
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-neon-gold" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-neon-gold" />
                <span>Lifetime access to materials</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-neon-gold" />
                <span>Certificate of completion</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
