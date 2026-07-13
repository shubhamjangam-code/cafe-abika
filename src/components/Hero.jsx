import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa';
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
        

        {/* Large Premium Devotional-Blend Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-heading font-black text-white tracking-wide leading-tight text-shadow-premium uppercase"
        >
          <span className="text-xl sm:text-3xl md:text-4xl block sm:inline">Good Food <span className="text-primary">.</span> Good Vibes</span>
          <span className="text-gold tracking-widest block mt-2 text-3xl sm:text-5xl md:text-6xl font-heading">Divine Taste</span>
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-secondary-dark max-w-2xl font-light leading-relaxed"
        >
          {subtitleText}
        </motion.p>

        {/* Buttons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md sm:max-w-none"
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
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-accent hover:bg-accent-dark text-white font-heading tracking-wider text-sm font-bold px-8 py-4 rounded-full shadow-premium hover:scale-105 transition-all duration-300 border border-primary/20"
          >
            <FaWhatsapp className="text-lg animate-bounce" />
            <span>Order on WhatsApp</span>
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
