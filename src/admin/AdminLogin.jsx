import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FaLock, FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import { Logo } from '../components/Navbar';

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Fallback/demo admin login credentials
    if (email === 'admin@ambikacafe.com' && password === 'admin123') {
      localStorage.setItem('admin_session', email);
      if (onLoginSuccess) onLoginSuccess({ email });
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (onLoginSuccess) onLoginSuccess(auth.currentUser);
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('Login failed. Please ensure Firebase Auth is enabled in Console.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightBg relative overflow-hidden px-4 sm:px-6">
      {/* Decorative background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,90,0,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(122,26,34,0.06),transparent_50%)]" />
      
      {/* Mandala accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-no-repeat bg-contain opacity-5 pointer-events-none" 
        style={{ backgroundImage: "url('/favicon.svg')" }} 
      />

      <div className="max-w-md w-full bg-white rounded-3xl shadow-premium border border-primary/10 overflow-hidden relative z-10">
        
        {/* Top saffron/maroon header banner */}
        <div className="bg-gradient-to-r from-accent to-primary p-8 text-center text-white relative">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-inner">
            <Logo className="w-12 h-12" />
          </div>
          <h2 className="font-heading font-black text-2xl tracking-wider text-white">
            AMBIKA <span className="text-gold">CAFE</span>
          </h2>
          <p className="text-white/85 text-xs font-sans mt-1 tracking-widest uppercase">
            Admin Portal Control
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center space-x-2 font-sans">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Demo Login Credentials Helper */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs rounded-2xl space-y-1 font-sans">
            <div className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[10px] text-amber-800">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Demo Login Credentials</span>
            </div>
            <p className="text-amber-800"><strong>Email:</strong> admin@ambikacafe.com</p>
            <p className="text-amber-800"><strong>Password:</strong> admin123</p>
          </div>

          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-accent tracking-wider uppercase mb-2 font-heading">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-grayText">
                  <FaEnvelope className="text-sm" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="admin@ambikacafe.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all bg-white text-darkText"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-accent tracking-wider uppercase font-heading">
                  Password
                </label>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-grayText">
                  <FaLock className="text-sm" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all bg-white text-darkText"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent text-white font-heading font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <FaSignInAlt className="text-base" />
                <span>Log In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div className="bg-secondary/40 border-t border-primary/5 py-4 text-center">
          <a href="/" className="text-xs text-primary font-semibold hover:underline">
            ← Back to Customer Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
