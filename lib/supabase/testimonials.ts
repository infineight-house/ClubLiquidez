import { createClient } from '@/lib/supabase/client'

export interface Testimonial {
  id?: string
  name: string
  role?: string
  location?: string
  image?: string
  avatar_url?: string
  rating: number
  text: string
  highlight?: string
  published?: boolean
  order_index?: number
  created_at?: string
  updated_at?: string
  isGoogle?: boolean
  relativeTime?: string
}

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ananya R.',
    role: 'Cohort 12 · Market focus',
    location: 'Chennai, IN',
    image: 'AR',
    rating: 5,
    text: 'The session map alone changed how I plan my week. I finally understand when the market is “breathing” vs. trending.',
    highlight: 'Session structure',
  },
  {
    name: 'James M.',
    role: 'Weekend intensive',
    location: 'Dubai, AE',
    image: 'JM',
    rating: 5,
    text: 'Risk module for metals is worth the price of admission. I stopped winging lot size on news spikes.',
    highlight: 'Risk architecture',
  },
  {
    name: 'Claire V.',
    role: 'Online + campus hybrid',
    location: 'London, UK',
    image: 'CV',
    rating: 5,
    text: 'Mentors poke holes in my thesis without arrogance. Feels like a desk review—not a Discord hype circle.',
    highlight: 'Mentor feedback',
  },
  {
    name: 'Wei L.',
    role: 'Macro add-on track',
    location: 'Singapore',
    image: 'WL',
    rating: 5,
    text: 'Market fundamentals lectures tied cleanly into charts. No astrology—just frameworks I can reuse.',
    highlight: 'Macro literacy',
  },
  {
    name: 'Diego S.',
    role: 'Journal remediation',
    location: 'Madrid, ES',
    image: 'DS',
    rating: 5,
    text: 'They grade journals like coursework. Painful at first, then my discipline curve flattened losses.',
    highlight: 'Accountability',
  },
  {
    name: 'Priya N.',
    role: 'Classroom weeks · TN',
    location: 'Kanchipuram, IN',
    image: 'PN',
    rating: 5,
    text: 'Offline days meant I could whiteboard scenarios with peers. Still referencing those templates months later.',
    highlight: 'Immersive labs',
  },
]

export async function getTestimonials(filters?: { publishedOnly?: boolean }) {
  const supabase = createClient()
  if (!supabase) {
    return { data: FALLBACK_TESTIMONIALS, error: null }
  }

  let query = supabase
    .from('testimonials')
    .select('*')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })

  if (filters?.publishedOnly !== false) {
    query = query.eq('published', true)
  }

  const { data, error } = await query

  if (error || !data || data.length === 0) {
    if (error) {
      console.warn('Error fetching testimonials from Supabase, using fallback:', error.message)
    }
    return { data: FALLBACK_TESTIMONIALS, error: null }
  }

  return { data: data as Testimonial[], error: null }
}

export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = createClient()
  if (!supabase) {
    return { data: null, error: { message: 'Supabase client not configured' } }
  }

  const imageInitials = testimonial.image || testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()

  const { data, error } = await supabase
    .from('testimonials')
    .insert({
      ...testimonial,
      image: imageInitials,
      published: testimonial.published ?? true,
    })
    .select()
    .single()

  return { data: data as Testimonial | null, error }
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>) {
  const supabase = createClient()
  if (!supabase) {
    return { data: null, error: { message: 'Supabase client not configured' } }
  }

  const { data, error } = await supabase
    .from('testimonials')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data: data as Testimonial | null, error }
}

export async function deleteTestimonial(id: string) {
  const supabase = createClient()
  if (!supabase) {
    return { error: { message: 'Supabase client not configured' } }
  }

  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)

  return { error }
}
