import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disable scrolling during loader
    document.body.style.overflow = 'hidden';
    
    // Completely remove loader from DOM after fade-out transition completes (2.0s delay + 0.6s duration)
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }, 2600);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 2.0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-secondary"
      style={{ overflow: 'hidden' }}
    >
      <div className="relative flex flex-col items-center">
        {/* Divine Diya / Lotus SVG Loader */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="text-primary w-24 h-24 flex items-center justify-center diya-glow"
        >
          <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Lotus Petals / Diya Flame */}
            <path d="M50 15 C55 35 75 45 75 55 C75 68 64 75 50 75 C36 75 25 68 25 55 C25 45 45 35 50 15 Z" fill="#E65A00" />
            <path d="M50 28 C53 42 67 49 67 56 C67 65 59 70 50 70 C41 70 33 65 33 56 C33 49 47 42 50 28 Z" fill="#D4AF37" />
            {/* Coffee Cup Base */}
            <path d="M30 65 H70 V72 C70 78 61 82 50 82 C39 82 30 78 30 72 Z" fill="#7A1A22" />
            <path d="M70 67 C73 67 76 69 76 71 C76 73 73 75 70 75" stroke="#7A1A22" strokeWidth="3" />
          </svg>
        </motion.div>

        {/* Cafe Name */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 font-heading text-2xl sm:text-3xl font-extrabold text-accent tracking-widest text-center"
        >
          AMBIKA CAFE
        </motion.h1>

        {/* Underline Progress */}
        <div className="w-40 h-1 bg-accent/10 rounded-full mt-3 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="h-full bg-primary"
          />
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-grayText mt-2 font-medium tracking-wide"
        >
          Divine Taste • Good Vibes
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
