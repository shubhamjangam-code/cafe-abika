import React from 'react';
import { motion } from 'framer-motion';

const AmbientBackground = () => {
  // Mobile-light particle set for optimal FPS on mobile screens
  const desktopParticles = [
    { id: 1, icon: '✨', size: 'text-sm', top: '15%', left: '8%', delay: 0, duration: 12 },
    { id: 2, icon: '🌱', size: 'text-base', top: '25%', left: '85%', delay: 2, duration: 14 },
    { id: 3, icon: '☕', size: 'text-xs', top: '45%', left: '12%', delay: 3, duration: 13 },
    { id: 4, icon: '🍃', size: 'text-sm', top: '65%', left: '88%', delay: 1, duration: 15 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
      {/* Rich Mahogany Dark Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#120D0B] via-[#1A120F] to-[#120D0B]" />
      
      {/* Optimized Golden Radial Ambient Lights (hidden heavy blur on tiny mobile screens) */}
      <div className="hidden sm:block absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Persistent Antigravity Floating Particles for Desktop/Tablet */}
      <div className="hidden sm:block">
        {desktopParticles.map((p) => (
          <motion.div
            key={p.id}
            style={{ top: p.top, left: p.left }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
            className={`absolute ${p.size} text-amber-200/40 select-none transform-gpu`}
          >
            {p.icon}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AmbientBackground;
