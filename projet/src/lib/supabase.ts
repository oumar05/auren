import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Valider les URLs
const isValidUrl = (url: string): boolean => {
  if (!url || url.startsWith('YOUR_')) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const isConfigured = 
  isValidUrl(supabaseUrl) && 
  supabaseAnonKey && 
  !supabaseAnonKey.startsWith('YOUR_')

// Client-side only
export const getSupabaseClient = () => {
  if (!isConfigured) {
    console.warn('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
    return null
  }
  try {
    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    return null
  }
}

export const isSupabaseConfigured = isConfigured
export const supabase = isConfigured ? getSupabaseClient() : null
