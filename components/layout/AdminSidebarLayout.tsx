'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import {
  UserCheck,
  Quote,
  FileText,
  LogOut,
  Shield,
  Menu,
  X,
  ChevronRight,
  ExternalLink
} from 'lucide-react'

interface AdminSidebarLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  actionButton?: React.ReactNode
}

export default function AdminSidebarLayout({
  children,
  title,
  subtitle,
  actionButton
}: AdminSidebarLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push('/admin/login')
  }

  const navItems = [
    {
      name: 'Trader Credentials',
      href: '/admin/students',
      icon: UserCheck,
    },
    {
      name: 'Testimonials Manager',
      href: '/admin/testimonials',
      icon: Quote,
    },
    {
      name: 'Blog & Insights',
      href: '/admin/insights',
      icon: FileText,
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-200 sticky top-0 z-40">
        <Link href="/admin/students" className="flex items-center space-x-2">
          <Image src="/liquidez.png" alt="ClubLiquidez Admin" width={140} height={24} className="h-6 w-auto object-contain" />
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-neutral-700 hover:text-black rounded-lg hover:bg-neutral-100"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Left Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-30 w-64 h-screen bg-white border-r border-neutral-200 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Sidebar Brand Header */}
          <div className="p-6 border-b border-neutral-100">
            <Link href="/admin/students" className="block">
              <Image src="/liquidez.png" alt="ClubLiquidez Admin" width={160} height={28} className="h-7 w-auto object-contain" priority />
            </Link>
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#b89428]/10 text-[#b89428] text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-[#b89428]" /> Admin Portal
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-neutral-100 text-black font-semibold border-l-4 border-[#b89428] shadow-xs'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#b89428]' : 'text-neutral-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-[#b89428]" />}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-neutral-900 text-[#b89428] font-bold flex items-center justify-center text-sm shrink-0 border border-[#b89428]/30">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-neutral-900 truncate">
                {user?.email || 'System Administrator'}
              </p>
              <span className="text-[10px] text-[#b89428] font-semibold">Full Admin Privileges</span>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-neutral-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-neutral-200"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-neutral-200 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">{title}</h1>
            {subtitle && <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>}
          </div>

          {actionButton && <div>{actionButton}</div>}
        </header>

        {/* Dynamic Page Children */}
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
