import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { FaLock, FaEnvelope, FaSignInAlt, FaPaperPlane, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Logo } from '../components/Navbar';
import AmbientBackground from '../components/AmbientBackground';

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);

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

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset link sent! Please check your email inbox.');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError('Failed to send reset email. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#120D0B] text-[#FAF5EC] relative overflow-hidden px-4 sm:px-6 py-12">
      {/* Shared Ambient Antigravity Background Component */}
      <AmbientBackground />
      
      {/* Decorative Overlay */}
      <div className="absolute inset-0 mandala-pattern opacity-10 pointer-events-none z-0" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-[#1C1412]/90 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-gold/30 overflow-hidden relative z-10"
      >
        
        {/* Top Mahogany & Gold Header Banner */}
        <div className="bg-gradient-to-r from-[#2A1813] via-[#3D1E16] to-[#2A1813] p-8 text-center border-b border-gold/20 relative">
          <div className="w-16 h-16 bg-gold/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Logo className="w-12 h-12" />
          </div>
          <h2 className="font-heading font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-gold to-amber-300">
            AMBIKA <span className="text-primary">CAFE</span>
          </h2>
          <p className="text-amber-200/80 text-xs font-sans mt-1.5 tracking-widest uppercase font-bold">
            {isForgotMode ? 'Reset Management Access' : 'Management Portal Control'}
          </p>
        </div>

        {/* Login or Forgot password form */}
        <form onSubmit={isForgotMode ? handleResetPassword : handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-950/80 border border-red-500/40 text-red-200 text-sm rounded-xl flex items-center space-x-2 font-sans shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 animate-pulse" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-sm rounded-xl flex items-center space-x-2 font-sans shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
              <span className="font-medium">{successMessage}</span>
            </div>
          )}

          {!isForgotMode ? (
            <>
              <div className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-amber-300 tracking-wider uppercase mb-2 font-heading">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gold/70">
                      <FaEnvelope className="text-sm" />
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm transition-all bg-[#120D0B] text-amber-100 placeholder-amber-200/30"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold text-amber-300 tracking-wider uppercase font-heading">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotMode(true);
                        setError('');
                        setSuccessMessage('');
                      }}
                      className="text-xs text-amber-400 hover:text-gold font-semibold transition-colors duration-300"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gold/70">
                      <FaLock className="text-sm" />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm transition-all bg-[#120D0B] text-amber-100 placeholder-amber-200/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gold/70 hover:text-gold transition-colors focus:outline-none cursor-pointer"
                      title={showPassword ? "Hide Password" : "Show Password"}
                    >
                      {showPassword ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary via-amber-600 to-amber-500 hover:from-amber-600 hover:to-primary text-white font-heading font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] border border-gold/40 hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 cursor-pointer"
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
            </>
          ) : (
            <>
              <div className="space-y-5">
                {/* Email Field for Reset */}
                <div>
                  <label className="block text-xs font-bold text-amber-300 tracking-wider uppercase mb-2 font-heading">
                    Email Address Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gold/70">
                      <FaEnvelope className="text-sm" />
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm transition-all bg-[#120D0B] text-amber-100 placeholder-amber-200/30"
                    />
                  </div>
                </div>
              </div>

              {/* Reset Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary via-amber-600 to-amber-500 hover:from-amber-600 hover:to-primary text-white font-heading font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] border border-gold/40 hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FaPaperPlane className="text-xs" />
                    <span>Send Reset Email</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotMode(false);
                    setError('');
                    setSuccessMessage('');
                  }}
                  className="text-xs text-amber-300 font-semibold hover:text-gold transition-colors inline-flex items-center space-x-1"
                >
                  <FaArrowLeft className="text-[10px]" />
                  <span>Back to Login</span>
                </button>
              </div>
            </>
          )}
        </form>

        <div className="bg-[#120D0B]/80 border-t border-gold/15 py-4 text-center">
          <a href="/" className="text-xs text-amber-300 font-semibold hover:text-gold transition-colors inline-flex items-center space-x-1">
            <FaArrowLeft className="text-[10px]" />
            <span>Back to Customer Website</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
