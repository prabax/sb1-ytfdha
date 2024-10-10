import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

if (supabaseUrl === 'https://your-project-url.supabase.co' || supabaseAnonKey === 'your-supabase-anon-key') {
  console.warn('Please set your Supabase URL and anon key in the .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);