'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { 
  Calculator, 
  BarChart3, 
  Bell, 
  TrendingUp, 
  DollarSign,
  Percent,
  Target,
  Zap,
  Settings,
  Play,
  Pause,
  Square,
  Loader2,
  AlertCircle
} from 'lucide-react'

const TradingToolsPage = () => {
  const [calculatorType, setCalculatorType] = useState<'position' | 'risk' | 'profit'>('position')
  const [positionSize, setPositionSize] = useState('1')
  const [entryPrice, setEntryPrice] = useState('100')
  const [stopLoss, setStopLoss] = useState('1')
  const [takeProfit, setTakeProfit] = useState('110')
  const [riskPercentage, setRiskPercentage] = useState('1')
  const [accountSize, setAccountSize] = useState('100000')
  const [selectedCurrencyPair, setSelectedCurrencyPair] = useState('EUR/USD')
  const [amountCurrency, setAmountCurrency] = useState('USD')

  // Currency pairs and currencies data
  const currencyPairs = [
    'AUD/CAD', 'AUD/CHF', 'AUD/JPY', 'AUD/NZD', 'AUD/USD',
    'BTC/USD',
    'CAD/CHF', 'CAD/JPY',
    'CHF/JPY',
    'EUR/AUD', 'EUR/CAD', 'EUR/CHF', 'EUR/GBP', 'EUR/JPY', 'EUR/NZD', 'EUR/USD',
    'GBP/AUD', 'GBP/CAD', 'GBP/CHF', 'GBP/JPY', 'GBP/NZD', 'GBP/USD',
    'NZD/CAD', 'NZD/CHF', 'NZD/JPY', 'NZD/USD',
    'USD/CAD', 'USD/CHF', 'USD/JPY',
    'XAU/USD'
  ]

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD', 'NZD', 'BTC', 'ETH']

  // Real-time calculation state
  const [isCalculating, setIsCalculating] = useState(false)
  
  // Exchange rate state for hybrid model
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [isLoadingRate, setIsLoadingRate] = useState(false)
  const [rateError, setRateError] = useState<string | null>(null)
  const [rateLastUpdated, setRateLastUpdated] = useState<Date | null>(null)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Extract quote currency from currency pair
  const getQuoteCurrency = (pair: string): string => {
    const parts = pair.split('/')
    if (parts.length === 2) {
      return parts[1] // Quote currency is after the slash
    }
    // Handle special cases
    if (pair.includes('XAU')) return 'USD'
    if (pair.includes('BTC')) return 'USD'
    return 'USD' // Default fallback
  }

  // Fetch real-time exchange rate
  const fetchExchangeRate = async (fromCurrency: string, toCurrency: string): Promise<number | null> => {
    // Skip if currencies are the same
    if (fromCurrency === toCurrency) return 1

    // Skip for crypto/commodities - use approximate rates
    if (['BTC', 'ETH', 'XAU'].includes(fromCurrency) || ['BTC', 'ETH', 'XAU'].includes(toCurrency)) {
      return null // Will use approximate calculation
    }

    try {
      setIsLoadingRate(true)
      setRateError(null)

      // Use exchangerate-api.com free endpoint (no API key required for basic usage)
      // Alternative: You can use fixer.io, exchangerate-api.io, or any other free Forex API
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate')
      }

      const data = await response.json()
      const rate = data.rates[toCurrency]

      if (!rate) {
        throw new Error(`Exchange rate not found for ${toCurrency}`)
      }

      setExchangeRate(rate)
      setRateLastUpdated(new Date())
      setIsLoadingRate(false)
      return rate
    } catch (error) {
      console.error('Error fetching exchange rate:', error)
      setRateError('Unable to fetch real-time rate. Using approximate calculation.')
      setIsLoadingRate(false)
      return null // Fallback to approximate
    }
  }

  // Effect to fetch exchange rate when currency conversion is needed
  useEffect(() => {
    const quoteCurrency = getQuoteCurrency(selectedCurrencyPair)
    
    // Only fetch if account currency differs from quote currency
    if (amountCurrency !== quoteCurrency) {
      // Debounce the API call
      const timer = setTimeout(() => {
        fetchExchangeRate(amountCurrency, quoteCurrency)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      // Reset exchange rate when no conversion needed
      setExchangeRate(null)
      setRateError(null)
    }
  }, [selectedCurrencyPair, amountCurrency])

  // Effect to update default trade size based on currency pair
  useEffect(() => {
    if (selectedCurrencyPair === 'XAU/USD') {
      setPositionSize('0.001')
    } else {
      setPositionSize('1')
    }
  }, [selectedCurrencyPair])

  // Real-time calculation effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (parseFloat(accountSize) > 0 && parseFloat(riskPercentage) > 0 && parseFloat(stopLoss) > 0) {
        setIsCalculating(true)
        // Small delay to show calculation animation
        setTimeout(() => setIsCalculating(false), 300)
      }
    }, 100) // Debounce for 100ms

    return () => clearTimeout(timer)
  }, [accountSize, riskPercentage, stopLoss, selectedCurrencyPair, amountCurrency, exchangeRate])

  // Calculate position sizing based on risk and stop loss in pips
  const calculatePosition = () => {
    const risk = parseFloat(riskPercentage) / 100
    const account = parseFloat(accountSize)
    const stopLossPips = parseFloat(stopLoss)
    const quoteCurrency = getQuoteCurrency(selectedCurrencyPair)

    // HYBRID MODEL: Convert account size using real-time exchange rate if needed
    let convertedAccount = account
    let conversionInfo = ''

    if (amountCurrency !== quoteCurrency && exchangeRate !== null) {
      // Use real-time exchange rate for conversion
      convertedAccount = account * exchangeRate
      conversionInfo = ` (${account.toLocaleString()} ${amountCurrency} × ${exchangeRate.toFixed(4)} = ${convertedAccount.toFixed(2)} ${quoteCurrency})`
    } else if (amountCurrency !== quoteCurrency) {
      // Fallback: Use approximate calculation (no real-time rate available)
      // For approximate, we'll still use the account size but note it's not converted
      conversionInfo = ' (approximate - real-time rate unavailable)'
    }

    // Calculate risk amount in quote currency
    const riskAmount = convertedAccount * risk

    // Pip value calculation
    // For most major pairs: 1 pip = $10 per standard lot (100,000 units)
    // For JPY pairs: 1 pip = $9.09 per standard lot (approximately)
    // For XAU/USD: 1 pip = $0.01 per oz, so for 100 oz (1 standard lot) = $1.00
    // For BTC/USD: Use approximate calculation
    const isJPYPair = selectedCurrencyPair.includes('JPY')
    const isXAU = selectedCurrencyPair.includes('XAU')
    const isBTC = selectedCurrencyPair.includes('BTC')
    
    let pipValuePerStandardLot = 10.0
    if (isJPYPair) {
      pipValuePerStandardLot = 9.09
    } else if (isXAU) {
      // For XAU/USD: 1 pip = $0.01 per oz
      // 1 standard lot = 100 oz, so 1 pip = $1.00 per standard lot
      pipValuePerStandardLot = 1.0
    } else if (isBTC) {
      pipValuePerStandardLot = 10.0 // Approximate for BTC
    }

    // Calculate position size in units
    let positionSizeInUnits = 0
    
    if (isXAU) {
      // For XAU/USD: Calculate directly in oz
      // Risk Amount = Position Size (oz) * Stop Loss Pips * $0.01 per pip per oz
      // Position Size (oz) = Risk Amount / (Stop Loss Pips * $0.01)
      // Since 1 pip = $0.01 per oz
      positionSizeInUnits = riskAmount / (stopLossPips * 0.01)
    } else {
      // For forex pairs: Use standard lot calculation
      // Risk Amount = Position Size (in standard lots) * Stop Loss Pips * Pip Value
      // Position Size (standard lots) = Risk Amount / (Stop Loss Pips * Pip Value)
      const positionSizeInStandardLots = riskAmount / (stopLossPips * pipValuePerStandardLot)
      
      // Adjust standard lot size for different instruments
      let standardLotSize = 100000
      if (isBTC) {
        standardLotSize = 1 // BTC standard lot is 1 BTC
      }
      
      positionSizeInUnits = positionSizeInStandardLots * standardLotSize
    }

    // Calculate lot sizes (adjust for different instruments)
    let standardLot = 100000
    let miniLot = 10000
    let microLot = 1000
    
    if (isXAU) {
      standardLot = 100 // Gold: 100 oz = 1 standard lot
      miniLot = 10 // 10 oz = 1 mini lot
      microLot = 1 // 1 oz = 1 micro lot
    } else if (isBTC) {
      standardLot = 1 // BTC: 1 BTC = 1 standard lot
      miniLot = 0.1 // 0.1 BTC = 1 mini lot
      microLot = 0.01 // 0.01 BTC = 1 micro lot
    }

    const standardLots = positionSizeInUnits / standardLot
    const miniLots = positionSizeInUnits / miniLot
    const microLots = positionSizeInUnits / microLot

    // Determine the most appropriate lot size display
    let lotSizeDisplay = ''
    let lotType = ''
    
    if (isXAU) {
      // For gold, show lot size (standard, mini, or micro lots)
      if (standardLots >= 1) {
        lotSizeDisplay = standardLots.toFixed(3)
        lotType = 'Standard Lots'
      } else if (miniLots >= 1) {
        lotSizeDisplay = miniLots.toFixed(3)
        lotType = 'Mini Lots'
      } else {
        lotSizeDisplay = microLots.toFixed(3)
        lotType = 'Micro Lots'
      }
    } else if (isBTC) {
      // For BTC, show in BTC
      lotSizeDisplay = positionSizeInUnits.toFixed(4)
      lotType = 'BTC'
    } else if (standardLots >= 1) {
      lotSizeDisplay = standardLots.toFixed(2)
      lotType = 'Standard Lots'
    } else if (miniLots >= 1) {
      lotSizeDisplay = miniLots.toFixed(2)
      lotType = 'Mini Lots'
    } else {
      lotSizeDisplay = microLots.toFixed(2)
      lotType = 'Micro Lots'
    }

    return {
      positionSize: Math.round(positionSizeInUnits).toLocaleString(),
      riskAmount: riskAmount.toFixed(2),
      lotSize: lotSizeDisplay,
      lotType: lotType,
      standardLots: standardLots.toFixed(3),
      miniLots: miniLots.toFixed(3),
      microLots: microLots.toFixed(3),
      conversionInfo,
      usingRealTimeRate: exchangeRate !== null && amountCurrency !== quoteCurrency
    }
  }

  const tools = [
    {
      icon: Calculator,
      title: 'Position Calculator',
      description: 'Calculate optimal position sizes based on risk management',
      color: 'text-neon-gold'
    },
    {
      icon: BarChart3,
      title: 'Advanced Charting',
      description: 'Professional-grade charts with 100+ technical indicators',
      color: 'text-neon-gold-champagne'
    },
    {
      icon: Bell,
      title: 'Price Alerts',
      description: 'Set custom alerts for price movements and news',
      color: 'text-neon-gold-dark'
    },
    {
      icon: Target,
      title: 'Risk Management',
      description: 'Advanced risk assessment and portfolio analysis',
      color: 'text-neon-amber'
    }
  ]

  return (
    <main className="min-h-screen bg-dark-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-black via-black to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Trading <span className="gradient-text">Tools</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional-grade tools to enhance your trading strategy. 
              From position calculators to advanced charting, everything you need to succeed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark-800 rounded-2xl border border-gray-700 p-6 hover:border-neon-gold/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-3 bg-dark-700 rounded-lg group-hover:bg-neon-gold/20 transition-colors`}>
                    <tool.icon className={`w-6 h-6 ${tool.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Position Calculator */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Calculator Container */}
            <div className="bg-dark-800 rounded-2xl border border-gray-700 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Position Size Calculator</h2>
                <p className="text-sm text-gray-400 mt-2">
                  Hybrid Model: Real-time exchange rates + Approximate pip values
                </p>
              </div>

              {/* Values Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-300 mb-6">Values</h3>
                <div className="space-y-4">
                  {/* Currency Pair */}
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-sm font-medium text-gray-300 min-w-[140px]">
                      Currency Pair:
                    </label>
                    <select
                      value={selectedCurrencyPair}
                      onChange={(e) => setSelectedCurrencyPair(e.target.value)}
                      className="flex-1 px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-gold transition-all duration-200"
                    >
                      {currencyPairs.map((pair) => (
                        <option key={pair} value={pair}>{pair}</option>
                      ))}
                    </select>
                  </div>

                  {/* Account Currency */}
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-sm font-medium text-gray-300 min-w-[140px]">
                      Account Currency:
                    </label>
                    <select
                      value={amountCurrency}
                      onChange={(e) => setAmountCurrency(e.target.value)}
                      className="flex-1 px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-gold transition-all duration-200"
                    >
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>

                  {/* Account Size */}
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-sm font-medium text-gray-300 min-w-[140px]">
                      Account Size:
                    </label>
                    <input
                      type="number"
                      value={accountSize}
                      onChange={(e) => setAccountSize(e.target.value)}
                      className="flex-1 px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-gold transition-all duration-200"
                      placeholder="Enter account size"
                    />
                  </div>

                  {/* Risk Ratio */}
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-sm font-medium text-gray-300 min-w-[140px]">
                      Risk Ratio, %:
                    </label>
                    <input
                      type="number"
                      value={riskPercentage}
                      onChange={(e) => setRiskPercentage(e.target.value)}
                      className="flex-1 px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-gold transition-all duration-200"
                      placeholder="Enter risk percentage"
                      step="0.1"
                      min="0.1"
                      max="100"
                    />
                  </div>

                  {/* Stop-Loss in Pips */}
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-sm font-medium text-gray-300 min-w-[140px]">
                      Stop-Loss, Pips:
                    </label>
                    <input
                      type="number"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(e.target.value)}
                      className="flex-1 px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-gold transition-all duration-200"
                      placeholder="Enter stop loss in pips"
                      step="0.1"
                      min="0"
                    />
                  </div>

                  {/* Trade Size (Lots) */}
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-sm font-medium text-gray-300 min-w-[140px]">
                      Trade Size <span className="underline">(Lots)</span>:
                    </label>
                    <input
                      type="number"
                      value={positionSize}
                      onChange={(e) => setPositionSize(e.target.value)}
                      className="flex-1 px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-gold transition-all duration-200"
                      placeholder="1"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 mt-6">
                  <button
                    onClick={() => {
                      setAccountSize('50000')
                      setRiskPercentage('2')
                      setStopLoss('')
                      // Set default trade size based on currency pair
                      setPositionSize(selectedCurrencyPair === 'XAU/USD' ? '0.001' : '1')
                      setEntryPrice('')
                      setTakeProfit('')
                    }}
                    className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      // Calculation happens automatically via calculatePosition
                      setIsCalculating(true)
                      setTimeout(() => setIsCalculating(false), 500)
                    }}
                    className="flex-1 px-6 py-3 bg-neon-gold hover:bg-neon-gold-champagne text-black rounded-lg font-medium transition-colors duration-200"
                  >
                    Calculate
                  </button>
                </div>
              </div>

              {/* Exchange Rate Status */}
              {(() => {
                const quoteCurrency = getQuoteCurrency(selectedCurrencyPair)
                const needsConversion = amountCurrency !== quoteCurrency
                
                if (needsConversion) {
                  return (
                    <div className="mb-6 p-4 bg-dark-700 rounded-lg border border-gray-600">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300">
                          Exchange Rate Status:
                        </span>
                        {isLoadingRate ? (
                          <div className="flex items-center gap-2 text-neon-gold">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-xs">Fetching rate...</span>
                          </div>
                        ) : exchangeRate ? (
                          <div className="flex items-center gap-2 text-green-400">
                            <span className="text-xs">✓ Real-time</span>
                            {rateLastUpdated && (
                              <span className="text-xs text-gray-500">
                                ({rateLastUpdated.toLocaleTimeString()})
                              </span>
                            )}
                          </div>
                        ) : rateError ? (
                          <div className="flex items-center gap-2 text-yellow-400">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-xs">Approximate</span>
                          </div>
                        ) : null}
                      </div>
                      {exchangeRate && (
                        <p className="text-xs text-gray-400">
                          1 {amountCurrency} = {exchangeRate.toFixed(4)} {quoteCurrency}
                        </p>
                      )}
                      {rateError && (
                        <p className="text-xs text-yellow-400 mt-1">{rateError}</p>
                      )}
                    </div>
                  )
                }
                return null
              })()}

              {/* Results Section */}
              <div className="border-t border-gray-700 pt-8">
                <h3 className="text-lg font-semibold text-gray-300 mb-6">Results</h3>
                {parseFloat(accountSize) > 0 && parseFloat(riskPercentage) > 0 && parseFloat(stopLoss) > 0 ? (
                  <div className="space-y-4">
                    {(() => {
                      const results = calculatePosition()
                      const quoteCurrency = getQuoteCurrency(selectedCurrencyPair)
                      return (
                        <>
                          <div className="flex items-center justify-between gap-4">
                            <label className="text-sm font-medium text-gray-300 min-w-[140px]">
                              Money, {quoteCurrency}:
                            </label>
                            <div className="flex-1 flex flex-col items-end">
                              <input
                                type="text"
                                readOnly
                                value={results.riskAmount || '0.00'}
                                className="w-full px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white text-right"
                              />
                              {results.conversionInfo && (
                                <span className="text-xs text-gray-500 mt-1">
                                  {results.conversionInfo}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <label className="text-sm font-medium text-gray-300 min-w-[140px]">
                              Units:
                            </label>
                            <input
                              type="text"
                              readOnly
                              value={results.positionSize || '0'}
                              className="flex-1 px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white text-right"
                            />
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <label className="text-sm font-medium text-gray-300 min-w-[140px]">
                              Sizing:
                            </label>
                            <input
                              type="text"
                              readOnly
                              value={`${results.lotSize || '0'} ${results.lotType || 'lots'}`}
                              className="flex-1 px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white text-right"
                            />
                          </div>
                          {results.usingRealTimeRate && (
                            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                              <p className="text-xs text-green-400 flex items-center gap-2">
                                <span>✓</span>
                                Using real-time exchange rate for accurate calculation
                              </p>
                            </div>
                          )}
                        </>
                      )
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>Fill in all required fields to see results</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default TradingToolsPage 