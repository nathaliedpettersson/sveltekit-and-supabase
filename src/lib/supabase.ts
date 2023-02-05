// Import subabase and url + public key from .env file
import { createClient } from "@supabase/auth-helpers-sveltekit"
export const supabaseClient = createClient(
   import.meta.env.VITE_SUPABASE_URL,
   import.meta.env.VITE_SUPABASE_ANON_KEY
)
