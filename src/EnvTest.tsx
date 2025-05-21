import { useEffect, useState } from 'react';

export function EnvTest() {
  const [envVars, setEnvVars] = useState<Record<string, any>>({});
  
  useEffect(() => {
    // Get all environment variables
    const vars = {
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 
        `${import.meta.env.VITE_SUPABASE_ANON_KEY.substring(0, 10)}...` : undefined,
      MODE: import.meta.env.MODE,
      DEV: import.meta.env.DEV,
      PROD: import.meta.env.PROD,
    };
    
    setEnvVars(vars);
  }, []);
  
  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Environment Variables Test</h2>
      <pre>{JSON.stringify(envVars, null, 2)}</pre>
    </div>
  );
} 