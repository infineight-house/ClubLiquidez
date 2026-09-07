'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'
import { type Testimonial, FALLBACK_TESTIMONIALS, getTestimonials } from '@/lib/supabase/testimonials'

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTestimonials({ publishedOnly: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setTestimonials(data)
        }
      })
      .catch((err) => {
        console.warn('Could not load database testimonials, using fallback', err)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-24 relative overflow-hidden bg-white text-black border-y border-neutral-200">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 mb-5">
            <Star className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-medium text-neutral-800">Learner voices</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6">
            Proof lives in <span className="text-[#b89428]">process wins</span>
          </h2>

          <div className="text-lg text-neutral-600 max-w-3xl mx-auto space-y-2 tracking-tight">
            <p>Cohorts stay small so mentors actually know your playbook.</p>
            <p className="text-neutral-600 text-base">
              Results vary individually—what we guarantee is curriculum depth and honest critique.
            </p>
          </div>
        </motion.div>

        {/* Infinite Right-to-Left Animated Marquee */}
        <div className="overflow-hidden w-full relative py-4">
          {/* Gradient Side Fades */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              ease: 'linear',
              duration: 35,
              repeat: Infinity,
            }}
          >
            {[...(loading ? FALLBACK_TESTIMONIALS : testimonials), ...(loading ? FALLBACK_TESTIMONIALS : testimonials)].map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="w-[320px] sm:w-[380px] shrink-0 group"
              >
                <div className="h-full bg-neutral-50 rounded-2xl border border-neutral-200 p-6 hover:border-brand-gold transition-all duration-300 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4 gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {testimonial.avatar_url ? (
                          <Image
                            src={testimonial.avatar_url}
                            alt={testimonial.name}
                            width={44}
                            height={44}
                            unoptimized
                            className="w-11 h-11 rounded-full object-cover border border-brand-gold/30 shrink-0"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-brand-gold flex items-center justify-center shrink-0">
                            <span className="text-black font-bold text-sm">
                              {testimonial.image || testimonial.name.slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="font-semibold text-black truncate">{testimonial.name}</h4>
                          {testimonial.role && <p className="text-sm text-neutral-600 truncate">{testimonial.role}</p>}
                          {testimonial.location && <p className="text-xs text-neutral-500 truncate">{testimonial.location}</p>}
                          {testimonial.isGoogle && testimonial.relativeTime && (
                            <p className="text-xs text-neutral-500">{testimonial.relativeTime}</p>
                          )}
                        </div>
                      </div>
                      {testimonial.isGoogle && (
                        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="shrink-0" aria-label="Google review">
                          <svg className="w-8 h-8" viewBox="0 0 24 24" aria-hidden>
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(Math.min(5, Math.max(1, testimonial.rating)))].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>

                    <div className="relative mb-4">
                      <Quote className="w-8 h-8 text-[#b89428]/25 absolute -top-2 -left-1" />
                      <p className="text-neutral-700 leading-relaxed relative z-10 pl-6 text-sm">{testimonial.text}</p>
                    </div>
                  </div>

                  {testimonial.highlight && (
                    <div className="pt-4 border-t border-neutral-200">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#b89428]">{testimonial.highlight}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
