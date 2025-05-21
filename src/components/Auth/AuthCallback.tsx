import { useEffect, useState } from 'react';
import { getSupabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export function AuthCallback() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const supabase = getSupabase();

  useEffect(() => {
    // Handle the OAuth redirect
    const handleCallback = async () => {
      try {
        // Supabase should automatically process the callback when the page loads
        // We can check if we have a session after the redirect
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setError(error.message);
        } else if (data.session) {
          console.log('Successfully authenticated');
          // Redirect back to the main app
          navigate('/');
        } else {
          setError('No session established after authentication');
        }
      } catch (err) {
        console.error('Error in auth callback:', err);
        setError('Failed to authenticate');
      }
    };
    
    handleCallback();
  }, [navigate, supabase]);

  if (error) {
    return (
      <div className="auth-callback-error">
        <h2>Authentication Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Go back to login</button>
      </div>
    );
  }

  return (
    <div className="auth-callback-loading">
      <div className="loading-spinner"></div>
      <p>Completing authentication, please wait...</p>
    </div>
  );
} 