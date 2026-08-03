import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { config } from '../data/config';

const Hero = ({ dynamicConfig }) => {
  const phoneNum = dynamicConfig?.phone || '7721802321';
  const whatsappUrl = `https://wa.me/91${phoneNum}`;
  const subtitleText = dynamicConfig?.subtitle || 'Ambika Cafe serves delicious fast food, refreshing beverages, and warm memories.';

  return (
    <section 
      id="home" 
      className="relative min-h-[85vh] pt-28 pb-16 w-full flex items-center justify-center overflow-hidden bg-[#120D0B]"
    >
      {/* Atmospheric Live Cafe Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center animate-zoom-bg opacity-75 transform-gpu"
        style={{ 
          backgroundImage: "url('/ambika_cafe_ultra_luxury_hero.png')" 
        }}
      />
      
      {/* Devotional Mandala Layer Overlay */}
      <div className="absolute inset-0 mandala-pattern opacity-15 z-10" />

      {/* Subtle Warm Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#120D0B] z-10" />

      {/* Main Content Area */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
        
        {/* Compact Glass Venue Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 bg-[#1C1412]/80 backdrop-blur-md text-amber-200 px-4 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-widest mb-4 border border-[rgba(212,175,55,0.3)] shadow-lg"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-amber-200">100% Pure Veg • Islampur</span>
        </motion.div>

        {/* Compact Ultra-Premium Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-heading font-black text-white tracking-wide leading-tight uppercase"
        >
          <span className="text-2xl sm:text-4xl md:text-5xl block text-amber-100 font-heading tracking-wider">
            Good Food <span className="text-amber-400">•</span> Good Vibes
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 tracking-widest block mt-1 text-3xl sm:text-5xl md:text-6xl font-black">
            Divine Taste
          </span>
        </motion.h1>

        {/* Compact Horizontal Glass Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-2xl"
        >
          <span className="bg-[#1C1412]/85 backdrop-blur-xl border border-[rgba(212,175,55,0.25)] text-amber-200 text-xs px-3.5 py-1.5 rounded-full font-medium inline-flex items-center space-x-1.5 shadow-sm">
            <span>☕</span>
            <span>Specialty Chai & Coffee</span>
          </span>
          <span className="bg-[#1C1412]/85 backdrop-blur-xl border border-[rgba(212,175,55,0.25)] text-amber-200 text-xs px-3.5 py-1.5 rounded-full font-medium inline-flex items-center space-x-1.5 shadow-sm">
            <span>🍔</span>
            <span>Gourmet Fast Food</span>
          </span>
          <span className="bg-[#1C1412]/85 backdrop-blur-xl border border-[rgba(212,175,55,0.25)] text-amber-200 text-xs px-3.5 py-1.5 rounded-full font-medium inline-flex items-center space-x-1.5 shadow-sm">
            <span>🌿</span>
            <span>Cozy Casual Hangout</span>
          </span>
        </motion.div>

        {/* Sleek Action CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-7"
        >
          <a
            href="#menu"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('menu');
              if (el) {
                const offset = 70;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = el.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
            className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-heading tracking-wider text-xs font-black px-7 py-3 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105 uppercase cursor-pointer"
          >
            <span>Explore Menu</span>
            <FaArrowRight className="text-xs" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
