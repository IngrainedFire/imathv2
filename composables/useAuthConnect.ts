import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project values
const SUPABASE_URL = 'https://ujzqpgtapofmluxnmkyy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqenFwZ3RhcG9mbWx1eG5ta3l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTUwMDksImV4cCI6MjA2NjMzMTAwOX0.y8h-p-yV_yN8Nje-3O1k70yuoBP7lhDTM51SWtmVFio'

export const useAuthConnect = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
