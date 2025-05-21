import { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';
import './Auth.css';

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="auth-tabs">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={`tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'login' ? <Login /> : <Register />}
      </div>
    </div>
  );
} 