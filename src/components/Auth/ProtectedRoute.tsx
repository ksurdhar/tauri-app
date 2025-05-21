import { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AuthTabs } from './AuthTabs';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  // If user is authenticated, render the children
  if (user) {
    return <>{children}</>;
  }
  
  // If not authenticated, render the auth tabs
  return <AuthTabs />;
} 