'use client'

import React from 'react'
import StudentSidebarLayout from '@/components/layout/StudentSidebarLayout'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import {
  BookOpen,
  Calendar,
  Clock,
  Video,
  FileText,
  Sparkles,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  MessageSquare
} from 'lucide-react'

export default function StudentDashboardPage() {
  const { user } = useAuth()

  const studentInfo = {
    name: user?.user_metadata?.full_name || 'Enrolled Trader',
    cohort: 'Cohort 14 · Gold & Bullion Focus',
    mentor: 'Arvin R. (Lead Market Strategist)',
    progressPercent: 68,
    completedModules: 7,
    totalModules: 10,
    journalsLogged: 14,
    nextLiveSession: 'Today, 8:30 PM IST · London/NY Overlap Sweep Drill'
  }

  const modules = [
    {
      title: 'Module 1: Market Structure & Session Windows',
      status: 'Completed',
      duration: '4 Lessons',
      progress: 100
    },
    {
      title: 'Module 2: Liquidity Mapping & Asian Range Sweeps',
      status: 'Completed',
      duration: '5 Lessons',
      progress: 100
    },
    {
      title: 'Module 3: Volatility Regimes & Position Sizing',
      status: 'In Progress',
      duration: '6 Lessons',
      progress: 60
    },
    {
      title: 'Module 4: Trade Journaling & Discipline Curve',
      status: 'Upcoming',
      duration: '3 Lessons',
      progress: 0
    }
  ]

  const upcomingLabs = [
    {
      title: 'XAU/USD London Sweep & Volatility Drill',
      time: 'Today, 8:30 PM IST',
      mentor: 'Arvin R.',
      type: 'Live Market Drill'
    },
    {
      title: 'Risk Architecture & Lot Size Remediation',
      time: 'Tomorrow, 7:00 PM IST',
      mentor: 'Sarah K.',
      type: 'Cohort Q&A'
    }
  ]

  return (
    <StudentSidebarLayout
      title="Traders Console Overview"
      subtitle={`Welcome back, ${studentInfo.name} • ${studentInfo.cohort}`}
      actionButton={
        <Link href="/student/journal">
          <Button variant="primary" size="sm" className="bg-[#b89428] hover:bg-[#c5a028] text-black font-semibold">
            <FileText className="w-4 h-4 mr-2" /> Log Execution
          </Button>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* Banner Card */}
        <div className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b89428]/10 text-[#b89428] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Enrolled Cohort Member
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Market Mastery <span className="text-[#b89428]">Console</span>
              </h2>
              <p className="text-neutral-600 text-sm mt-1">
                Assigned Lead Mentor: <strong className="text-neutral-900">{studentInfo.mentor}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/student/curriculum">
                <Button variant="outline" size="sm" className="border-neutral-300 text-neutral-800 hover:bg-neutral-100">
                  <BookOpen className="w-4 h-4 mr-2 text-[#b89428]" /> Open Curriculum
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-neutral-100">
            <div>
              <span className="text-xs text-neutral-500 font-medium">Curriculum Progress</span>
              <p className="text-2xl font-bold text-neutral-900 mt-0.5">{studentInfo.progressPercent}%</p>
              <div className="w-full bg-neutral-100 rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-[#b89428] h-full rounded-full" style={{ width: `${studentInfo.progressPercent}%` }} />
              </div>
            </div>

            <div>
              <span className="text-xs text-neutral-500 font-medium">Modules Completed</span>
              <p className="text-2xl font-bold text-neutral-900 mt-0.5">{studentInfo.completedModules} / {studentInfo.totalModules}</p>
              <span className="text-[11px] text-emerald-600 font-semibold">On Schedule</span>
            </div>

            <div>
              <span className="text-xs text-neutral-500 font-medium">Journals Logged</span>
              <p className="text-2xl font-bold text-neutral-900 mt-0.5">{studentInfo.journalsLogged}</p>
              <span className="text-[11px] text-neutral-500">12 Reviewed</span>
            </div>

            <div>
              <span className="text-xs text-neutral-500 font-medium">Next Live Lab</span>
              <p className="text-xs font-semibold text-[#b89428] mt-1 truncate">{studentInfo.nextLiveSession}</p>
            </div>
          </div>
        </div>

        {/* Console Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Lab Alert Banner */}
            <div className="p-6 rounded-2xl bg-white border border-[#b89428]/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#b89428]/10 text-[#b89428] shrink-0">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-[#b89428] font-bold uppercase tracking-wider">Live Session Starting Soon</span>
                  <h3 className="font-bold text-neutral-900 text-base mt-0.5">London / NY Liquidity Sweep Live Drill</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">With Lead Mentor Arvin R. • Interactive Whiteboard & Q&A</p>
                </div>
              </div>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Joining live cohort room...') }}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#b89428] text-black font-bold text-sm hover:bg-[#c5a028] transition-all shrink-0 w-full sm:w-auto text-center"
              >
                <PlayCircle className="w-4 h-4 mr-2" /> Join Room
              </a>
            </div>

            {/* Active Learning Modules */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
                <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#b89428]" />
                  Cohort Learning Modules
                </h2>
                <Link href="/student/curriculum" className="text-xs text-[#b89428] font-bold hover:underline flex items-center gap-1">
                  All Modules <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-3.5">
                {modules.map((mod) => (
                  <div
                    key={mod.title}
                    className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-4 hover:border-neutral-300 transition-all"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {mod.status === 'Completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : mod.status === 'In Progress' ? (
                        <Clock className="w-5 h-5 text-[#b89428] shrink-0 animate-pulse" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-neutral-300 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <h4 className="font-semibold text-neutral-900 text-sm truncate">{mod.title}</h4>
                        <p className="text-xs text-neutral-500 mt-0.5">{mod.duration} • {mod.status}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="w-24 hidden sm:block">
                        <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#b89428] h-full" style={{ width: `${mod.progress}%` }} />
                        </div>
                      </div>
                      <Link href="/student/curriculum">
                        <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-800 hover:border-[#b89428]">
                          {mod.status === 'Completed' ? 'Review' : mod.status === 'In Progress' ? 'Continue' : 'Locked'}
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 1 Column */}
          <div className="space-y-8">
            {/* Live Lab Schedule */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2 mb-4 pb-3 border-b border-neutral-100">
                <Calendar className="w-5 h-5 text-[#b89428]" />
                Live Market Schedule
              </h2>

              <div className="space-y-3.5">
                {upcomingLabs.map((lab) => (
                  <div key={lab.title} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span className="text-[10px] uppercase font-bold text-[#b89428] tracking-wider">{lab.type}</span>
                    <h4 className="font-semibold text-neutral-900 text-sm mt-1">{lab.title}</h4>
                    <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" /> {lab.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentor Desk */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-[#b89428]" />
                Mentor Desk Review
              </h2>
              <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                Submit a trade setup or thesis for 1-on-1 critique from your cohort mentor.
              </p>
              <Link href="/student/journal">
                <Button variant="outline" size="sm" className="w-full border-[#b89428] text-neutral-900 hover:bg-[#b89428] hover:text-black">
                  Submit Trade Setup
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </StudentSidebarLayout>
  )
}
