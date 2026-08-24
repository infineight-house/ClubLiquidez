'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, Shield } from 'lucide-react'
import { format } from 'date-fns'

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [loading, user, router])

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-50 rounded-2xl border border-neutral-200 p-8 shadow-sm"
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center border border-neutral-200 shadow-sm">
                <span className="text-black font-bold text-2xl">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-black">
                  {user.user_metadata?.full_name || 'User Profile'}
                </h1>
                <p className="text-neutral-600 font-medium">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <Mail className="w-5 h-5 text-[#b89428]" />
                  <h3 className="text-lg font-bold text-black">Email</h3>
                </div>
                <p className="text-neutral-600 font-medium">{user.email}</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="w-5 h-5 text-[#b89428]" />
                  <h3 className="text-lg font-bold text-black">Member Since</h3>
                </div>
                <p className="text-neutral-600 font-medium">
                  {mounted && user.created_at 
                    ? format(new Date(user.created_at), 'MMM dd, yyyy')
                    : user.created_at 
                    ? 'Loading...' 
                    : 'N/A'}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-5 h-5 text-[#b89428]" />
                  <h3 className="text-lg font-bold text-black">Account Status</h3>
                </div>
                <p className="text-neutral-600 font-medium">
                  {user.email_confirmed_at ? 'Verified' : 'Pending Verification'}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <User className="w-5 h-5 text-[#b89428]" />
                  <h3 className="text-lg font-bold text-black">User ID</h3>
                </div>
                <p className="text-neutral-600 text-sm font-mono truncate">{user.id}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

