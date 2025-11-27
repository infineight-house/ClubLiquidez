'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const testimonials = [
    {
      name: 'Michael Chen',
      role: 'Professional Trader',
      location: 'Singapore',
      image: 'MC',
      rating: 5,
      text: 'ClubLiquidez transformed my trading. The copy trading feature alone has increased my returns by 300%. The community support is incredible.',
      highlight: '300% increase in returns'
    },
    {
      name: 'Sarah Johnson',
      role: 'Institutional Investor',
      location: 'London, UK',
      image: 'SJ',
      rating: 5,
      text: 'The algo trading platform is world-class. I\'ve been able to backtest and deploy strategies that would have taken months to develop elsewhere.',
      highlight: 'World-class platform'
    },
    {
      name: 'David Rodriguez',
      role: 'Trading Educator',
      location: 'New York, USA',
      image: 'DR',
      rating: 5,
      text: 'The Master Course is comprehensive and practical. My students have seen remarkable improvements after completing the program. Highly recommended.',
      highlight: 'Comprehensive education'
    },
    {
      name: 'Emma Thompson',
      role: 'Day Trader',
      location: 'Sydney, Australia',
      image: 'ET',
      rating: 5,
      text: 'The February Gold Cycle strategy has been a game-changer. The insights and timing have been spot-on. Best investment in my trading career.',
      highlight: 'Game-changing strategy'
    },
    {
      name: 'James Wilson',
      role: 'Crypto Trader',
      location: 'Dubai, UAE',
      image: 'JW',
      rating: 5,
      text: 'The membership club gives me access to tools and insights I couldn\'t get anywhere else. The monthly webinars are worth the price alone.',
      highlight: 'Exclusive access'
    },
    {
      name: 'Lisa Anderson',
      role: 'Portfolio Manager',
      location: 'Toronto, Canada',
      image: 'LA',
      rating: 5,
      text: 'Outstanding risk management features. The platform gives me confidence to scale my operations while maintaining strict control over exposure.',
      highlight: 'Outstanding risk management'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-dark-900 via-black to-dark-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-gold-champagne rounded-full blur-3xl" />
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
            <Star className="w-4 h-4 text-neon-gold" />
            <span className="text-sm text-neon-gold font-medium">Member Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Social <span className="gradient-text">Proof</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto space-y-2 mb-8"
          >
            <p><span className="text-neon-gold font-semibold">190+</span> active copy clients</p>
            <p>Years of consistent breakout execution</p>
            <p>Trusted automation models</p>
            <p>A serious, growing trading community</p>
            <p className="text-gray-400 text-lg mt-4">This strengthens trust without bragging.</p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-dark-800 rounded-2xl border border-gray-700 p-6 hover:border-neon-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-neon-gold/10">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-neon-gold rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">{testimonial.image}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-neon-gold text-neon-gold" />
                  ))}
                </div>

                <div className="relative mb-4">
                  <Quote className="w-8 h-8 text-neon-gold/30 absolute -top-2 -left-1" />
                  <p className="text-gray-300 leading-relaxed relative z-10 pl-6">
                    {testimonial.text}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <span className="text-sm font-semibold text-neon-gold">
                    {testimonial.highlight}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection


