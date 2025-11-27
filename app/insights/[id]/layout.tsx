// Server component layout to handle generateStaticParams
import { createClient } from '@supabase/supabase-js'

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return []
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { data, error } = await supabase
      .from('insights')
      .select('id')
      .eq('published', true)

    if (error || !data || data.length === 0) {
      return []
    }

    return data.map((insight) => ({ id: insight.id }))
  } catch (error) {
    return []
  }
}

export default function InsightLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}





