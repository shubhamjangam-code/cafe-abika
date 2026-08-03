import React, { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaLock, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { config } from '../data/config';

export const Logo = ({ className = "w-10 h-10" }) => (
  <svg className={`${className} bg-[#1C1412] rounded-full p-1 border border-gold/30 group-hover:scale-105 transition-transform duration-300 shadow-md`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Decorative outer golden dashed ring */}
    <circle cx="50" cy="50" r="44" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.7" />
    
    {/* Inner background glow */}
    <circle cx="50" cy="50" r="38" fill="#7A1A22" fillOpacity="0.05" />
    
    {/* Sleek Cafe Cup (Burgundy & Gold) */}
    <path d="M34 50 L38 72 C39 76 43 78 47 78 H53 C57 78 61 76 62 72 L66 50 H34 Z" fill="#7A1A22" stroke="#D4AF37" strokeWidth="2" strokeLinejoin="round" />
    
    {/* Cup Handle (Gold) */}
    <path d="M64 54 C71 54 74 58 74 62 C74 66 71 70 64 70" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" fill="none" />
    
    {/* Sleek Cup Saucer (Gold) */}
    <path d="M26 80 H74" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Navbar = ({ setActiveCategory, dynamicConfig }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const titleText = dynamicConfig?.title || config.cafeName || 'Ambika Cafe';
  const titleParts = titleText.split(' ');
  const titleFirst = titleParts[0] || 'Ambika';
  const titleRest = titleParts.slice(1).join(' ') || 'Cafe';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'menu', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (sectionId === 'menu' && setActiveCategory) {
      setActiveCategory('all');
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'menu', label: 'Our Menu' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#120D0B]/95 backdrop-blur-xl shadow-2xl py-3 border-b border-[rgba(212,175,55,0.2)]'
          : 'bg-gradient-to-b from-black/95 via-black/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, 'hero')}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <Logo className="w-10 h-10" />
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-wider text-amber-200">
                {titleFirst} <span className="text-primary">{titleRest}</span>
              </span>
              <span className="text-[10px] text-emerald-400 tracking-widest font-heading font-bold uppercase -mt-1 drop-shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                100% Pure Veg Cafe
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleSmoothScroll(e, link.id)}
                className={`font-heading font-bold uppercase tracking-wider text-xs transition-colors duration-300 relative py-1 cursor-pointer ${
                  activeSection === link.id
                    ? 'text-gold font-black'
                    : 'text-amber-100/80 hover:text-gold'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full shadow-[0_0_8px_#D4AF37]" />
                )}
              </a>
            ))}

            <a
              href="/admin"
              onClick={() => {
                sessionStorage.removeItem('admin_active_session');
                localStorage.removeItem('admin_session');
              }}
              className="font-heading font-bold uppercase tracking-wider text-xs transition-colors duration-300 flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-amber-200 border-gold/40 hover:border-gold hover:text-gold hover:bg-gold/15 shadow-sm"
              title="Admin Login"
            >
              <FaLock className="text-[10px] text-gold" />
              <span>Admin</span>
            </a>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2.5 rounded-xl focus:outline-none transition-colors duration-300 ${
              isScrolled ? 'text-accent bg-secondary/80' : 'text-white bg-black/40 backdrop-blur-sm border border-white/20'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Opaque Full-Screen Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[90] lg:hidden"
        />
      )}

      {/* Solid 100% Opaque Dark Mobile Drawer Menu */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-[100] w-4/5 max-w-xs bg-[#18110E] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col justify-between border-l border-gold/30 text-amber-100 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Mobile Drawer Header */}
          <div className="flex items-center justify-between border-b border-gold/20 pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <Logo className="w-9 h-9" />
              <div className="flex flex-col">
                <span className="font-heading font-black text-lg text-amber-200">
                  {titleFirst} <span className="text-primary">{titleRest}</span>
                </span>
                <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">
                  100% Pure Veg Cafe
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-amber-200 hover:text-gold bg-[#251B17] rounded-full border border-gold/20 shadow-xs transition-colors"
              aria-label="Close menu"
            >
              <HiX className="text-xl" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleSmoothScroll(e, link.id)}
                className={`font-heading font-bold uppercase tracking-wider text-sm py-3 px-4 rounded-xl flex items-center justify-between cursor-pointer transition-all duration-300 border ${
                  activeSection === link.id
                    ? 'bg-gradient-to-r from-primary to-amber-600 text-white border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-[#221815] text-amber-200 border-gold/20 hover:bg-[#2C1F1B]'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-gold">→</span>
              </a>
            ))}

            <a
              href="/admin"
              onClick={() => {
                sessionStorage.removeItem('admin_active_session');
                localStorage.removeItem('admin_session');
                setIsMobileMenuOpen(false);
              }}
              className="font-heading font-bold uppercase tracking-wider text-xs py-3 px-4 rounded-xl bg-[#221815] text-amber-200 border border-gold/30 hover:bg-[#2C1F1B] flex items-center justify-between mt-2"
            >
              <div className="flex items-center space-x-2">
                <FaLock className="text-xs text-gold" />
                <span>Admin Login</span>
              </div>
              <span className="text-xs text-gold">→</span>
            </a>
          </nav>
        </div>

        {/* Mobile Drawer Footer Actions */}
        <div className="p-6 border-t border-gold/20 bg-[#120D0B] space-y-2.5">
          <a
            href={`https://wa.me/91${dynamicConfig?.phone || config.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl shadow-md border border-emerald-400/30 transition-all"
          >
            <FaWhatsapp className="text-base" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`tel:+91${dynamicConfig?.phone || config.phone}`}
            className="w-full flex items-center justify-center space-x-2 bg-gold/10 hover:bg-gold hover:text-black text-amber-300 font-bold text-xs py-3 rounded-xl shadow-md border border-gold/30 transition-all"
          >
            <FaPhoneAlt className="text-xs" />
            <span>Call Shop Direct</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
