'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { format } from 'date-fns'
import { getInsightById, incrementInsightViews, type Insight } from '@/lib/supabase/insights'
import { 
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  Tag,
  Share2,
  Loader2,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const BlogPostPage = () => {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  
  const [insight, setInsight] = useState<Insight | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadInsight()
    }
  }, [id])

  const loadInsight = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchError } = await getInsightById(id)

      if (fetchError) {
        setError('Failed to load blog post')
        console.error('Error fetching insight:', fetchError)
      } else if (data) {
        setInsight(data)
        // Increment views when post is loaded
        await incrementInsightViews(id)
      } else {
        setError('Blog post not found')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Error loading insight:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share && insight) {
      try {
        await navigator.share({
          title: insight.title,
          text: insight.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-dark-950">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-neon-gold animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !insight) {
    return (
      <main className="min-h-screen bg-dark-950">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto px-4">
            <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Blog Post Not Found</h1>
            <p className="text-gray-400 mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
            <Link href="/insights">
              <Button variant="primary" size="md">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Insights
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-dark-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-black via-black to-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/insights">
              <Button variant="ghost" size="sm" className="mb-8 group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Insights
              </Button>
            </Link>

            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                insight.category === 'Technical Analysis' ? 'bg-neon-gold/20 text-neon-gold' :
                insight.category === 'News' ? 'bg-neon-gold-champagne/20 text-neon-gold-champagne' :
                insight.category === 'Strategy' ? 'bg-neon-gold-dark/20 text-neon-gold-dark' :
                'bg-neon-amber/20 text-neon-amber'
              }`}>
                {insight.category}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {insight.title}
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {insight.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{insight.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{format(new Date(insight.published_at || insight.created_at), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{insight.read_time ? `${insight.read_time} min read` : '5 min read'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>{insight.views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Cover Image */}
            {insight.cover_image_url && (
              <div className="mb-8 rounded-2xl overflow-hidden">
                <img 
                  src={insight.cover_image_url} 
                  alt={insight.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Tags */}
            {insight.tags && insight.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {insight.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-dark-800 border border-gray-700 rounded-full text-sm text-gray-400"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Share Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-neon-gold/50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white font-lexend
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-neon-gold hover:prose-a:text-neon-gold-champagne
              prose-strong:text-white
              prose-code:text-neon-gold
              prose-pre:bg-dark-800
              prose-blockquote:border-l-4 prose-blockquote:border-neon-gold prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400
              prose-ul:text-gray-300
              prose-ol:text-gray-300
              prose-li:text-gray-300
              prose-img:rounded-xl
              prose-img:border prose-img:border-gray-700"
            dangerouslySetInnerHTML={{ __html: insight.content }}
          />
        </div>
      </section>

      {/* Related Posts Section */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">More Insights</h2>
            <p className="text-gray-400">Explore more articles from Club Liquidez</p>
          </div>
          <div className="text-center">
            <Link href="/insights">
              <Button variant="primary" size="lg">
                View All Insights
                <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default BlogPostPage

