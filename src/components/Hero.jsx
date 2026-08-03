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
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#1c0f10]"
    >
      {/* Atmospheric Live Cafe Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center animate-zoom-bg opacity-75"
        style={{ 
          backgroundImage: "url('/ambika_cafe_live_hero_bg.png')" 
        }}
      />
      
      {/* Devotional Mandala Layer Overlay */}
      <div className="absolute inset-0 mandala-pattern opacity-20 z-10" />

      {/* Weightless Floating Antigravity Particles Overlay */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        {/* Particle 1: Golden Ember / Dust particle */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/6 w-3 h-3 bg-gold/40 rounded-full blur-[1px] shadow-[0_0_10px_#D4AF37]"
        />
        {/* Particle 2: Floating Leaf Element */}
        <motion.div
          animate={{ y: [15, -25, 15], x: [10, -15, 10], rotate: [-10, 20, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-1/5 text-emerald-400/60 text-lg blur-[0.5px]"
        >
          🌿
        </motion.div>
        {/* Particle 3: Floating Golden Chip */}
        <motion.div
          animate={{ y: [-30, 20, -30], x: [-15, 15, -15], rotate: [15, -25, 15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-1/3 left-1/5 text-amber-300/50 text-xl blur-[0.5px]"
        >
          🥔
        </motion.div>
        {/* Particle 4: Rising Steam Effect */}
        <motion.div
          animate={{ y: [0, -40, -80], opacity: [0, 0.6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-16 h-24 bg-gradient-to-t from-white/20 via-white/10 to-transparent blur-md rounded-full"
        />
        {/* Particle 5: Shimmering Dust */}
        <motion.div
          animate={{ y: [25, -25, 25], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/5 right-1/4 w-2 h-2 bg-amber-200/50 rounded-full blur-[1px]"
        />
      </div>

      {/* Subtle Warm Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#1c0f10]/95 z-10" />

      {/* Subtle Bottom Gold Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary/10 to-transparent z-10 pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
        
        {/* Creative Venue Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md text-amber-200 px-5 py-2 rounded-full text-xs sm:text-sm font-heading font-bold uppercase tracking-widest mb-6 border border-gold/30 shadow-xl"
        >
          <span className="text-gold">✨</span>
          <span className="bg-gradient-to-r from-amber-200 via-gold to-amber-100 bg-clip-text text-transparent font-extrabold">
            Islampur's Favorite Chai & Fast Bites Spot
          </span>
        </motion.div>

        {/* Large Premium Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-heading font-black text-white tracking-wide leading-tight text-shadow-premium uppercase"
        >
          <span className="text-xl sm:text-3xl md:text-4xl block sm:inline text-secondary-dark">Good Food <span className="text-primary">•</span> Good Vibes</span>
          <span className="text-gold tracking-widest block mt-2 text-3xl sm:text-5xl md:text-6xl font-heading">Divine Taste</span>
        </motion.h1>

        {/* 3 Quick Value Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-xl text-xs text-amber-200 font-sans flex items-center justify-center space-x-2">
            <span>☕</span>
            <span className="font-semibold">Specialty Chai & Coffee</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-xl text-xs text-amber-200 font-sans flex items-center justify-center space-x-2">
            <span>🍔</span>
            <span className="font-semibold">Crispy Sandwiches & Fast Food</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-xl text-xs text-amber-200 font-sans flex items-center justify-center space-x-2">
            <span>🌿</span>
            <span className="font-semibold">Cozy Pure Veg Hangout</span>
          </div>
        </motion.div>

        {/* Buttons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md sm:max-w-none"
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
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white font-heading tracking-wider text-sm font-bold px-8 py-4 rounded-full shadow-premium hover:shadow-premium-hover cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <span>View Menu</span>
            <FaArrowRight className="text-xs" />
          </a>

        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center">
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
          className="cursor-pointer flex flex-col items-center"
        >
          <span className="text-secondary/60 text-[10px] tracking-widest uppercase mb-2 font-heading">Scroll Down</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-secondary/40 rounded-full flex justify-center p-1"
          >
            <div className="w-1.5 h-2 bg-primary rounded-full" />
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
