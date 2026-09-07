'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import {
  TrendingUp,
  TrendingDown,
  Search,
  Star,
  Eye,
  BarChart3,
  Activity,
  Wifi,
  WifiOff,
  Clock,
  Sparkles
} from 'lucide-react'

export interface RealtimeMarketData {
  symbol: string
  displayName: string
  category: 'crypto' | 'stock' | 'forex'
  price: number
  prevPrice?: number
  change24h: number
  changePercent24h: number
  high24h: number
  low24h: number
  volume24h: number
  quoteVolume24h: number
  lastUpdated: number
  priceDirection?: 'up' | 'down' | 'neutral'
}

const BINANCE_SYMBOLS = [
  { symbol: 'BTCUSDT', displayName: 'Bitcoin / USDT', category: 'crypto' as const },
  { symbol: 'ETHUSDT', displayName: 'Ethereum / USDT', category: 'crypto' as const },
  { symbol: 'SOLUSDT', displayName: 'Solana / USDT', category: 'crypto' as const },
  { symbol: 'PAXGUSDT', displayName: 'Gold (PAXG) / USDT', category: 'crypto' as const },
  { symbol: 'BNBUSDT', displayName: 'BNB / USDT', category: 'crypto' as const },
  { symbol: 'XRPUSDT', displayName: 'XRP / USDT', category: 'crypto' as const },
  { symbol: 'ADAUSDT', displayName: 'Cardano / USDT', category: 'crypto' as const },
  { symbol: 'AVAXUSDT', displayName: 'Avalanche / USDT', category: 'crypto' as const },
  { symbol: 'DOGEUSDT', displayName: 'Dogecoin / USDT', category: 'crypto' as const },
  { symbol: 'LINKUSDT', displayName: 'Chainlink / USDT', category: 'crypto' as const },
  { symbol: 'NEARUSDT', displayName: 'NEAR / USDT', category: 'crypto' as const },
  { symbol: 'SUIUSDT', displayName: 'Sui / USDT', category: 'crypto' as const },
]

const MOCK_NON_CRYPTO_MARKETS: RealtimeMarketData[] = [
  {
    symbol: 'EURUSD',
    displayName: 'EUR / USD',
    category: 'forex',
    price: 1.0854,
    change24h: 0.0018,
    changePercent24h: 0.17,
    high24h: 1.0882,
    low24h: 1.0831,
    volume24h: 92400000000,
    quoteVolume24h: 92400000000,
    lastUpdated: Date.now(),
  },
  {
    symbol: 'GBPUSD',
    displayName: 'GBP / USD',
    category: 'forex',
    price: 1.2642,
    change24h: -0.0035,
    changePercent24h: -0.28,
    high24h: 1.2688,
    low24h: 1.2610,
    volume24h: 74200000000,
    quoteVolume24h: 74200000000,
    lastUpdated: Date.now(),
  },
  {
    symbol: 'USDJPY',
    displayName: 'USD / JPY',
    category: 'forex',
    price: 154.25,
    change24h: 0.65,
    changePercent24h: 0.42,
    high24h: 154.80,
    low24h: 153.60,
    volume24h: 81000000000,
    quoteVolume24h: 81000000000,
    lastUpdated: Date.now(),
  },
  {
    symbol: 'AAPL',
    displayName: 'Apple Inc.',
    category: 'stock',
    price: 226.40,
    change24h: 3.15,
    changePercent24h: 1.41,
    high24h: 228.10,
    low24h: 224.20,
    volume24h: 5800000000,
    quoteVolume24h: 5800000000,
    lastUpdated: Date.now(),
  },
  {
    symbol: 'NVDA',
    displayName: 'NVIDIA Corp.',
    category: 'stock',
    price: 128.50,
    change24h: 4.80,
    changePercent24h: 3.88,
    high24h: 130.20,
    low24h: 124.90,
    volume24h: 14200000000,
    quoteVolume24h: 14200000000,
    lastUpdated: Date.now(),
  },
  {
    symbol: 'TSLA',
    displayName: 'Tesla Inc.',
    category: 'stock',
    price: 215.30,
    change24h: -5.40,
    changePercent24h: -2.45,
    high24h: 222.00,
    low24h: 212.80,
    volume24h: 9600000000,
    quoteVolume24h: 9600000000,
    lastUpdated: Date.now(),
  }
]

export default function MarketsPage() {
  const [marketDataMap, setMarketDataMap] = useState<Record<string, RealtimeMarketData>>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'crypto' | 'stock' | 'forex'>('all')
  const [sortBy, setSortBy] = useState<'volume' | 'price' | 'change'>('volume')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [wsConnected, setWsConnected] = useState(false)
  const [lastTickTime, setLastTickTime] = useState<string>('')
  const [starredSymbols, setStarredSymbols] = useState<string[]>([])

  const wsRef = useRef<WebSocket | null>(null)

  // Initialize non-crypto markets into map
  useEffect(() => {
    const initialMap: Record<string, RealtimeMarketData> = {}
    MOCK_NON_CRYPTO_MARKETS.forEach((item) => {
      initialMap[item.symbol] = item
    })
    setMarketDataMap(prev => ({ ...initialMap, ...prev }))
  }, [])

  // 1. Fetch initial snapshot from Binance REST API
  const fetchBinanceRestSnapshot = useCallback(async () => {
    try {
      const res = await fetch('https://api.binance.com/api/v3/ticker/24hr')
      if (!res.ok) return
      const data = await res.json()
      if (!Array.isArray(data)) return

      const allowedSymbolsMap = new Map(BINANCE_SYMBOLS.map(s => [s.symbol, s]))

      setMarketDataMap(prev => {
        const nextMap = { ...prev }
        data.forEach((item: any) => {
          const matched = allowedSymbolsMap.get(item.symbol)
          if (matched) {
            const currentPrice = parseFloat(item.lastPrice)
            const prevPrice = prev[item.symbol]?.price || currentPrice

            nextMap[item.symbol] = {
              symbol: item.symbol,
              displayName: matched.displayName,
              category: 'crypto',
              price: currentPrice,
              prevPrice: prevPrice,
              change24h: parseFloat(item.priceChange),
              changePercent24h: parseFloat(item.priceChangePercent),
              high24h: parseFloat(item.highPrice),
              low24h: parseFloat(item.lowPrice),
              volume24h: parseFloat(item.volume),
              quoteVolume24h: parseFloat(item.quoteVolume),
              lastUpdated: Date.now(),
              priceDirection: currentPrice > prevPrice ? 'up' : currentPrice < prevPrice ? 'down' : 'neutral'
            }
          }
        })
        return nextMap
      })
      setLastTickTime(new Date().toLocaleTimeString())
    } catch (err) {
      console.warn('Binance REST fetch fallback warning:', err)
    }
  }, [])

  // 2. Connect Binance Real-time WebSocket Stream
  useEffect(() => {
    fetchBinanceRestSnapshot()

    const streams = BINANCE_SYMBOLS.map(s => `${s.symbol.toLowerCase()}@ticker`).join('/')
    const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`

    let socket: WebSocket | null = null

    try {
      socket = new WebSocket(wsUrl)
      wsRef.current = socket

      socket.onopen = () => {
        setWsConnected(true)
      }

      socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data)
          const data = payload?.data
          if (!data || !data.s) return

          const symbol = data.s
          const matched = BINANCE_SYMBOLS.find(s => s.symbol === symbol)
          if (!matched) return

          const currentPrice = parseFloat(data.c)
          const priceChange = parseFloat(data.p)
          const priceChangePercent = parseFloat(data.P)
          const highPrice = parseFloat(data.h)
          const lowPrice = parseFloat(data.l)
          const volume = parseFloat(data.v)
          const quoteVolume = parseFloat(data.q)

          setMarketDataMap(prev => {
            const existing = prev[symbol]
            const prevPrice = existing ? existing.price : currentPrice
            const direction = currentPrice > prevPrice ? 'up' : currentPrice < prevPrice ? 'down' : existing?.priceDirection || 'neutral'

            return {
              ...prev,
              [symbol]: {
                symbol,
                displayName: matched.displayName,
                category: 'crypto',
                price: currentPrice,
                prevPrice,
                change24h: priceChange,
                changePercent24h: priceChangePercent,
                high24h: highPrice,
                low24h: lowPrice,
                volume24h: volume,
                quoteVolume24h: quoteVolume,
                lastUpdated: Date.now(),
                priceDirection: direction
              }
            }
          })
          setLastTickTime(new Date().toLocaleTimeString())
        } catch (e) {
          console.error('WebSocket parse error:', e)
        }
      }

      socket.onerror = (err) => {
        console.warn('Binance WebSocket error:', err)
        setWsConnected(false)
      }

      socket.onclose = () => {
        setWsConnected(false)
      }
    } catch (err) {
      console.warn('WebSocket connection init failed:', err)
      setWsConnected(false)
    }

    // Polling interval fallback for REST update every 10s if WS drops
    const restInterval = setInterval(() => {
      fetchBinanceRestSnapshot()
    }, 10000)

    return () => {
      if (socket) socket.close()
      clearInterval(restInterval)
    }
  }, [fetchBinanceRestSnapshot])

  const toggleStar = (symbol: string) => {
    setStarredSymbols(prev =>
      prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]
    )
  }

  // Filter and Sort Markets
  const marketList = Object.values(marketDataMap)

  const filteredMarkets = marketList.filter(market => {
    const matchesSearch =
      market.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || market.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  filteredMarkets.sort((a, b) => {
    let valA = 0
    let valB = 0

    if (sortBy === 'volume') {
      valA = a.quoteVolume24h
      valB = b.quoteVolume24h
    } else if (sortBy === 'price') {
      valA = a.price
      valB = b.price
    } else if (sortBy === 'change') {
      valA = a.changePercent24h
      valB = b.changePercent24h
    }

    return sortOrder === 'asc' ? valA - valB : valB - valA
  })

  const formatCurrency = (val: number, category: string) => {
    if (category === 'forex') return val.toFixed(4)
    if (val < 1) return `$${val.toFixed(4)}`
    if (val > 1000) return `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    return `$${val.toFixed(2)}`
  }

  const formatVolume = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  const categories = [
    { id: 'all', label: 'All Markets' },
    { id: 'crypto', label: 'Cryptocurrency (Binance Live)' },
    { id: 'stock', label: 'Global Equities' },
    { id: 'forex', label: 'Forex Pairs' },
  ]

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Hero & Realtime Status Header */}
      <section className="pt-32 pb-12 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 mb-4 text-xs font-semibold">
                {wsConnected ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Wifi className="w-3.5 h-3.5" /> Binance Live WebSocket Stream Active
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-amber-700 font-bold flex items-center gap-1">
                      <WifiOff className="w-3.5 h-3.5" /> REST Sync Mode (Updating 10s)
                    </span>
                  </>
                )}
                {lastTickTime && <span className="text-neutral-400 font-normal ml-1">· Last tick {lastTickTime}</span>}
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">
                Real-Time <span className="text-[#b89428]">Binance Market Stream</span>
              </h1>
              <p className="text-neutral-600 text-base sm:text-lg mt-2 max-w-2xl">
                Live orderbook tickers and 24-hour volume streams directly connected to Binance WebSockets.
              </p>
            </div>

            {/* Live Stats Summary Pill */}
            <div className="flex items-center gap-4 bg-neutral-50 border border-neutral-200 p-4 rounded-2xl shrink-0">
              <div className="p-3 rounded-xl bg-[#b89428]/10 text-[#b89428]">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Stream Tickers</div>
                <div className="text-xl font-bold text-neutral-900">{filteredMarkets.length} Instruments</div>
              </div>
            </div>
          </div>

          {/* Search Bar & Category Switcher */}
          <div className="space-y-4">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search symbol (e.g. BTC, PAXG, SOL, EUR/USD)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-black placeholder-neutral-400 focus:outline-none focus:border-[#b89428] text-sm font-medium"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#b89428] text-black shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Markets Table / Cards */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Sort Instruments By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-neutral-300 rounded-lg px-3 py-1.5 text-xs font-bold text-neutral-800 focus:outline-none focus:border-[#b89428]"
              >
                <option value="volume">24h Volume</option>
                <option value="price">Price</option>
                <option value="change">24h Change %</option>
              </select>

              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-1.5 rounded-lg bg-white border border-neutral-300 text-xs font-bold text-neutral-800 hover:bg-neutral-100"
              >
                {sortOrder === 'desc' ? 'High → Low ↓' : 'Low → High ↑'}
              </button>
            </div>

            <span className="text-xs font-medium text-neutral-500">
              Showing <strong className="text-neutral-900">{filteredMarkets.length}</strong> active pairs
            </span>
          </div>

          {/* Markets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMarkets.map((market) => {
              const isPositive = market.changePercent24h >= 0
              const isStarred = starredSymbols.includes(market.symbol)

              return (
                <div
                  key={market.symbol}
                  className="bg-white rounded-2xl border border-neutral-200 p-5 hover:border-neutral-400 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-neutral-900 text-lg">{market.symbol}</h3>
                          {market.category === 'crypto' && (
                            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                              Live Binance
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 font-medium">{market.displayName}</p>
                      </div>

                      <button
                        onClick={() => toggleStar(market.symbol)}
                        className="text-neutral-400 hover:text-amber-500 transition-colors p-1"
                      >
                        <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>

                    {/* Price Block with Flash Direction */}
                    <div className="my-4 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                      <div className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider mb-0.5">
                        Current Price
                      </div>

                      <div className="flex items-baseline justify-between">
                        <span
                          className={`text-2xl font-black font-mono transition-colors duration-300 ${
                            market.priceDirection === 'up'
                              ? 'text-emerald-600'
                              : market.priceDirection === 'down'
                              ? 'text-rose-600'
                              : 'text-neutral-900'
                          }`}
                        >
                          {formatCurrency(market.price, market.category)}
                        </span>

                        <div
                          className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                            isPositive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          <span>{isPositive ? '+' : ''}{market.changePercent24h.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Matrix */}
                    <div className="space-y-2 text-xs font-medium text-neutral-600 border-t border-neutral-100 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">24h High:</span>
                        <span className="text-neutral-800 font-mono">{formatCurrency(market.high24h, market.category)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">24h Low:</span>
                        <span className="text-neutral-800 font-mono">{formatCurrency(market.low24h, market.category)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">24h Volume (Quote):</span>
                        <span className="text-neutral-900 font-bold font-mono">{formatVolume(market.quoteVolume24h)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <Link href="/student/journal" className="w-full">
                      <button className="w-full py-2 rounded-xl bg-neutral-100 hover:bg-[#b89428] text-neutral-900 hover:text-black font-semibold text-xs transition-all flex items-center justify-center gap-1.5">
                        <BarChart3 className="w-3.5 h-3.5" /> Log in Journal
                      </button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredMarkets.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200">
              <Search className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-800 font-bold text-lg">No matching markets found</p>
              <p className="text-xs text-neutral-500 mt-1 mb-4">Try clearing your search query or switching categories.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}