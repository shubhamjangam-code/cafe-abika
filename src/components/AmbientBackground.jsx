import React from 'react';
import { motion } from 'framer-motion';

const AmbientBackground = () => {
  // Array of floating items for persistent antigravity atmosphere
  const particles = [
    { id: 1, icon: '✨', size: 'text-sm', top: '15%', left: '8%', delay: 0, duration: 9 },
    { id: 2, icon: '🌱', size: 'text-base', top: '25%', left: '85%', delay: 1.5, duration: 11 },
    { id: 3, icon: '☕', size: 'text-xs', top: '45%', left: '12%', delay: 3, duration: 10 },
    { id: 4, icon: '🍃', size: 'text-sm', top: '60%', left: '90%', delay: 2, duration: 12 },
    { id: 5, icon: '⭐', size: 'text-xs', top: '75%', left: '5%', delay: 4, duration: 8 },
    { id: 6, icon: '✨', size: 'text-sm', top: '88%', left: '82%', delay: 1, duration: 10 },
    { id: 7, icon: '🌿', size: 'text-base', top: '35%', left: '92%', delay: 2.5, duration: 13 },
    { id: 8, icon: '☕', size: 'text-xs', top: '70%', left: '18%', delay: 0.5, duration: 9 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Rich Mahogany Dark Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#120D0B] via-[#1A120F] to-[#120D0B]" />
      
      {/* Golden Radial Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[450px] h-[450px] bg-amber-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Persistent Antigravity Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{ top: p.top, left: p.left }}
          animate={{
            y: [-25, 25, -25],
            x: [-15, 15, -15],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
          className={`absolute ${p.size} text-amber-200/40 blur-[0.3px] select-none`}
        >
          {p.icon}
        </motion.div>
      ))}

      {/* Shimmering Golden Dust Sparks */}
      <motion.div
        animate={{ y: [0, -100], opacity: [0, 0.5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_#D4AF37]"
      />
      <motion.div
        animate={{ y: [0, -120], opacity: [0, 0.6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute top-3/4 right-1/3 w-2 h-2 bg-amber-300 rounded-full shadow-[0_0_10px_#F59E0B]"
      />
    </div>
  );
};

export default AmbientBackground;
