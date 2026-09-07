'use client'

import React, { useState } from 'react'
import StudentSidebarLayout from '@/components/layout/StudentSidebarLayout'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'
import {
  FileText,
  Plus,
  Save,
  X,
  MessageSquare
} from 'lucide-react'

export interface TradeEntry {
  id: string
  pair: string
  direction: 'LONG' | 'SHORT'
  lotSize: number
  entryPrice: number
  exitPrice: number
  pnl: number
  riskReward: string
  thesis: string
  chartUrl?: string
  status: 'Reviewed' | 'Pending Review'
  mentorNote?: string
  date: string
}

const INITIAL_TRADES: TradeEntry[] = [
  {
    id: '1',
    pair: 'XAU/USD (Gold)',
    direction: 'LONG',
    lotSize: 0.5,
    entryPrice: 2642.50,
    exitPrice: 2658.00,
    pnl: 775.00,
    riskReward: '1:3.1',
    thesis: 'London open liquidity sweep below 2640 Asia low followed by bullish market structure shift on 5m timeframe.',
    chartUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    status: 'Reviewed',
    mentorNote: 'Excellent execution on the liquidity sweep. Good patience waiting for 5m structure shift before entry.',
    date: 'Aug 24, 2026'
  },
  {
    id: '2',
    pair: 'XAU/USD (Gold)',
    direction: 'SHORT',
    lotSize: 0.25,
    entryPrice: 2665.20,
    exitPrice: 2660.10,
    pnl: 127.50,
    riskReward: '1:1.8',
    thesis: 'NY overlap session high rejection near key daily resistance level.',
    status: 'Pending Review',
    date: 'Aug 25, 2026'
  }
]

export default function StudentJournalPage() {
  const [trades, setTrades] = useState<TradeEntry[]>(INITIAL_TRADES)
  const [isAdding, setIsAdding] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    pair: 'XAU/USD (Gold)',
    direction: 'LONG' as 'LONG' | 'SHORT',
    lotSize: 0.5,
    entryPrice: 0,
    exitPrice: 0,
    pnl: 0,
    riskReward: '1:2',
    thesis: '',
    chartUrl: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.thesis.trim()) {
      toast.error('Please describe your setup thesis')
      return
    }

    setSaving(true)
    setTimeout(() => {
      const newTrade: TradeEntry = {
        id: Date.now().toString(),
        ...formData,
        status: 'Pending Review',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      }
      setTrades([newTrade, ...trades])
      toast.success('Execution logged for mentor critique!')
      setIsAdding(false)
      setSaving(false)
      setFormData({
        pair: 'XAU/USD (Gold)',
        direction: 'LONG',
        lotSize: 0.5,
        entryPrice: 0,
        exitPrice: 0,
        pnl: 0,
        riskReward: '1:2',
        thesis: '',
        chartUrl: ''
      })
    }, 350)
  }

  return (
    <StudentSidebarLayout
      title="Execution Journal & Remediation Log"
      subtitle="Log your market setups, lot sizing, and theses for 1-on-1 mentor feedback."
      actionButton={
        <Button onClick={() => setIsAdding(true)} variant="primary" size="sm" className="bg-[#b89428] text-black font-semibold">
          <Plus className="w-4 h-4 mr-1.5" /> Log Execution
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Trade Form Drawer */}
        {isAdding && (
          <div className="p-6 rounded-2xl bg-white border border-[#b89428]/40 shadow-md">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#b89428]" /> Log Trade Execution
              </h2>
              <button onClick={() => setIsAdding(false)} className="text-neutral-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Market Pair
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pair}
                    onChange={(e) => setFormData({ ...formData, pair: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#b89428]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Direction
                  </label>
                  <select
                    value={formData.direction}
                    onChange={(e) => setFormData({ ...formData, direction: e.target.value as 'LONG' | 'SHORT' })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#b89428]"
                  >
                    <option value="LONG">LONG (Buy)</option>
                    <option value="SHORT">SHORT (Sell)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Lot Size
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.lotSize}
                    onChange={(e) => setFormData({ ...formData, lotSize: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#b89428]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Net P&L ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.pnl}
                    onChange={(e) => setFormData({ ...formData, pnl: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#b89428]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Setup Thesis & Rules Followed *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe session window, liquidity sweep, key levels, and risk rationale..."
                  value={formData.thesis}
                  onChange={(e) => setFormData({ ...formData, thesis: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#b89428]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-5 py-2.5 rounded-full border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <Button variant="primary" size="md" type="submit" disabled={saving} className="bg-[#b89428] text-black">
                  <Save className="w-4 h-4 mr-2" /> {saving ? 'Logging...' : 'Submit Execution'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Trade Entries */}
        <div className="space-y-4">
          {trades.map((trade) => (
            <div
              key={trade.id}
              className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs hover:border-neutral-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      trade.direction === 'LONG' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {trade.direction}
                  </span>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-base sm:text-lg">{trade.pair}</h3>
                    <p className="text-xs text-neutral-500">{trade.date} • Lot Size: {trade.lotSize}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-neutral-500 font-medium">Net P&L</span>
                    <p className={`text-base font-bold ${trade.pnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {trade.pnl >= 0 ? `+$${trade.pnl.toFixed(2)}` : `-$${Math.abs(trade.pnl).toFixed(2)}`}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      trade.status === 'Reviewed' ? 'bg-[#b89428]/10 text-[#b89428] border border-[#b89428]/30' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {trade.status}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">Execution Thesis</h4>
                <p className="text-sm text-neutral-700 leading-relaxed">{trade.thesis}</p>
              </div>

              {trade.mentorNote && (
                <div className="mt-4 p-4 rounded-xl bg-[#b89428]/5 border border-[#b89428]/20 flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-[#b89428] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#b89428] uppercase tracking-wider">Mentor Desk Critique</span>
                    <p className="text-xs text-neutral-800 mt-1 leading-relaxed">{trade.mentorNote}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </StudentSidebarLayout>
  )
}
