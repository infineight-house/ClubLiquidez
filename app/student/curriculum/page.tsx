'use client'

import React, { useState } from 'react'
import StudentSidebarLayout from '@/components/layout/StudentSidebarLayout'
import { Button } from '@/components/ui/Button'
import {
  BookOpen,
  Download,
  PlayCircle,
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface ResourceItem {
  title: string
  type: string
  fileSize: string
  format: string
}

export default function StudentCurriculumPage() {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'resources'>('syllabus')
  const [expandedModule, setExpandedModule] = useState<number | null>(0)

  const syllabus = [
    {
      id: 0,
      title: 'Module 1: Market Structure & Session Windows',
      status: 'Completed',
      lessons: [
        { title: '1.1 Mapping Asian High/Low Liquidity Ranges', duration: '35 mins', completed: true },
        { title: '1.2 London Open Manipulation & True Direction', duration: '42 mins', completed: true },
        { title: '1.3 NY Session Overlap & Reversal Patterns', duration: '48 mins', completed: true },
        { title: '1.4 Session Map Case Studies on XAU/USD', duration: '50 mins', completed: true }
      ]
    },
    {
      id: 1,
      title: 'Module 2: Liquidity Sweeps & Order Flow Regimes',
      status: 'Completed',
      lessons: [
        { title: '2.1 Identifying Institutional Buy/Sell Stops', duration: '40 mins', completed: true },
        { title: '2.2 Fair Value Gaps & Liquidity Void Returns', duration: '55 mins', completed: true },
        { title: '2.3 Market Structure Shifts (MSS) vs Break of Structure (BOS)', duration: '45 mins', completed: true }
      ]
    },
    {
      id: 2,
      title: 'Module 3: Volatility Regimes & Risk Architecture',
      status: 'In Progress',
      lessons: [
        { title: '3.1 Position Sizing Matrix for Leveraged Metals', duration: '40 mins', completed: true },
        { title: '3.2 Stop Loss Placement relative to ATR & Volatility', duration: '45 mins', completed: true },
        { title: '3.3 Managing Risk during High-Impact News Events', duration: '50 mins', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Module 4: Trade Journaling & Discipline Curve',
      status: 'Upcoming',
      lessons: [
        { title: '4.1 Designing a Repeatable Execution Playbook', duration: '35 mins', completed: false },
        { title: '4.2 Emotional Control & Over-trading Remediation', duration: '40 mins', completed: false }
      ]
    }
  ]

  const resources: ResourceItem[] = [
    {
      title: 'ClubLiquidez Master Session Map & Liquidity Matrix',
      type: 'Cheat Sheet PDF',
      fileSize: '4.2 MB',
      format: 'PDF',
    },
    {
      title: 'XAU/USD Volatility Position Sizing Spreadsheet',
      type: 'Excel Template',
      fileSize: '1.8 MB',
      format: 'XLSX',
    },
    {
      title: 'Risk Architecture & Lot Size Decision Tree',
      type: 'Guide',
      fileSize: '2.5 MB',
      format: 'PDF',
    }
  ]

  return (
    <StudentSidebarLayout
      title="Cohort Curriculum & Resources"
      subtitle="Access cohort lectures, session breakdown videos, and downloadable risk tools."
      actionButton={
        <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-xl border border-neutral-200">
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'syllabus' ? 'bg-[#b89428] text-black' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Curriculum Tracks
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'resources' ? 'bg-[#b89428] text-black' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Resource Vault
          </button>
        </div>
      }
    >
      {/* Tab 1: Syllabus */}
      {activeTab === 'syllabus' && (
        <div className="space-y-4">
          {syllabus.map((mod) => (
            <div
              key={mod.id}
              className="rounded-2xl bg-white border border-neutral-200 overflow-hidden shadow-xs"
            >
              <div
                onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                className="p-6 flex items-center justify-between cursor-pointer hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      mod.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : mod.status === 'In Progress' ? 'bg-[#b89428]/10 text-[#b89428] border border-[#b89428]/30' : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {mod.status}
                  </span>
                  <h3 className="font-bold text-neutral-900 text-base sm:text-lg">{mod.title}</h3>
                </div>

                {expandedModule === mod.id ? (
                  <ChevronUp className="w-5 h-5 text-neutral-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-400" />
                )}
              </div>

              {expandedModule === mod.id && (
                <div className="p-6 pt-0 border-t border-neutral-100 bg-neutral-50/50 space-y-3">
                  {mod.lessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-neutral-200 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <PlayCircle className="w-5 h-5 text-[#b89428] shrink-0" />
                        )}
                        <span className="text-sm font-medium text-neutral-800">{lesson.title}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-neutral-400 hidden sm:inline">{lesson.duration}</span>
                        <button
                          onClick={() => alert(`Starting video lecture: ${lesson.title}`)}
                          className="px-3.5 py-1 text-xs font-semibold rounded-lg bg-neutral-100 text-neutral-800 hover:bg-[#b89428] hover:text-black transition-all"
                        >
                          Watch
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Resource Vault */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((res, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-neutral-200 flex flex-col justify-between shadow-xs">
              <div>
                <div className="p-3 rounded-xl bg-[#b89428]/10 text-[#b89428] w-fit mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-neutral-900 text-base mb-1">{res.title}</h3>
                <p className="text-xs text-neutral-500 mb-4">{res.type} • {res.fileSize}</p>
              </div>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert(`Downloading ${res.title}`) }}
                className="w-full py-2.5 rounded-xl bg-[#b89428] text-black hover:bg-[#c5a028] font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download ({res.format})
              </a>
            </div>
          ))}
        </div>
      )}
    </StudentSidebarLayout>
  )
}
