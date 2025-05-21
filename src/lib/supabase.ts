import { createClient } from '@supabase/supabase-js';

// These values can be public
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a basic Supabase client with the public anon key
// This is safe because we'll only use it for authentication,
// and the auth flow happens in a secure context (browser)
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storageKey: 'supabase_auth_token',
  },
});

// Function to sign in with OAuth provider
export const signInWithOAuth = async (provider: 'google' | 'github' | 'apple') => {
  // The redirect URL must be registered in Supabase dashboard
  // For desktop apps, use a custom protocol like 'tauri-app://auth-callback'
  const redirectUrl = 'http://localhost:1420/auth-callback';
  
  // Get the authorization URL from Supabase
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    throw error;
  }

  // Open the URL in the default browser
  if (data?.url) {
    // In Tauri 2, we'll use the standard browser API
    window.open(data.url, '_blank');
  }
};

// Function to handle email and password sign in
export const signInWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

// Function to handle sign up
export const signUpWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

// Function to sign out
export const signOut = async () => {
  return await supabase.auth.signOut();
};

// Export the Supabase client
export const getSupabase = () => supabase; 