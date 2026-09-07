'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { Menu, X, LogOut, User as UserIcon, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, signOut, loading } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
  }

  const navItems = [
    { name: 'Academy', href: '/academy' },
    { name: 'Programs', href: '/programs' },
    { name: 'Algo Trading', href: '/algo-trading', authOnly: true },
    { name: 'Copy Trading', href: '/copy-trading', authOnly: true },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const visibleNavItems = navItems.filter((item) => !item.authOnly || user)

  const linkClass =
    'flex items-center space-x-1 text-sm text-neutral-700 transition-colors duration-200 hover:text-black font-medium'

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-6 md:h-8 w-auto">
                <Image
                  src="/liquidez.png"
                  alt="ClubLiquidez — Market Trading Education"
                  width={200}
                  height={32}
                  className="object-contain h-full w-auto"
                  priority
                />
              </div>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {visibleNavItems.map((item) => (
              <motion.div key={item.href} whileHover={{ y: -2 }} className="relative group">
                <Link href={item.href} className={linkClass}>
                  {item.name}
                </Link>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
            ) : user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors',
                    'bg-neutral-50 border-neutral-200 hover:border-brand-gold'
                  )}
                >
                  <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-neutral-500" />
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-neutral-200 shadow-xl z-50"
                    >
                      <div className="p-2">
                        <div className="px-3 py-2 border-b border-neutral-100">
                          <p className="text-sm font-medium text-black truncate">
                            {user.user_metadata?.full_name || user.email}
                          </p>
                          <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                        </div>
                        <Link
                          href="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                          <UserIcon className="w-4 h-4 text-brand-gold" />
                          <span>Profile</span>
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4 text-brand-gold" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="ghost" size="sm" className="!text-neutral-700 hover:!bg-neutral-100 hover:!text-black">
                    Sign In
                  </Button>
                </Link>
                <Link href="/student/login">
                  <Button variant="primary" size="sm">
                    Start learning
                  </Button>
                </Link>
              </>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 text-neutral-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-neutral-200 bg-white"
          >
            <div className="px-4 py-6 space-y-4">
              {visibleNavItems.map((item) => (
                <motion.div key={item.href} whileHover={{ x: 10 }} className="flex items-center space-x-3">

                  <Link
                    href={item.href}
                    className="text-sm text-neutral-700 hover:text-black transition-colors duration-200 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              {!loading && (
                <div className="pt-4 space-y-3 border-t border-neutral-200">
                  {user ? (
                    <>
                      <div className="px-3 py-2 bg-neutral-100 rounded-lg">
                        <p className="text-sm font-medium text-black truncate">
                          {user.user_metadata?.full_name || user.email}
                        </p>
                        <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                      </div>
                      <Link href="/profile" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full">
                          <UserIcon className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                      </Link>
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          handleSignOut()
                          setIsOpen(false)
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full !text-neutral-700 hover:!bg-neutral-100">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/student/login" onClick={() => setIsOpen(false)}>
                        <Button variant="primary" size="sm" className="w-full">
                          Start learning
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
