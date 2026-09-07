'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AdminSidebarLayout from '@/components/layout/AdminSidebarLayout'
import { Button } from '@/components/ui/Button'
import { getInsights, createInsight, updateInsight, deleteInsight, type Insight } from '@/lib/supabase/insights'
import toast from 'react-hot-toast'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save, 
  X,
  BookOpen,
  TrendingUp,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
  Search,
} from 'lucide-react'

const AdminInsightsPage = () => {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterPublished, setFilterPublished] = useState<string>('all')

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Forex Education' as Insight['category'],
    tags: [] as string[],
    featured: false,
    published: false,
    read_time: 5,
    cover_image_url: '',
    seo_title: '',
    seo_description: ''
  })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth')
    }
  }, [user, authLoading, router])

  const loadInsights = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await getInsights({
        category: filterCategory === 'all' ? undefined : filterCategory,
        published: filterPublished === 'all' ? undefined : filterPublished === 'published'
      })

      if (error) {
        toast.error('Failed to load insights')
        console.error('Error:', error)
      } else if (data) {
        setInsights(data)
      }
    } catch (err) {
      toast.error('An unexpected error occurred')
      console.error('Error loading insights:', err)
    } finally {
      setLoading(false)
    }
  }, [filterCategory, filterPublished])

  useEffect(() => {
    if (user) {
      void loadInsights()
    }
  }, [user, loadInsights])

  const handleCreate = () => {
    setIsCreating(true)
    setEditingId(null)
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: user?.user_metadata?.full_name || user?.email || '',
      category: 'Technical Analysis',
      tags: [],
      featured: false,
      published: false,
      read_time: 5,
      cover_image_url: '',
      seo_title: '',
      seo_description: ''
    })
  }

  const handleEdit = (insight: Insight) => {
    setEditingId(insight.id)
    setIsCreating(false)
    // Convert HTML content back to plain text for editing
    const plainTextContent = convertHTMLToText(insight.content)
    setFormData({
      title: insight.title,
      excerpt: insight.excerpt,
      content: plainTextContent,
      author: insight.author,
      category: insight.category === 'Gold Strategy' ? 'Market Strategy' : insight.category,
      tags: insight.tags || [],
      featured: insight.featured,
      published: insight.published,
      read_time: insight.read_time || 5,
      cover_image_url: insight.cover_image_url || '',
      seo_title: insight.seo_title || '',
      seo_description: insight.seo_description || ''
    })
  }

  // Convert plain text to HTML, preserving line breaks and paragraphs
  const convertTextToHTML = (text: string): string => {
    if (!text) return ''
    
    // Check if content already contains HTML tags
    const hasHTML = /<[^>]+>/.test(text)
    
    if (hasHTML) {
      // Content already has HTML, return as-is (but ensure it's valid)
      return text
    }
    
    // Plain text - convert to HTML
    // First, escape HTML special characters
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    
    // Handle quotes - preserve them as-is (they're already escaped)
    // Convert straight quotes to smart quotes if desired, but keep them for now
    
    // Split by double line breaks (paragraphs)
    const paragraphs = escaped.split(/\n\s*\n/)
    
    // Process each paragraph
    const htmlParagraphs = paragraphs.map(paragraph => {
      const trimmed = paragraph.trim()
      if (!trimmed) return ''
      
      // Check if paragraph starts with quote-like pattern (optional)
      // For now, just process normally
      
      // Convert single line breaks within paragraph to <br>
      const withBreaks = trimmed.replace(/\n/g, '<br>')
      
      // Wrap in paragraph tag
      return `<p>${withBreaks}</p>`
    }).filter(p => p !== '')
    
    return htmlParagraphs.join('\n')
  }

  // Convert HTML back to plain text for editing
  const convertHTMLToText = (html: string): string => {
    if (!html) return ''
    
    // Remove paragraph tags and convert to double line breaks
    let text = html.replace(/<\/p>/gi, '\n\n')
    text = text.replace(/<p[^>]*>/gi, '')
    
    // Convert <br> tags to single line breaks
    text = text.replace(/<br\s*\/?>/gi, '\n')
    
    // Decode HTML entities
    text = text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
    
    // Clean up extra whitespace
    text = text.replace(/\n{3,}/g, '\n\n')
    
    return text.trim()
  }

  const handleSave = async () => {
    if (!formData.title || !formData.excerpt || !formData.content || !formData.author) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      // Convert content to HTML format preserving formatting
      const htmlContent = convertTextToHTML(formData.content)
      
      if (isCreating) {
        const { error } = await createInsight({
          ...formData,
          content: htmlContent,
          author_id: user?.id
        })

        if (error) {
          toast.error('Failed to create insight')
          console.error('Error:', error)
        } else {
          toast.success('Insight created successfully!')
          setIsCreating(false)
          setFormData({
            title: '',
            excerpt: '',
            content: '',
            author: user?.user_metadata?.full_name || user?.email || '',
            category: 'Technical Analysis',
            tags: [],
            featured: false,
            published: false,
            read_time: 5,
            cover_image_url: '',
            seo_title: '',
            seo_description: ''
          })
          loadInsights()
        }
      } else if (editingId) {
        const { error } = await updateInsight(editingId, {
          ...formData,
          content: htmlContent
        })

        if (error) {
          toast.error('Failed to update insight')
          console.error('Error:', error)
        } else {
          toast.success('Insight updated successfully!')
          setEditingId(null)
          loadInsights()
        }
      }
    } catch (err) {
      toast.error('An unexpected error occurred')
      console.error('Error saving insight:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this insight?')) {
      return
    }

    try {
      const { error } = await deleteInsight(id)

      if (error) {
        toast.error('Failed to delete insight')
        console.error('Error:', error)
      } else {
        toast.success('Insight deleted successfully!')
        loadInsights()
      }
    } catch (err) {
      toast.error('An unexpected error occurred')
      console.error('Error deleting insight:', err)
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingId(null)
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: user?.user_metadata?.full_name || user?.email || '',
      category: 'Technical Analysis',
      tags: [],
      featured: false,
      published: false,
      read_time: 5,
      cover_image_url: '',
      seo_title: '',
      seo_description: ''
    })
  }

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] })
    }
  }

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) })
  }

  const filteredInsights = insights.filter(insight => {
    const matchesSearch = insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insight.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  if (authLoading || !user) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 text-[#b89428] animate-spin" />
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <AdminSidebarLayout
      title="Blog & Market Insights Manager"
      subtitle="Create, edit, and publish market strategy and education articles."
      actionButton={
        <Button
          variant="primary"
          size="sm"
          onClick={handleCreate}
          className="bg-[#b89428] text-black font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Insight</span>
        </Button>
      }
    >
      <div className="space-y-6">

      {/* Filters and Search */}
      <section className="py-6 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search insights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-300 rounded-lg text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm font-medium"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 bg-white border border-neutral-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm font-medium"
            >
              <option value="all">All Categories</option>
              <option value="Technical Analysis">Technical Analysis</option>
              <option value="News">News</option>
              <option value="Strategy">Strategy</option>
              <option value="Education">Education</option>
            </select>
            <select
              value={filterPublished}
              onChange={(e) => setFilterPublished(e.target.value)}
              className="px-4 py-2 bg-white border border-neutral-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm font-medium"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </section>

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <section className="py-8 bg-white border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-black">
                  {isCreating ? 'Create New Insight' : 'Edit Insight'}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="text-neutral-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-neutral-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm font-medium"
                      placeholder="Article title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-neutral-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm font-medium"
                      placeholder="Author name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-white border border-neutral-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm font-medium"
                    placeholder="Short description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    className="w-full px-4 py-2 bg-white border border-neutral-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold font-mono text-sm"
                    placeholder="Full article content"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as Insight['category'],
                        })
                      }
                      className="w-full px-4 py-2 bg-white border border-neutral-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm font-medium"
                    >
                      <option value="Forex Education">Forex Education</option>
                      <option value="Market Strategy">Market Strategy</option>
                      <option value="Risk Management">Risk Management</option>
                      <option value="Trading Psychology">Trading Psychology</option>
                      <option value="Market Breakdown">Market Breakdown</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Read Time (minutes)
                    </label>
                    <input
                      type="number"
                      value={formData.read_time}
                      onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) || 5 })}
                      className="w-full px-4 py-2 bg-white border border-neutral-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm font-medium"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Cover Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.cover_image_url}
                      onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-neutral-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm font-medium"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        const tag = (e.target as HTMLInputElement).value.trim()
                        if (tag) {
                          addTag(tag)
                          ;(e.target as HTMLInputElement).value = ''
                        }
                      }
                    }}
                    className="w-full px-4 py-2 bg-white border border-neutral-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm font-medium"
                    placeholder="Press Enter to add tag"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-neutral-200 border border-neutral-300 text-black rounded-full text-xs font-semibold flex items-center space-x-2"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 text-[#b89428] bg-white border-neutral-300 rounded focus:ring-brand-gold"
                    />
                    <span className="text-neutral-700 font-semibold text-sm">Featured</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-4 h-4 text-[#b89428] bg-white border-neutral-300 rounded focus:ring-brand-gold"
                    />
                    <span className="text-neutral-700 font-semibold text-sm">Published</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    className="flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Insight</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Insights List */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-[#b89428] animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredInsights.map((insight) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 hover:border-brand-gold transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 bg-neutral-200 border border-neutral-300 text-black rounded-full text-xs font-semibold">
                          {insight.category === 'Gold Strategy' ? 'Market Strategy' : insight.category}
                        </span>
                        {insight.featured && (
                          <span className="px-2 py-1 bg-amber-100 border border-amber-300 text-amber-800 rounded text-xs font-semibold flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3 text-amber-600" />
                            <span>Featured</span>
                          </span>
                        )}
                        {insight.published ? (
                          <span className="px-2 py-1 bg-green-100 border border-green-300 text-green-800 rounded text-xs font-semibold flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span>Published</span>
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-neutral-200 border border-neutral-300 text-neutral-600 rounded text-xs font-semibold flex items-center space-x-1">
                            <AlertCircle className="w-3 h-3 text-neutral-500" />
                            <span>Draft</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-black mb-2">{insight.title}</h3>
                      <p className="text-neutral-600 mb-4 line-clamp-2 text-sm leading-relaxed">{insight.excerpt}</p>
                      <div className="flex items-center space-x-4 text-sm text-neutral-600 font-medium">
                        <span className="flex items-center space-x-1">
                          <FileText className="w-4 h-4 text-neutral-400" />
                          <span>{insight.author}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye className="w-4 h-4 text-neutral-400" />
                          <span>{insight.views} views</span>
                        </span>
                        {insight.tags && insight.tags.length > 0 && (
                          <span className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4 text-neutral-400" />
                            <span>{insight.tags.length} tags</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEdit(insight)}
                        className="flex items-center space-x-1"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(insight.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border border-neutral-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredInsights.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600 text-lg font-medium">No insights found</p>
              <Button
                variant="primary"
                size="md"
                className="mt-4"
                onClick={handleCreate}
              >
                Create Your First Insight
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  </AdminSidebarLayout>
  )
}

export default AdminInsightsPage

