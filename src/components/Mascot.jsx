import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const jokes = [
  "Keep calm and eat Vada Pav! 🌶️🍔",
  "Misal is so spicy it will reset your life choices. 🔥😅",
  "Relationship status: Committed to Cutting Chai! ☕❤️",
  "I'm just a Vada Pav, standing in front of a hungry human. 🥺",
  "You can't buy happiness, but you can buy Poha. Same thing! 💛",
  "My doctor said I need more spice in my life. Double Misal it is! 🌶️",
  "Vada Pav + Cutting Chai = Eternal Peace. 🧘‍♂️✨",
  "Diet starts tomorrow... but today is Vada Pav day! 🤫",
  "Life is short, make it spicy! 🔥"
];

const Mascot = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);

  const handleClick = () => {
    setIsWiggling(true);
    // Get a new random quote
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * jokes.length);
    } while (nextIndex === quoteIndex && jokes.length > 1);
    setQuoteIndex(nextIndex);
    
    // Reset wiggle after animation completes
    setTimeout(() => setIsWiggling(false), 500);
  };

  return (
    <div className="fixed bottom-[84px] right-5 z-40 flex flex-col items-end pointer-events-none">
      {/* Speech Bubble with Dark Glass Styling */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="mb-3 bg-[#1C1412]/95 backdrop-blur-xl text-amber-100 border border-[rgba(212,175,55,0.4)] rounded-2xl p-3.5 shadow-[0_0_25px_rgba(212,175,55,0.25)] text-xs font-semibold max-w-[200px] text-center relative pointer-events-auto cursor-pointer select-none font-sans"
            onClick={handleClick}
          >
            {/* Speech bubble pointer */}
            <div className="absolute bottom-[-6px] right-8 w-3 h-3 bg-[#1C1412] border-r border-b border-[rgba(212,175,55,0.4)] rotate-45" />
            {jokes[quoteIndex]}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ultra-Premium Glass Capsule Pod Button */}
      <motion.div
        className="pointer-events-auto cursor-pointer group flex items-center space-x-2.5 bg-[#1C1412]/90 backdrop-blur-xl border border-[rgba(212,175,55,0.35)] hover:border-amber-400 px-3.5 py-2 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
        onMouseEnter={() => setShowBubble(true)}
        onMouseLeave={() => setShowBubble(false)}
        onClick={handleClick}
        animate={isWiggling ? {
          rotate: [0, -10, 10, -10, 10, 0],
          scale: [1, 1.05, 1.05, 1.05, 1.05, 1]
        } : {
          y: [0, -4, 0]
        }}
        transition={isWiggling ? {
          duration: 0.5
        } : {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Left Side Avatar Frame */}
        <div className="w-10 h-10 rounded-full bg-black/50 border border-gold/40 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
          <svg className="w-9 h-9 drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Heat steam lines rising */}
            <path d="M42 20 C40 14 44 12 42 6" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" fill="none" className="opacity-70 animate-pulse" />
            <path d="M50 18 C48 12 52 10 50 4" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" fill="none" className="opacity-70 animate-pulse" />
            <path d="M58 20 C56 14 60 12 58 6" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" fill="none" className="opacity-70 animate-pulse" />

            {/* Pav Top (Bun) */}
            <path d="M20 50 C20 30 35 24 50 24 C65 24 80 30 80 50 C80 54 20 54 20 50 Z" fill="#E8A87C" stroke="#7C5030" strokeWidth="2" strokeLinejoin="round" />
            {/* Pav Top Shine highlight */}
            <path d="M30 34 C35 30 45 28 50 28" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />

            {/* Golden Vada Fritter inside */}
            <circle cx="50" cy="58" r="18" fill="#F4D068" stroke="#D4AF37" strokeWidth="2" />
            {/* Crispy texture dots */}
            <circle cx="40" cy="52" r="0.8" fill="#D4AF37" />
            <circle cx="60" cy="52" r="0.8" fill="#D4AF37" />
            <circle cx="48" cy="68" r="0.8" fill="#D4AF37" />

            {/* Cute face on Vada */}
            <circle cx="43" cy="55" r="2.5" fill="#2C1819" />
            <circle cx="42" cy="54" r="0.8" fill="#FFF" />
            <circle cx="57" cy="55" r="2.5" fill="#2C1819" />
            <circle cx="56" cy="54" r="0.8" fill="#FFF" />
            
            {/* Happy Mouth */}
            <path d="M47 62 Q50 66 53 62" stroke="#2C1819" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Cute Rosy Cheeks */}
            <circle cx="37" cy="59" r="2" fill="#FF8B94" opacity="0.8" />
            <circle cx="63" cy="59" r="2" fill="#FF8B94" opacity="0.8" />

            {/* Green chili tongue sticking out */}
            <path d="M51 63 C53 66 56 65 59 62 C60 61 61 59 62 58" stroke="#4CAF50" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M62 58 L64 55" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />

            {/* Pav Bottom (Bun) */}
            <path d="M20 64 C20 74 30 80 50 80 C70 80 80 74 80 64 C80 60 20 60 20 64 Z" fill="#D29063" stroke="#7C5030" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Right Side Text Labels */}
        <div className="flex flex-col text-left pr-1">
          <span className="text-[9px] font-heading font-black text-amber-400 tracking-widest uppercase leading-none">
            Ask Mascot
          </span>
          <span className="text-xs font-bold text-amber-100 font-sans tracking-tight mt-0.5 group-hover:text-gold transition-colors">
            Tap for Vibes ✨
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Mascot;
