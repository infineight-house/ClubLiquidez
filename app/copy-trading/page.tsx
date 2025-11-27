'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer' 
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: 'Technical Analysis' | 'News' | 'Strategy' | 'Education'
  tags: string[]
  views: number
  featured: boolean
}


const CopyTradingPage = () => {
  return (
    <main className="min-h-screen bg-dark-950">
      <Navbar />
    
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-dark-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-dark-800 rounded-full border border-neon-gold-champagne/20 mb-8">
              <div className="w-2 h-2 bg-neon-gold-champagne rounded-full animate-pulse"></div>
              <span className="text-sm text-neon-gold-champagne">Copy Trading</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="gradient-text">Copy Trading</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              Automatically mirror trades from a single, disciplined master account built on strict strategy and low-risk execution.
            </p>
            
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Copy trading with Club Liquidez gives you:
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-dark-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Real-time trade replication</h3>
            </div>
            <div className="bg-dark-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Controlled, consistent risk</h3>
            </div>
            <div className="bg-dark-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Automated position sizing (auto-scale equity)</h3>
            </div>
            <div className="bg-dark-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">A long-term compounding approach</h3>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                For <span className="gradient-text">whom?</span>
              </h2>
              <ul className="space-y-3 text-gray-300 text-lg">
                <li>– Traders who want stability, not stress</li>
                <li>– Working professionals who can't watch charts</li>
                <li>– Beginners who want structured growth</li>
                <li>– Investors who prefer low-risk, rule-based trading</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Why is this <span className="gradient-text">advisable?</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Because your capital stays in your own account, you stay in full control, while the system mirrors a strategy designed for consistency, not hype, not gambling, not oversized risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Copy Trading Section */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12">
              Why Copy Trading Is Your First Step Toward <span className="gradient-text">Real Financial Freedom</span>
            </h2>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Most people spend their entire lives working for money. They trade their hours… their energy… their health… for a salary that stops the moment they stop working.
              </p>
              <p>
                Copy trading breaks that cycle. With one disciplined master account and automated execution, your capital begins to work quietly in the background, whether you're at your job, travelling, sleeping, or spending time with people you love.
              </p>
              <p className="text-neon-gold font-semibold">
                This isn't a shortcut. It's a structure.
              </p>
              <p>A system where:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>your decisions aren't driven by emotion</li>
                <li>your trades aren't random</li>
                <li>your money grows through disciplined, rule-based execution</li>
                <li>your progress doesn't depend on your screen time</li>
              </ul>
              <p>
                For working professionals, students, business owners, or anyone tired of chasing the markets, copy trading is the simplest way to start building wealth on autopilot.
              </p>
              <p>
                Not hype. Not gambling. Not signals. Just a clean, low-risk model that compounds slowly and steadily, the way real wealth is built.
              </p>
              <p className="text-neon-gold font-semibold text-xl">
                Your money should work even when you don't. This is where that begins.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start <span className="gradient-text">Compounding With Precision?</span>
          </h2>
          
          <div className="space-y-4 text-gray-300 text-lg">
            <p>Your capital stays in your control,</p>
            <p>the system handles the execution,</p>
            <p>and the growth happens quietly in the background.</p>
            <p className="text-white font-semibold">You don't need experience. You just need discipline and patience.</p>
          </div>

          <div className="bg-dark-800 rounded-2xl p-8 border border-gray-700 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-gray-400 text-sm mb-1">Minimum Required Capital</p>
                <p className="text-white font-semibold text-lg">$300</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Auto-scale equity</p>
                <p className="text-neon-gold font-semibold">✓ Included</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Strategy</p>
                <p className="text-white font-semibold text-lg">Strict low-risk</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-6">February is coming, momentum doesn't wait. Join now!</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          > </motion.div>
          <Link href="/auth">
            <Button variant="primary" size="lg" className="group">
              Join Copy Trading →
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
} 

export default CopyTradingPage 