import React from 'react';
import { motion } from 'framer-motion';

const AmbientBackground = () => {
  // Mobile-light particle set for optimal FPS on mobile screens
  const desktopParticles = [
    { id: 1, icon: '✨', size: 'text-sm', top: '12%', left: '8%', delay: 0, duration: 12, rotate: 360 },
    { id: 2, icon: '🍃', size: 'text-base', top: '22%', left: '85%', delay: 2, duration: 14, rotate: -180 },
    { id: 3, icon: '☕', size: 'text-sm', top: '42%', left: '10%', delay: 1, duration: 13, rotate: 120 },
    { id: 4, icon: '✴️', size: 'text-xs', top: '58%', left: '88%', delay: 3, duration: 15, rotate: 240 },
    { id: 5, icon: '🌿', size: 'text-sm', top: '75%', left: '15%', delay: 2, duration: 16, rotate: -360 },
    { id: 6, icon: '✨', size: 'text-xs', top: '82%', left: '75%', delay: 0.5, duration: 11, rotate: 180 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
      {/* Rich Mahogany Dark Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#120D0B] via-[#1A120F] to-[#120D0B]" />

      {/* Luxury Cinematic Dark Bokeh & Floating Silhouettes Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen pointer-events-none transform-gpu"
        style={{ backgroundImage: "url('/ambika_cafe_admin_bg.png')" }}
      />
      
      {/* Optimized Golden Radial Ambient Lights */}
      <div className="hidden sm:block absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Persistent Antigravity Floating Spices & Gold Dust */}
      <div className="hidden sm:block">
        {desktopParticles.map((p) => (
          <motion.div
            key={p.id}
            style={{ top: p.top, left: p.left }}
            animate={{
              y: [-18, 18, -18],
              rotate: [0, p.rotate, 0],
              opacity: [0.25, 0.65, 0.25],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
            className={`absolute ${p.size} text-amber-200/50 select-none transform-gpu drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]`}
          >
            {p.icon}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AmbientBackground;
