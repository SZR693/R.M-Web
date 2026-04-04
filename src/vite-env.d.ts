/// <reference types="vite/client" />

declare module '*.css';

interface ImportMetaEnv {
  // Clé Cloudflare Turnstile
  readonly VITE_CLOUDFLARE_TURNSTILE_SITE_KEY: string;
  
  // Clés Supabase (Ajoute celles-ci)
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}