import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getSupabase, signInWithEmail, signUpWithEmail, signInWithOAuth, signOut as supabaseSignOut } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signInWithProvider: (provider: 'google' | 'github' | 'apple') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define useAuth as a named function declaration for better HMR compatibility
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = getSupabase();

  useEffect(() => {
    // Check for existing session
    const setupAuth = async () => {
      try {
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log('Auth state changed:', event);
            setSession(session);
            setUser(session?.user ?? null);
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error setting up auth:', error);
      } finally {
        setLoading(false);
      }
    };

    setupAuth();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const { error } = await signInWithEmail(email, password);
      return { error };
    } catch (error) {
      console.error('Error during sign in:', error);
      return { error };
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      const { error } = await signUpWithEmail(email, password);
      return { error };
    } catch (error) {
      console.error('Error during sign up:', error);
      return { error };
    }
  };

  const handleSignInWithProvider = async (provider: 'google' | 'github' | 'apple') => {
    try {
      await signInWithOAuth(provider);
    } catch (error) {
      console.error('Error during OAuth sign in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabaseSignOut();
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const value = {
    session,
    user,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signInWithProvider: handleSignInWithProvider,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 