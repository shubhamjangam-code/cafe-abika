import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminPortal = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear any legacy persistent localStorage tokens
    localStorage.removeItem('admin_session');

    // Check active tab session (sessionStorage expires when tab or browser closes)
    const activeSession = sessionStorage.getItem('admin_active_session');
    if (activeSession) {
      setUser({ email: activeSession, isDemo: true });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#120D0B] flex items-center justify-center font-sans text-amber-200">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-amber-300 font-heading font-black">
            Authenticating Admin Session...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <AdminLogin 
        onLoginSuccess={(loggedInUser) => {
          sessionStorage.setItem('admin_active_session', loggedInUser.email || 'admin@ambikacafe.com');
          setUser(loggedInUser);
        }} 
      />
    );
  }

  return (
    <AdminDashboard 
      onLogout={() => {
        sessionStorage.removeItem('admin_active_session');
        localStorage.removeItem('admin_session');
        setUser(null);
      }} 
    />
  );
};

export default AdminPortal;
