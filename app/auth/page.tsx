'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Mail, Lock, Eye, EyeOff, User, Shield, ArrowRight } from 'lucide-react'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [forgotPassword, setForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')

  const { signIn, signUp, resetPassword } = useAuth()
  const router = useRouter()

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Handle URL parameters for email verification and errors
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const verified = params.get('verified')
    const error = params.get('error')
    
    if (verified === 'true') {
      toast.success('Email verified successfully! You can now sign in.')
      // Clean up URL
      router.replace('/auth')
    }
    
    if (error) {
      toast.error(decodeURIComponent(error))
      // Clean up URL
      router.replace('/auth')
    }
  }, [router])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return 'Password must be at least 8 characters long'
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!/[a-z]/.test(pwd)) {
      return 'Password must contain at least one lowercase letter'
    }
    if (!/[0-9]/.test(pwd)) {
      return 'Password must contain at least one number'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (forgotPassword) {
        if (!validateEmail(resetEmail)) {
          toast.error('Please enter a valid email address')
          setIsSubmitting(false)
          return
        }
        const { error } = await resetPassword(resetEmail)
        if (error) {
          toast.error(error.message || 'Failed to send reset email')
        } else {
          toast.success('Password reset email sent! Check your inbox.')
          setForgotPassword(false)
          setResetEmail('')
        }
      } else if (isLogin) {
        if (!validateEmail(email)) {
          toast.error('Please enter a valid email address')
          setIsSubmitting(false)
          return
        }
        if (!password) {
          toast.error('Please enter your password')
          setIsSubmitting(false)
          return
        }
        const { error } = await signIn(email, password)
        if (error) {
          toast.error(error.message || 'Failed to sign in')
        } else {
          toast.success('Successfully signed in!')
          router.push('/student/dashboard')
        }
      } else {
        if (!fullName || fullName.trim().length < 2) {
          toast.error('Please enter your full name (at least 2 characters)')
          setIsSubmitting(false)
          return
        }
        if (!validateEmail(email)) {
          toast.error('Please enter a valid email address')
          setIsSubmitting(false)
          return
        }
        const passwordError = validatePassword(password)
        if (passwordError) {
          toast.error(passwordError)
          setIsSubmitting(false)
          return
        }
        const { error } = await signUp(email, password, fullName)
        if (error) {
          toast.error(error.message || 'Failed to create account')
        } else {
          toast.success('Account created! Please check your email to verify your account before signing in.')
          // Clear form
          setEmail('')
          setPassword('')
          setFullName('')
          setIsLogin(true)
        }
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-[#b89428]" />
              <h1 className="text-5xl lg:text-6xl font-bold text-black">
                Welcome to <span className="text-[#b89428]">ClubLiquidez</span>
              </h1>
            </div>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
              Join thousands of traders worldwide and start your journey to financial success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Auth Form */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm"
          >
            {!forgotPassword ? (
              <>
                {/* Toggle Buttons */}
                <div className="flex bg-neutral-100 rounded-full p-1 mb-8 border border-neutral-200">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isLogin 
                        ? 'bg-brand-gold text-black shadow-sm' 
                        : 'text-neutral-600 hover:text-black'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      !isLogin 
                        ? 'bg-brand-gold text-black shadow-sm' 
                        : 'text-neutral-600 hover:text-black'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-lg text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-lg text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 bg-white border border-neutral-300 rounded-lg text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-black"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {!isLogin && password && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2 text-xs">
                          <div className={`flex-1 h-1 rounded ${password.length >= 8 ? 'bg-green-500' : 'bg-neutral-200'}`} />
                          <div className={`flex-1 h-1 rounded ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-neutral-200'}`} />
                          <div className={`flex-1 h-1 rounded ${/[a-z]/.test(password) ? 'bg-green-500' : 'bg-neutral-200'}`} />
                          <div className={`flex-1 h-1 rounded ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-neutral-200'}`} />
                        </div>
                        <p className="mt-1 text-xs text-neutral-500">
                          Must be at least 8 characters with uppercase, lowercase, and number
                        </p>
                      </div>
                    )}
                  </div>

                  {isLogin && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-brand-gold bg-white border-neutral-300 rounded focus:ring-brand-gold focus:ring-2"
                        />
                        <span className="ml-2 text-sm text-neutral-600">Remember me</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setForgotPassword(true)}
                        className="text-sm text-[#b89428] hover:underline font-semibold"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {!isLogin && (
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        required
                        className="w-4 h-4 text-brand-gold bg-white border-neutral-300 rounded focus:ring-brand-gold focus:ring-2 mt-1"
                      />
                      <label className="ml-2 text-sm text-neutral-600">
                        I agree to the{' '}
                        <a href="/terms" className="text-[#b89428] hover:underline font-semibold">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="/privacy" className="text-[#b89428] hover:underline font-semibold">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    loading={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>

                {/* Switch Mode */}
                <div className="mt-8 text-center">
                  <p className="text-neutral-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-[#b89428] hover:underline font-semibold"
                    >
                      {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-black mb-2">Reset Password</h2>
                  <p className="text-neutral-600 text-sm">Enter your email to receive a password reset link</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="email"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-lg text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    loading={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                  </Button>

                  <button
                    type="button"
                    onClick={() => {
                      setForgotPassword(false)
                      setResetEmail('')
                    }}
                    className="w-full text-center text-[#b89428] hover:underline font-semibold"
                  >
                    Back to Sign In
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default AuthPage
