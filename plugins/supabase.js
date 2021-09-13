import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://iwryltfzagzpajajunlh.supabase.co"
const supabaseAnonKey = process.env.SUPABASE_API_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)