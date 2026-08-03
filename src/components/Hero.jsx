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
      {/* Zooming Cafe Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center animate-zoom-bg opacity-50"
        style={{ 
          backgroundImage: "url('/maharashtrian_cafe.png')" 
        }}
      />
      
      {/* Devotional Mandala Layer Overlay (Golden Saffron theme) */}
      <div className="absolute inset-0 mandala-pattern opacity-30 z-10" />

      {/* Dark Overlay Gradient (maroon/black/saffron) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2C1819]/90 via-[#2C1819]/70 to-[#1c0f10] z-10" />

      {/* Subtle Bottom Gold Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary/10 to-transparent z-10 pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
        
        {/* Category / Venue Type Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-primary/20 backdrop-blur-md text-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-heading font-bold uppercase tracking-widest mb-6 border border-primary/40 shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>100% Pure Veg Casual Cafe & Beverage Bar</span>
        </motion.div>

        {/* Large Premium Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-heading font-black text-white tracking-wide leading-tight text-shadow-premium uppercase"
        >
          <span className="text-xl sm:text-3xl md:text-4xl block font-semibold text-secondary-dark">
            Fresh Casual Bites <span className="text-primary">•</span> Artisan Drinks
          </span>
          <span className="text-gold tracking-widest block mt-2 text-3xl sm:text-5xl md:text-6xl font-heading">
            Your Favorite Veg Cafe
          </span>
        </motion.h1>

        {/* Clear Subtitle Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-secondary-dark max-w-2xl font-light leading-relaxed"
        >
          Islampur's go-to casual eatery for 100% pure vegetarian fast food & handcrafted beverages. From gourmet grilled sandwiches and crispy burgers to artisan kulhad chai, cold coffee, and thick shakes — crafted fresh for great food and quick hangouts.
        </motion.p>

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
