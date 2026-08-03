import React from 'react';
import { motion } from 'framer-motion';

const AmbientBackground = () => {
  // Rich set of floating spices, mint, lime, ice, and golden dust particles
  const floatingElements = [
    { id: 1, icon: '⭐', label: 'Star Anise', size: 'text-base sm:text-lg', top: '10%', left: '7%', delay: 0, duration: 14, rotate: 360 },
    { id: 2, icon: '🌿', label: 'Fresh Mint', size: 'text-lg sm:text-xl', top: '22%', left: '86%', delay: 1.5, duration: 16, rotate: -180 },
    { id: 3, icon: '☕', label: 'Coffee Bean', size: 'text-sm sm:text-base', top: '38%', left: '12%', delay: 0.8, duration: 13, rotate: 240 },
    { id: 4, icon: '🍋', label: 'Lime Slice', size: 'text-lg sm:text-xl', top: '54%', left: '88%', delay: 2.2, duration: 18, rotate: 360 },
    { id: 5, icon: '🧊', label: 'Ice Cube', size: 'text-base sm:text-lg', top: '68%', left: '8%', delay: 1, duration: 15, rotate: -120 },
    { id: 6, icon: '🌱', label: 'Cardamom Pod', size: 'text-sm sm:text-base', top: '80%', left: '82%', delay: 3, duration: 17, rotate: 180 },
    { id: 7, icon: '✨', label: 'Golden Ember', size: 'text-xs sm:text-sm', top: '30%', left: '50%', delay: 0.5, duration: 10, rotate: 360 },
    { id: 8, icon: '💧', label: 'Water Droplet', size: 'text-xs sm:text-sm', top: '62%', left: '46%', delay: 2.5, duration: 12, rotate: -90 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu select-none">
      {/* Rich Mahogany Dark Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#120D0B] via-[#1A120F] to-[#120D0B]" />

      {/* Layer 1: Floating Spices & Steam Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen pointer-events-none transform-gpu scale-105 transition-all duration-1000"
        style={{ backgroundImage: "url('/ambika_floating_spices_bg.png')" }}
      />

      {/* Layer 2: Refreshing Liquid & Splash Magic Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay pointer-events-none transform-gpu scale-110 animate-zoom-bg"
        style={{ backgroundImage: "url('/ambika_liquid_splash_bg.png')" }}
      />
      
      {/* Optimized Golden & Amber Radial Ambient Lights */}
      <div className="hidden sm:block absolute top-1/4 left-1/3 -translate-x-1/2 w-[550px] h-[550px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Persistent Weightless Parallax Floating Spices, Mint, Lime & Ice */}
      <div className="hidden sm:block">
        {floatingElements.map((elem) => (
          <motion.div
            key={elem.id}
            style={{ top: elem.top, left: elem.left }}
            animate={{
              y: [-25, 25, -25],
              x: [-10, 10, -10],
              rotate: [0, elem.rotate, 0],
              opacity: [0.3, 0.75, 0.3],
              scale: [0.95, 1.1, 0.95]
            }}
            transition={{
              duration: elem.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: elem.delay,
            }}
            className={`absolute ${elem.size} text-amber-200/60 drop-shadow-[0_0_12px_rgba(212,175,55,0.4)] filter transform-gpu`}
            title={elem.label}
          >
            {elem.icon}
          </motion.div>
        ))}
      </div>

      {/* Subtle Rising Steam Particles Overlay */}
      <div className="hidden md:flex absolute bottom-0 left-1/2 -translate-x-1/2 space-x-12 opacity-30 pointer-events-none">
        <span className="w-2 h-32 bg-gradient-to-t from-amber-100/40 via-amber-200/20 to-transparent rounded-full blur-md animate-steam" />
        <span className="w-3 h-44 bg-gradient-to-t from-amber-100/50 via-amber-200/25 to-transparent rounded-full blur-lg animate-steam [animation-delay:1s]" />
        <span className="w-2 h-36 bg-gradient-to-t from-amber-100/40 via-amber-200/20 to-transparent rounded-full blur-md animate-steam [animation-delay:2s]" />
      </div>
    </div>
  );
};

export default AmbientBackground;
