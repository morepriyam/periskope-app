import { createBrowserClient } from '@supabase/ssr'
import { type Database } from '@/types/supabase'

// Browser Supabase client (for Client Components) — @supabase/ssr.
export const createBrowserSupabaseClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
} 