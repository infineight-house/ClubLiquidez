'use client'

import React, { useState, useEffect, useCallback } from 'react'
import AdminSidebarLayout from '@/components/layout/AdminSidebarLayout'
import { Button } from '@/components/ui/Button'
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, type Testimonial } from '@/lib/supabase/testimonials'
import toast from 'react-hot-toast'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Star, 
  Quote
} from 'lucide-react'

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState<Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    role: '',
    location: '',
    image: '',
    avatar_url: '',
    rating: 5,
    text: '',
    highlight: '',
    published: true,
    order_index: 0,
  })

  const loadTestimonials = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await getTestimonials({ publishedOnly: false })
      if (data) setTestimonials(data)
    } catch (err) {
      toast.error('Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTestimonials()
  }, [loadTestimonials])

  const handleOpenCreate = () => {
    setFormData({
      name: '',
      role: 'Student / Cohort Member',
      location: '',
      image: '',
      avatar_url: '',
      rating: 5,
      text: '',
      highlight: '',
      published: true,
      order_index: testimonials.length,
    })
    setEditingId(null)
    setIsCreating(true)
  }

  const handleOpenEdit = (testimonial: Testimonial) => {
    setFormData({
      name: testimonial.name,
      role: testimonial.role || '',
      location: testimonial.location || '',
      image: testimonial.image || '',
      avatar_url: testimonial.avatar_url || '',
      rating: testimonial.rating || 5,
      text: testimonial.text,
      highlight: testimonial.highlight || '',
      published: testimonial.published ?? true,
      order_index: testimonial.order_index || 0,
    })
    setEditingId(testimonial.id || null)
    setIsCreating(false)
  }

  const handleCancelForm = () => {
    setIsCreating(false)
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.text.trim()) {
      toast.error('Name and testimonial text are required')
      return
    }

    setSaving(true)
    try {
      if (editingId) {
        const { error } = await updateTestimonial(editingId, formData)
        if (error) throw error
        toast.success('Testimonial updated successfully!')
      } else {
        const { error } = await createTestimonial(formData)
        if (error) throw error
        toast.success('Testimonial created successfully!')
      }
      setIsCreating(false)
      setEditingId(null)
      await loadTestimonials()
    } catch (err: any) {
      toast.error(err.message || 'Error saving testimonial')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete testimonial by "${name}"?`)) return
    try {
      const { error } = await deleteTestimonial(id)
      if (error) throw error
      toast.success('Testimonial deleted')
      await loadTestimonials()
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete testimonial')
    }
  }

  return (
    <AdminSidebarLayout
      title="Testimonials & Learner Voices Manager"
      subtitle="Manage student reviews, avatar picture URLs, and publication status on the homepage."
      actionButton={
        <Button onClick={handleOpenCreate} variant="primary" size="sm" className="bg-[#b89428] text-black font-semibold">
          <Plus className="w-4 h-4 mr-1.5" /> Add Testimonial
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Create / Edit Form Drawer */}
        {(isCreating || editingId) && (
          <div className="p-6 rounded-2xl bg-white border border-[#b89428]/40 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                {editingId ? <Edit className="w-5 h-5 text-[#b89428]" /> : <Plus className="w-5 h-5 text-[#b89428]" />}
                {editingId ? 'Edit Testimonial' : 'Add New Student Testimonial'}
              </h2>
              <button onClick={handleCancelForm} className="text-neutral-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya R."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#b89428]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Role / Program Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cohort 12 · Market focus"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#b89428]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chennai, IN"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#b89428]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Student Picture / Avatar URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or /avatars/student.jpg"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#b89428]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Testimonial Quote *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="The session map alone changed how I plan my week..."
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-[#b89428]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 accent-[#b89428] rounded"
                  />
                  <span className="text-sm font-medium text-neutral-900">Publish on Homepage</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="px-5 py-2.5 rounded-full border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <Button variant="primary" size="md" type="submit" disabled={saving} className="bg-[#b89428] text-black">
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : editingId ? 'Update Testimonial' : 'Create Testimonial'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Testimonials Cards Grid */}
        {loading ? (
          <div className="py-20 text-center text-neutral-500">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="py-20 text-center text-neutral-500 border border-dashed border-neutral-300 rounded-2xl bg-white">
            <Quote className="w-12 h-12 mx-auto text-neutral-400 mb-3" />
            <p className="text-lg font-medium text-neutral-900">No testimonials found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div
                key={item.id || item.name}
                className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-neutral-300 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {item.avatar_url ? (
                        <img
                          src={item.avatar_url}
                          alt={item.name}
                          className="w-11 h-11 rounded-full object-cover border border-[#b89428]/30 shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-[#b89428] flex items-center justify-center shrink-0">
                          <span className="text-black font-bold text-sm">
                            {item.image || item.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-neutral-900 text-base">{item.name}</h3>
                        {item.role && <p className="text-xs text-neutral-500">{item.role}</p>}
                        {item.location && <p className="text-[11px] text-neutral-400">{item.location}</p>}
                      </div>
                    </div>

                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                        item.published ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {item.published ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#b89428] text-[#b89428]" />
                    ))}
                  </div>

                  <p className="text-xs text-neutral-700 leading-relaxed mb-4 italic">
                    "{item.text}"
                  </p>

                  {item.highlight && (
                    <span className="inline-block text-[10px] uppercase font-bold text-[#b89428] tracking-wider px-2 py-1 rounded bg-[#b89428]/10 border border-[#b89428]/20">
                      {item.highlight}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-neutral-100">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-lg transition-colors text-xs flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>
                  {item.id && (
                    <button
                      onClick={() => handleDelete(item.id!, item.name)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminSidebarLayout>
  )
}
