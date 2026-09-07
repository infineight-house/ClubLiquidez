'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react'

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast.error('Please enter admin credentials')
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await signIn(email, password)
      if (error) {
        toast.error(error.message || 'Admin authentication failed')
      } else {
        toast.success('Admin Session Authenticated!')
        router.push('/admin/students')
      }
    } catch (err: any) {
      toast.error(err.message || 'Authentication error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center space-y-3 mb-8 text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/lcplogo.png"
              alt="ClubLiquidez Admin"
              width={220}
              height={40}
              style={{ height: 'auto' }}
              className="h-10 w-auto object-contain mx-auto"
              priority
            />
          </Link>

          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" /> Restricted Admin Portal
          </div> */}
        </div>

        {/* Centered Admin Card */}
        <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl relative">
          <div className="text-center mb-8 border-b border-neutral-800 pb-5">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mx-auto mb-3 text-brand-gold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Administrator Sign In</h1>
            <p className="text-xs text-neutral-400 mt-1">
              Protected authentication for platform directors.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Admin Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-4 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="admin@clubliquidez.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-4 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm focus:outline-none focus:border-brand-gold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center bg-[#b89428] text-black font-bold group"
              >
                {isSubmitting ? 'Authenticating Admin...' : 'Sign In to Admin Console'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
