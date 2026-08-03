import React, { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaLock } from 'react-icons/fa';
import { config } from '../data/config';

const Logo = ({ className = "w-10 h-10" }) => (
  <svg className={`${className} bg-secondary/80 rounded-full p-1 border border-primary/20 group-hover:scale-105 transition-transform duration-300`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  const [activeSection, setActiveSection] = useState('home');

  const phoneNum = dynamicConfig?.phone || '7721802321';
  const whatsappUrl = `https://wa.me/91${phoneNum}`;
  const phoneCallLink = `tel:+91${phoneNum}`;
  const phoneFormatted = phoneNum.length === 10 
    ? `+91 ${phoneNum.slice(0, 5)} ${phoneNum.slice(5)}` 
    : phoneNum;

  const cafeTitle = dynamicConfig?.title || 'Ambika Cafe';
  const titleParts = cafeTitle.split(' ');
  const titleFirst = titleParts[0] || 'Ambika';
  const titleRest = titleParts.slice(1).join(' ') || 'Cafe';

  useEffect(() => {
    const handleScroll = () => {
      // Toggle navbar background glass state
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll Spy Implementation
      const sections = ['home', 'menu', 'about', 'contact'];
      const scrollPosition = window.scrollY + 120; // 120px offset offset to match navbar height

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger on mount to capture initial section state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    
    // If clicking Menu, ensure category is reset to 'all'
    if (targetId === 'menu' && setActiveCategory) {
      setActiveCategory('all');
    }

    const el = document.getElementById(targetId);
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

    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'glass-nav py-3 shadow-premium'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, 'home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <Logo />
            <span className={`font-heading font-black text-xl sm:text-2xl tracking-wider transition-colors duration-300 ${
              isScrolled ? 'text-accent' : 'text-primary'
            }`}>
              {titleFirst} <span className={isScrolled ? 'text-primary' : 'text-white'}>{titleRest}</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleSmoothScroll(e, link.id)}
                className={`font-heading font-bold uppercase tracking-wider text-xs cursor-pointer transition-all duration-300 py-1 border-b-2 hover:text-primary ${
                  activeSection === link.id
                    ? 'text-primary border-primary'
                    : 'border-transparent ' + (isScrolled ? 'text-darkText' : 'text-white')
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact CTAs Removed */}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 focus:outline-none transition-colors duration-300 hover:text-primary ${
              isScrolled ? 'text-accent' : 'text-primary'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-secondary shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full py-6 px-5 justify-between">
          <div>
            {/* Mobile Header */}
            <div className="flex items-center justify-between border-b border-primary/10 pb-4 mb-6">
              <div className="flex items-center space-x-3">
                <Logo className="w-8 h-8" />
                <span className="font-heading font-black text-lg text-accent">
                  {titleFirst} <span className="text-primary">{titleRest}</span>
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-darkText hover:text-primary p-1"
                aria-label="Close menu"
              >
                <HiX className="text-2xl" />
              </button>
            </div>

            {/* Mobile Links */}
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleSmoothScroll(e, link.id)}
                  className={`font-heading font-bold uppercase tracking-wider text-sm py-2 cursor-pointer transition-all duration-300 border-l-4 pl-3 rounded ${
                    activeSection === link.id
                      ? 'text-primary border-primary bg-primary/5'
                      : 'text-darkText border-transparent hover:text-primary hover:border-primary/20'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/admin"
                className="font-heading font-bold uppercase tracking-wider text-sm py-2 cursor-pointer transition-all duration-300 border-l-4 pl-3 rounded text-darkText border-transparent hover:text-primary hover:border-primary/20 flex items-center space-x-2"
              >
                <FaLock className="text-xs text-primary/70" />
                <span>Management Portal</span>
              </a>
            </nav>
          </div>


        </div>
      </div>

      {/* Backdrop for mobile drawer */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 transition-opacity lg:hidden"
        />
      )}
    </header>
  );
};

export default Navbar;
export { Logo };
