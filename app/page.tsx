import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import BrandIntroSection from '@/components/home/BrandIntroSection'
import PillarsSection from '@/components/home/PillarsSection'
import TrustSection from '@/components/home/TrustSection'
import GoldCycleSection from '@/components/home/GoldCycleSection'
import StrategyHighlightsSection from '@/components/home/StrategyHighlightsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import StatsSection from '@/components/home/StatsSection'
import FinalCTASection from '@/components/home/FinalCTASection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <BrandIntroSection />
      <PillarsSection />
      <TrustSection />
      <GoldCycleSection />
      <StrategyHighlightsSection />
      <TestimonialsSection />
      <StatsSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
} 