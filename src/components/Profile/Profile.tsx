import { useAuth } from '../../contexts/AuthContext';
import './Profile.css';

export function Profile() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      
      <div className="profile-info">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>User ID:</strong> {user?.id}</p>
        <p><strong>Last Sign In:</strong> {user?.last_sign_in_at 
          ? new Date(user.last_sign_in_at).toLocaleString() 
          : 'N/A'}</p>
      </div>
      
      <button className="sign-out-button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
} 