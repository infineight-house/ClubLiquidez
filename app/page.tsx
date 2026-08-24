import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import BrandIntroSection from '@/components/home/BrandIntroSection'
import PillarsSection from '@/components/home/PillarsSection'
import TrustSection from '@/components/home/TrustSection'
import MarketCycleSection from '@/components/home/MarketCycleSection'
import StrategyHighlightsSection from '@/components/home/StrategyHighlightsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import StatsSection from '@/components/home/StatsSection'
import FinalCTASection from '@/components/home/FinalCTASection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black selection:bg-brand-gold/25 selection:text-black">
      <Navbar />
      <HeroSection />
      <BrandIntroSection />
      <PillarsSection />
      <TrustSection />
      {/* <MarketCycleSection /> */}
      <StrategyHighlightsSection />
      <TestimonialsSection />
      <StatsSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
} 