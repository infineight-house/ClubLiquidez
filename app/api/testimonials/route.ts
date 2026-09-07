import { NextResponse } from 'next/server'
import { getTestimonials, createTestimonial } from '@/lib/supabase/testimonials'

export const dynamic = 'force-static'
export const revalidate = false

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const all = searchParams.get('all') === 'true'

  const { data, error } = await getTestimonials({ publishedOnly: !all })
  
  if (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }

  return NextResponse.json({ testimonials: data })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, role, location, image, avatar_url, rating, text, highlight, published, order_index } = body

    if (!name || !text) {
      return NextResponse.json({ error: 'Name and text are required fields' }, { status: 400 })
    }

    const { data, error } = await createTestimonial({
      name,
      role: role || '',
      location: location || '',
      image: image || name.slice(0, 2).toUpperCase(),
      avatar_url: avatar_url || '',
      rating: Number(rating) || 5,
      text,
      highlight: highlight || '',
      published: published ?? true,
      order_index: Number(order_index) || 0,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ testimonial: data }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
