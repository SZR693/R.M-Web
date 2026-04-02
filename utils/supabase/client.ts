import { createClient } from '@supabase/supabase-js'

// On ajoute @ts-ignore juste au-dessus pour dire à VS Code "Tais-toi, je sais ce que je fais"
// @ts-ignore
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// @ts-ignore
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)