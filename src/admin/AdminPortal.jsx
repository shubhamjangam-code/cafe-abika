import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminPortal = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localSession = localStorage.getItem('admin_session');
    if (localSession) {
      setUser({ email: localSession, isDemo: true });
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-lightBg flex items-center justify-center font-sans text-darkText">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-grayText font-heading font-black">
            Verifying Admin Session...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLoginSuccess={(loggedInUser) => setUser(loggedInUser)} />;
  }

  return (
    <AdminDashboard 
      onLogout={() => {
        localStorage.removeItem('admin_session');
        setUser(null);
      }} 
    />
  );
};

export default AdminPortal;
