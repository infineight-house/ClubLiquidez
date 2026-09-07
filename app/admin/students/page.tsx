'use client'

import React, { useState } from 'react'
import AdminSidebarLayout from '@/components/layout/AdminSidebarLayout'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'
import {
  UserPlus,
  Copy,
  Check,
  Trash2,
  X,
  Save,
  UserCheck
} from 'lucide-react'

export interface StudentAccount {
  id: string
  fullName: string
  email: string
  passwordTemp: string
  cohort: string
  mentor: string
  createdDate: string
  status: 'Active' | 'Suspended'
}

const INITIAL_STUDENTS: StudentAccount[] = [
  {
    id: '1',
    fullName: 'Ananya Rao',
    email: 'ananya.r@gmail.com',
    passwordTemp: 'Trader@2026!',
    cohort: 'Cohort 14 · Gold Focus',
    mentor: 'Arvin R.',
    createdDate: 'Aug 20, 2026',
    status: 'Active'
  },
  {
    id: '2',
    fullName: 'James Miller',
    email: 'james.m@dubai.ae',
    passwordTemp: 'Cohort14Pass!',
    cohort: 'Cohort 14 · Weekend Intensive',
    mentor: 'Sarah K.',
    createdDate: 'Aug 22, 2026',
    status: 'Active'
  }
]

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentAccount[]>(INITIAL_STUDENTS)
  const [isCreating, setIsCreating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    passwordTemp: 'Trader' + Math.floor(1000 + Math.random() * 9000) + '!',
    cohort: 'Cohort 14 · Gold & Bullion Focus',
    mentor: 'Arvin R. (Lead Market Strategist)',
  })

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.passwordTemp.trim()) {
      toast.error('Name, Email, and Temporary Password are required')
      return
    }

    const newStudent: StudentAccount = {
      id: Date.now().toString(),
      ...formData,
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Active'
    }

    setStudents([newStudent, ...students])
    toast.success(`Trader account issued for ${formData.fullName}!`)
    setIsCreating(false)
    setFormData({
      fullName: '',
      email: '',
      passwordTemp: 'Trader' + Math.floor(1000 + Math.random() * 9000) + '!',
      cohort: 'Cohort 14 · Gold & Bullion Focus',
      mentor: 'Arvin R. (Lead Market Strategist)',
    })
  }

  const handleCopyCredentials = (student: StudentAccount) => {
    const text = `Trader Portal Credentials:\nURL: /student/login\nEmail: ${student.email}\nPassword: ${student.passwordTemp}\nCohort: ${student.cohort}`
    navigator.clipboard.writeText(text)
    setCopiedId(student.id)
    toast.success('Login credentials copied!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Revoke credentials for "${name}"?`)) return
    setStudents(students.filter(s => s.id !== id))
    toast.success('Credentials revoked')
  }

  return (
    <AdminSidebarLayout
      title="Trader Credentials & Student Onboarding"
      subtitle="Issue, manage, and provision login credentials for enrolled cohort students."
      actionButton={
        <Button onClick={() => setIsCreating(true)} variant="primary" size="sm" className="bg-[#b89428] text-black font-semibold">
          <UserPlus className="w-4 h-4 mr-1.5" /> Issue Trader Credentials
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Create Student Modal */}
        {isCreating && (
          <div className="p-6 rounded-2xl bg-white border border-[#b89428]/40 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#b89428]" /> Issue Trader Login Credentials
              </h2>
              <button onClick={() => setIsCreating(false)} className="text-neutral-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Trader Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Wei Lin"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#b89428]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Trader Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="wei.lin@singapore.sg"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#b89428]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Issued Password *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.passwordTemp}
                    onChange={(e) => setFormData({ ...formData, passwordTemp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#b89428] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Cohort Assignment
                  </label>
                  <input
                    type="text"
                    value={formData.cohort}
                    onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#b89428]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-5 py-2.5 rounded-full border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <Button variant="primary" size="md" type="submit" className="bg-[#b89428] text-black">
                  <Save className="w-4 h-4 mr-2" /> Provision Account
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Provisioned Students List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-300 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#b89428] tracking-wider px-2 py-0.5 rounded bg-[#b89428]/10 border border-[#b89428]/20">
                      {student.cohort}
                    </span>
                    <h3 className="font-bold text-neutral-900 text-xl mt-2">{student.fullName}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">{student.email}</p>
                  </div>

                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {student.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs font-mono mb-4">
                  <div className="flex items-center justify-between text-neutral-700">
                    <span className="text-neutral-500 font-sans">Issued Password:</span>
                    <span className="text-[#b89428] font-bold">{student.passwordTemp}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-700">
                    <span className="text-neutral-500 font-sans">Assigned Mentor:</span>
                    <span>{student.mentor}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <button
                  onClick={() => handleCopyCredentials(student)}
                  className="px-3.5 py-2 rounded-xl bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 flex items-center gap-1.5 transition-all"
                >
                  {copiedId === student.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === student.id ? 'Copied Credentials' : 'Copy Credentials'}
                </button>

                <button
                  onClick={() => handleDelete(student.id, student.fullName)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Revoke
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminSidebarLayout>
  )
}
