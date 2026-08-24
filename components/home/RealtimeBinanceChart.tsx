'use client'

import React, { useEffect, useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, Wifi, WifiOff, RefreshCw, BarChart2, Activity } from 'lucide-react'

export interface KlineData {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  isFinal?: boolean
}

export interface SymbolOption {
  symbol: string
  label: string
  name: string
  displayName: string
  icon: string
  decimals: number
}

const SYMBOLS: SymbolOption[] = [
  { symbol: 'PAXGUSDT', label: 'PAXG/USDT', name: 'Gold (Bullion Token)', displayName: 'XAU/USD (Gold)', icon: '✨', decimals: 2 },
  { symbol: 'BTCUSDT', label: 'BTC/USDT', name: 'Bitcoin', displayName: 'BTC/USD', icon: '₿', decimals: 2 },

]

const TIMEFRAMES = [
  { label: '1m', value: '1m' },
  { label: '5m', value: '5m' },
  { label: '15m', value: '15m' },
  { label: '1h', value: '1h' },
]

type ChartMode = 'candles' | 'area'

export default function RealtimeBinanceChart() {
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolOption>(SYMBOLS[0])
  const [selectedInterval, setSelectedInterval] = useState<string>('1m')
  const [chartMode, setChartMode] = useState<ChartMode>('candles')

  const [klines, setKlines] = useState<KlineData[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [priceChangeState, setPriceChangeState] = useState<'up' | 'down' | 'neutral'>('neutral')
  const [priceChange24h, setPriceChange24h] = useState<number>(0)
  const [hoveredCandle, setHoveredCandle] = useState<KlineData | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const wsRef = useRef<WebSocket | null>(null)
  const prevPriceRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentPrice = useMemo(() => {
    if (klines.length === 0) return 0
    return klines[klines.length - 1].close
  }, [klines])

  // Format price helper
  const formatPrice = (val: number, decimals: number = selectedSymbol.decimals) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(val)
  }

  // Initial historical data fetch
  const fetchHistoricalData = async (symbol: string, interval: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=40`
      )
      if (!res.ok) throw new Error('Failed REST fetch')
      const data = await res.json()

      const parsed: KlineData[] = data.map((d: (string | number)[]) => ({
        time: Number(d[0]),
        open: parseFloat(d[1] as string),
        high: parseFloat(d[2] as string),
        low: parseFloat(d[3] as string),
        close: parseFloat(d[4] as string),
        volume: parseFloat(d[5] as string),
        isFinal: true,
      }))

      setKlines(parsed)

      // Calculate 24h % change approximation from fetched bars if available
      if (parsed.length > 1) {
        const first = parsed[0].open
        const last = parsed[parsed.length - 1].close
        setPriceChange24h(((last - first) / first) * 100)
      }
    } catch (err) {
      console.warn('Binance REST fetch fallback to mock initialization:', err)
      // Generate synthetic initial candles if REST endpoint is unreachable
      const basePrice = symbol === 'PAXGUSDT' ? 2650 : symbol === 'BTCUSDT' ? 95000 : symbol === 'ETHUSDT' ? 2700 : 190
      const now = Date.now()
      const intervalMs = interval === '1m' ? 60000 : interval === '5m' ? 300000 : 900000
      const mock: KlineData[] = []
      let p = basePrice
      for (let i = 39; i >= 0; i--) {
        const variation = (Math.random() - 0.49) * (basePrice * 0.003)
        const open = p
        const close = p + variation
        const high = Math.max(open, close) + Math.random() * (basePrice * 0.001)
        const low = Math.min(open, close) - Math.random() * (basePrice * 0.001)
        const volume = Math.random() * 50 + 10
        mock.push({
          time: now - i * intervalMs,
          open,
          high,
          low,
          close,
          volume,
          isFinal: true,
        })
        p = close
      }
      setKlines(mock)
      setPriceChange24h(0.45)
    } finally {
      setIsLoading(false)
    }
  }

  // Connect WebSocket
  useEffect(() => {
    let isSubscribed = true
    fetchHistoricalData(selectedSymbol.symbol, selectedInterval)

    const wsUrl = `wss://stream.binance.com:9443/ws/${selectedSymbol.symbol.toLowerCase()}@kline_${selectedInterval}`
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      if (isSubscribed) setIsConnected(true)
    }

    ws.onmessage = (event) => {
      if (!isSubscribed) return
      try {
        const msg = JSON.parse(event.data)
        if (msg.e === 'kline') {
          const k = msg.k
          const candle: KlineData = {
            time: k.t,
            open: parseFloat(k.o),
            high: parseFloat(k.h),
            low: parseFloat(k.l),
            close: parseFloat(k.c),
            volume: parseFloat(k.v),
            isFinal: k.x,
          }

          // Price direction tick animation trigger
          if (prevPriceRef.current !== null) {
            if (candle.close > prevPriceRef.current) {
              setPriceChangeState('up')
            } else if (candle.close < prevPriceRef.current) {
              setPriceChangeState('down')
            }
            setTimeout(() => setPriceChangeState('neutral'), 600)
          }
          prevPriceRef.current = candle.close

          setKlines((prev) => {
            if (prev.length === 0) return [candle]
            const last = prev[prev.length - 1]
            if (last.time === candle.time) {
              // Update current candle
              const updated = [...prev]
              updated[updated.length - 1] = candle
              return updated
            } else if (candle.time > last.time) {
              // Append new candle, maintain max 45 candles
              const updated = [...prev, candle]
              if (updated.length > 45) updated.shift()
              return updated
            }
            return prev
          })
        }
      } catch (e) {
        console.error('Error parsing Binance WS message:', e)
      }
    }

    ws.onerror = () => {
      if (isSubscribed) setIsConnected(false)
    }

    ws.onclose = () => {
      if (isSubscribed) setIsConnected(false)
    }

    return () => {
      isSubscribed = false
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [selectedSymbol, selectedInterval])

  // Calculation for SVG Rendering
  const { minPrice, maxPrice, priceRange, maxVol } = useMemo(() => {
    if (klines.length === 0) return { minPrice: 0, maxPrice: 100, priceRange: 100, maxVol: 100 }
    let minP = Infinity
    let maxP = -Infinity
    let maxV = 0
    klines.forEach((c) => {
      if (c.low < minP) minP = c.low
      if (c.high > maxP) maxP = c.high
      if (c.volume > maxV) maxV = c.volume
    })
    // Add small padding to top and bottom
    const padding = (maxP - minP) * 0.08 || minP * 0.01
    return {
      minPrice: minP - padding,
      maxPrice: maxP + padding,
      priceRange: maxP + padding - (minP - padding),
      maxVol: maxV || 1,
    }
  }, [klines])

  // Active display data (either hovered candle or latest candle)
  const activeCandle = hoveredCandle || (klines.length > 0 ? klines[klines.length - 1] : null)

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[26rem] sm:h-[26rem] rounded-2xl border border-neutral-200 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xl flex flex-col justify-between"
    >
      {/* Top Header Controls & Live Ticker */}
      <div className="p-4 sm:p-5 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm z-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

          {/* Symbol Selector & Info */}
          <div className="flex items-center gap-3">
            <div className="flex bg-neutral-200/70 dark:bg-neutral-800 p-1 rounded-xl">
              {SYMBOLS.map((s) => (
                <button
                  key={s.symbol}
                  onClick={() => setSelectedSymbol(s)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${selectedSymbol.symbol === s.symbol
                      ? 'bg-white dark:bg-neutral-700 text-black dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                >
                  <span className="mr-1">{s.icon}</span>
                  {s.label.split('/')[0]}
                </button>
              ))}
            </div>

            {/* Connection Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
              {isConnected ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Binance WS</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin text-amber-500" />
                  <span className="text-amber-600 dark:text-amber-400">Connecting...</span>
                </>
              )}
            </div>
          </div>

          {/* Timeframe & View Mode Switcher */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Timeframe */}
            <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg border border-neutral-200 dark:border-neutral-700">
              {TIMEFRAMES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setSelectedInterval(t.value)}
                  className={`px-2 py-0.5 text-[11px] font-semibold rounded transition-all ${selectedInterval === t.value
                      ? 'bg-brand-gold text-black shadow-xs font-bold'
                      : 'text-neutral-500 hover:text-black dark:hover:text-white'
                    }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Mode Switcher (Candles vs Area) */}
            <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => setChartMode('candles')}
                title="Candlesticks View"
                className={`p-1 rounded transition-all ${chartMode === 'candles'
                    ? 'bg-white dark:bg-neutral-700 text-black dark:text-white shadow-xs'
                    : 'text-neutral-400 hover:text-black'
                  }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setChartMode('area')}
                title="Area Line View"
                className={`p-1 rounded transition-all ${chartMode === 'area'
                    ? 'bg-white dark:bg-neutral-700 text-black dark:text-white shadow-xs'
                    : 'text-neutral-400 hover:text-black'
                  }`}
              >
                <Activity className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Live Price Display & 24h Metrics */}
        <div className="flex items-baseline justify-between mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 font-medium tracking-wide uppercase">
                {selectedSymbol.displayName}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-medium">
                SPOT
              </span>
            </div>

            <div className="flex items-baseline gap-3 mt-0.5">
              <span
                className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors duration-300 ${priceChangeState === 'up'
                    ? 'text-emerald-500 scale-105'
                    : priceChangeState === 'down'
                      ? 'text-rose-500 scale-105'
                      : 'text-black dark:text-white'
                  }`}
              >
                ${formatPrice(currentPrice)}
              </span>

              <span
                className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${priceChange24h >= 0
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                  }`}
              >
                {priceChange24h >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {priceChange24h >= 0 ? '+' : ''}
                {priceChange24h.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* OHLC Tooltip summary */}
          {activeCandle && (
            <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono bg-neutral-100/70 dark:bg-neutral-800/70 px-3 py-1.5 rounded-lg border border-neutral-200/50 dark:border-neutral-700/50">
              <div>
                <span className="text-neutral-400">O: </span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {formatPrice(activeCandle.open)}
                </span>
              </div>
              <div>
                <span className="text-neutral-400">H: </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {formatPrice(activeCandle.high)}
                </span>
              </div>
              <div>
                <span className="text-neutral-400">L: </span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">
                  {formatPrice(activeCandle.low)}
                </span>
              </div>
              <div>
                <span className="text-neutral-400">C: </span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {formatPrice(activeCandle.close)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SVG Interactive Chart Body */}
      <div className="relative flex-1 w-full px-2 pt-2 pb-1 bg-gradient-to-b from-transparent via-neutral-50/30 to-neutral-100/20 dark:via-neutral-900/30 dark:to-neutral-950/20">
        {isLoading && klines.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-neutral-900/80 z-20">
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="w-6 h-6 text-brand-gold animate-spin" />
              <span className="text-xs text-neutral-500 font-medium">Fetching real-time market data...</span>
            </div>
          </div>
        ) : null}

        {/* SVG Render Canvas */}
        <div className="relative w-full h-full">
          <svg
            className="w-full h-full overflow-visible"
            onMouseLeave={() => {
              setHoveredCandle(null)
              setHoverIndex(null)
            }}
          >
            <defs>
              <linearGradient id="areaGradientGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b89428" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#b89428" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="areaGradientGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="areaGradientRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Price Grid Horizontal Lines */}
            {[0.2, 0.5, 0.8].map((ratio, idx) => {
              const yVal = ratio * 100
              const priceAtY = maxPrice - ratio * priceRange
              return (
                <g key={idx}>
                  <line
                    x1="0"
                    y1={`${yVal}%`}
                    x2="100%"
                    y2={`${yVal}%`}
                    stroke="currentColor"
                    className="text-neutral-200 dark:text-neutral-800"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x="99%"
                    y={`${yVal}%`}
                    dy="-4"
                    textAnchor="end"
                    className="fill-neutral-400 dark:fill-neutral-500 font-mono text-[9px]"
                  >
                    {formatPrice(priceAtY)}
                  </text>
                </g>
              )
            })}

            {/* CHART RENDER MODE: CANDLES */}
            {chartMode === 'candles' && (
              <g>
                {klines.map((c, i) => {
                  const totalBars = klines.length
                  const xStep = 100 / totalBars
                  const xCenter = (i + 0.5) * xStep
                  const barWidthPercent = Math.max(0.8, xStep * 0.65)

                  // Map y positions (0 is top, 100 is bottom)
                  const yHigh = ((maxPrice - c.high) / priceRange) * 80 + 5 // leave 20% room at bottom for volume
                  const yLow = ((maxPrice - c.low) / priceRange) * 80 + 5
                  const yOpen = ((maxPrice - c.open) / priceRange) * 80 + 5
                  const yClose = ((maxPrice - c.close) / priceRange) * 80 + 5

                  const isBullish = c.close >= c.open
                  const candleColor = isBullish ? '#10b981' : '#f43f5e'
                  const bodyTop = Math.min(yOpen, yClose)
                  const bodyHeight = Math.max(1, Math.abs(yOpen - yClose))

                  // Volume bar height (0 to 18% of SVG height at bottom)
                  const volHeight = (c.volume / maxVol) * 16

                  return (
                    <g
                      key={c.time + '-' + i}
                      onMouseEnter={() => {
                        setHoveredCandle(c)
                        setHoverIndex(i)
                      }}
                      className="cursor-pointer group"
                    >
                      {/* Hover highlight bar */}
                      {hoverIndex === i && (
                        <rect
                          x={`${i * xStep}%`}
                          y="0"
                          width={`${xStep}%`}
                          height="100%"
                          fill="currentColor"
                          className="text-neutral-200/40 dark:text-neutral-700/30"
                        />
                      )}

                      {/* Volume Bar at Bottom */}
                      <rect
                        x={`${xCenter - barWidthPercent / 2}%`}
                        y={`${96 - volHeight}%`}
                        width={`${barWidthPercent}%`}
                        height={`${volHeight}%`}
                        fill={candleColor}
                        opacity={hoverIndex === i ? 0.6 : 0.25}
                        rx="1"
                      />

                      {/* Wick Line */}
                      <line
                        x1={`${xCenter}%`}
                        y1={`${yHigh}%`}
                        x2={`${xCenter}%`}
                        y2={`${yLow}%`}
                        stroke={candleColor}
                        strokeWidth="1.5"
                      />

                      {/* Candle Body */}
                      <rect
                        x={`${xCenter - barWidthPercent / 2}%`}
                        y={`${bodyTop}%`}
                        width={`${barWidthPercent}%`}
                        height={`${bodyHeight}%`}
                        fill={candleColor}
                        rx="1"
                        className="transition-all duration-150"
                      />
                    </g>
                  )
                })}
              </g>
            )}

            {/* CHART RENDER MODE: AREA */}
            {chartMode === 'area' && klines.length > 1 && (
              <g>
                {(() => {
                  const totalBars = klines.length
                  const xStep = 100 / (totalBars - 1)

                  const points = klines.map((c, i) => {
                    const x = i * xStep
                    const y = ((maxPrice - c.close) / priceRange) * 80 + 5
                    return { x, y, c }
                  })

                  const pathD = points.reduce((acc, pt, i) => {
                    return i === 0 ? `M ${pt.x}% ${pt.y}%` : `${acc} L ${pt.x}% ${pt.y}%`
                  }, '')

                  const areaD = `${pathD} L 100% 96% L 0% 96% Z`
                  const isOverallBullish = klines[klines.length - 1].close >= klines[0].open
                  const strokeColor = isOverallBullish ? '#b89428' : '#f43f5e'
                  const gradientId = isOverallBullish ? 'url(#areaGradientGold)' : 'url(#areaGradientRed)'

                  return (
                    <>
                      {/* Area Fill */}
                      <path d={areaD} fill={gradientId} />

                      {/* Line Path */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Hover Points & Interactive Column */}
                      {points.map((pt, i) => (
                        <g
                          key={i}
                          onMouseEnter={() => {
                            setHoveredCandle(pt.c)
                            setHoverIndex(i)
                          }}
                          className="cursor-pointer"
                        >
                          <rect
                            x={`${i * xStep - xStep / 2}%`}
                            y="0"
                            width={`${xStep}%`}
                            height="100%"
                            fill="transparent"
                          />

                          {hoverIndex === i && (
                            <>
                              <line
                                x1={`${pt.x}%`}
                                y1="0"
                                x2={`${pt.x}%`}
                                y2="96%"
                                stroke={strokeColor}
                                strokeDasharray="3 3"
                                strokeWidth="1"
                              />
                              <circle
                                cx={`${pt.x}%`}
                                cy={`${pt.y}%`}
                                r="5"
                                fill={strokeColor}
                                stroke="#fff"
                                strokeWidth="2"
                              />
                            </>
                          )}
                        </g>
                      ))}
                    </>
                  )
                })()}
              </g>
            )}

            {/* Current Price Horizontal Indicator Line */}
            {klines.length > 0 && (
              <g>
                {(() => {
                  const lastClose = klines[klines.length - 1].close
                  const yLast = ((maxPrice - lastClose) / priceRange) * 80 + 5
                  return (
                    <>
                      <line
                        x1="0"
                        y1={`${yLast}%`}
                        x2="100%"
                        y2={`${yLast}%`}
                        stroke="#b89428"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        className="opacity-70 animate-pulse"
                      />
                      <circle
                        cx="100%"
                        cy={`${yLast}%`}
                        r="4"
                        fill="#b89428"
                        className="animate-ping opacity-75"
                      />
                    </>
                  )
                })()}
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Footer Educational / Live Context Strip */}
      <div className="p-3 px-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 z-10 flex items-center justify-between gap-2">
        <p className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5 truncate">
          <span className="w-2 h-2 rounded-full bg-[#b89428] shrink-0" />
          <span className="font-semibold text-black dark:text-white shrink-0">Session Lab:</span>
          <span className="truncate">Live Binance feed • Observe spread, volume & liquidity sweeps.</span>
        </p>

        <div className="hidden sm:flex items-center gap-2 text-[10px] text-neutral-500 font-mono shrink-0">
          <span>Ticks: {klines.length} bars</span>
        </div>
      </div>
    </div>
  )
}
