/// <reference types="vite/client" />

declare module '*.css';

interface ImportMetaEnv {
  // Clé Cloudflare Turnstile
  readonly VITE_CLOUDFLARE_TURNSTILE_SITE_KEY: string;
  
  // Clés Supabase
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;

  // Clé Gemini (Ajoutée)
  readonly VITE_GEMINI_API_KEY: string; 
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}