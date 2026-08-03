import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaClock, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { config } from '../data/config';

const Hero = ({ dynamicConfig }) => {
  const phoneNum = dynamicConfig?.phone || config.phone;
  const addressText = dynamicConfig?.address || config.address;
  const hoursText = dynamicConfig?.hours || config.hours;
  const phoneCallLink = `tel:+91${phoneNum}`;
  const phoneFormatted = phoneNum.length === 10 
    ? `+91 ${phoneNum.slice(0, 5)} ${phoneNum.slice(5)}` 
    : phoneNum;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-accent">
      {/* Zooming Cafe Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center animate-zoom-bg opacity-40"
        style={{ 
          backgroundImage: "url('/ambika_cafe_hero_bg.png')" 
        }}
      />
      
      {/* Devotional Mandala Layer Overlay (Golden Saffron theme) */}
      <div className="absolute inset-0 mandala-pattern opacity-30 z-10" />

      {/* Dark Vignette Overlay for Crisp Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/90 via-accent/75 to-accent/95 z-10" />

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center min-h-[75vh]">
        
        {/* Top Pure Veg Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
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

        {/* Call to Action Button */}
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
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white font-heading tracking-wider text-sm font-bold px-8 py-3.5 rounded-full shadow-premium hover:shadow-premium-hover cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <span>View Interactive Menu</span>
            <FaArrowRight className="text-xs" />
          </a>
        </motion.div>

        {/* Prominent Always-Visible Address & Opening Hours Glass Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8 bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 max-w-3xl w-full text-white shadow-2xl flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-left"
        >
          {/* Opening Hours */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-lg shrink-0">
              <FaClock />
            </div>
            <div>
              <span className="text-[10px] text-emerald-300 uppercase tracking-widest block font-bold">Live Opening Hours</span>
              <span className="text-xs sm:text-sm font-semibold text-white">{hoursText}</span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-white/20" />

          {/* Location */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center text-gold text-lg shrink-0">
              <FaMapMarkerAlt />
            </div>
            <div>
              <span className="text-[10px] text-amber-200 uppercase tracking-widest block font-bold">Cafe Address</span>
              <span className="text-xs sm:text-sm font-semibold text-white block">{addressText}</span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-white/20" />

          {/* Phone */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 text-lg shrink-0">
              <FaPhoneAlt />
            </div>
            <div>
              <span className="text-[10px] text-amber-200 uppercase tracking-widest block font-bold">Call / Orders</span>
              <a href={phoneCallLink} className="text-xs sm:text-sm font-bold text-amber-300 hover:text-white transition-colors block">
                {phoneFormatted}
              </a>
            </div>
          </div>
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
