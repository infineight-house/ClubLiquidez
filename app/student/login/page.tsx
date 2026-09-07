'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  UserCheck,
  ArrowRight,
  ShieldCheck
} from 'lucide-react'

export default function StudentLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast.error('Please enter your email address and password')
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await signIn(email, password)
      if (error) {
        toast.error(error.message || 'Invalid trader credentials. Contact admin if you need access.')
      } else {
        toast.success('Trader Credentials Verified! Launching Console...')
        router.push('/student/dashboard')
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred during sign in')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDemoAccess = () => {
    toast.success('Entering Traders Learning Console (Demo Mode)...')
    router.push('/student/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0B192C] bg-[radial-gradient(ellipse_80%_80%_at_50%_40%,rgba(30,64,110,0.45),transparent_75%)] text-white flex items-center justify-center p-4 sm:p-6">
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
              alt="ClubLiquidez"
              width={220}
              height={40}
              style={{ height: 'auto' }}
              className="h-10 w-auto object-contain mx-auto"
              priority
            />
          </Link>

          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            Traders Learning Console
          </div> */}
        </div>

        {/* Centered Login Card */}
        <div className="p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="border-b border-neutral-800 pb-5 mb-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold mb-3">
              <UserCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Trader Sign In</h1>
            <p className="text-xs text-neutral-400 mt-1">
              Enter the credentials issued by your cohort administrator.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Trader Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-4 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="trader@clubliquidez.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm focus:outline-none focus:border-[#b89428]"
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
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm focus:outline-none focus:border-[#b89428]"
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

            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed text-center">
              🔒 Accounts are issued by admissions. Contact your mentor for access.
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center bg-[#b89428] text-black font-bold group"
              >
                {isSubmitting ? 'Verifying Credentials...' : 'Sign In to Console'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>

          {/* Instant Demo Access Button */}
          <div className="mt-6 pt-5 border-t border-neutral-800 text-center">
            <button
              onClick={handleDemoAccess}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-neutral-300 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-brand-gold" /> Explore Console (Instant Demo Access)
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
