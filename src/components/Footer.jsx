import React from 'react';
import { Link } from 'react-scroll';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { config } from '../data/config';
import { Logo } from './Navbar';

const Footer = ({ dynamicConfig }) => {
  const currentYear = new Date().getFullYear();
  const phoneNum = dynamicConfig?.phone || '7721802321';
  const whatsappUrl = `https://wa.me/91${phoneNum}`;
  const phoneFormatted = phoneNum.length === 10 
    ? `+91 ${phoneNum.slice(0, 5)} ${phoneNum.slice(5)}` 
    : phoneNum;

  const cafeTitle = dynamicConfig?.title || 'Ambika Cafe';
  const titleParts = cafeTitle.split(' ');
  const titleFirst = titleParts[0] || 'Ambika';
  const titleRest = titleParts.slice(1).join(' ') || 'Cafe';

  return (
    <footer className="bg-[#2C1819] text-secondary-dark pt-16 pb-8 border-t border-white/5 relative z-10">
      
      {/* Repeating subtle pattern overlay */}
      <div className="absolute inset-0 mandala-pattern opacity-[0.015] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upper Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5 items-center">
          
          {/* Column 1 - Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to="home" smooth={true} duration={800} className="flex items-center space-x-3 cursor-pointer group">
              <Logo className="w-10 h-10" />
              <span className="font-heading font-black text-2xl tracking-wider text-white">
                {titleFirst} <span className="text-primary">{titleRest}</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm max-w-sm leading-relaxed font-sans font-light">
              Serving delicious fast food, refreshing beverages, and warm memories in Islampur. Experience modern vibes blended with divine taste.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white font-heading font-bold text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'menu', label: 'Menu' },
                { id: 'about', label: 'About' },
                { id: 'contact', label: 'Contact' }
              ].map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.id}
                    smooth={true}
                    duration={800}
                    offset={-70}
                    className="text-gray-400 hover:text-primary text-xs sm:text-sm transition-colors duration-300 cursor-pointer font-heading font-bold uppercase tracking-wider"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/admin"
                  className="text-gray-400 hover:text-primary text-xs sm:text-sm transition-colors duration-300 cursor-pointer font-heading font-bold uppercase tracking-wider"
                >
                  Admin Panel
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Socials & Phone */}
          <div className="md:col-span-3 space-y-4 flex flex-col md:items-end">
            <div className="space-y-1 md:text-right">
              <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider block">Call / WhatsApp</span>
              <a href={`tel:${phoneNum}`} className="text-white hover:text-primary font-heading font-bold tracking-wide text-base transition-colors duration-300">
                {phoneFormatted}
              </a>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-3">
              {[
                { icon: <FaFacebookF />, url: "https://facebook.com", label: "Facebook" },
                { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
                { icon: <FaWhatsapp />, url: whatsappUrl, label: "WhatsApp" }
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center text-xs transition-all duration-300 hover:-translate-y-1"
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Lower Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs text-gray-500 space-y-4 sm:space-y-0">
          <p>© {currentYear} {cafeTitle}. All Rights Reserved.</p>
          <a
            href="/admin"
            className="text-gray-500 hover:text-primary transition-colors duration-300 font-heading text-[11px] tracking-widest uppercase font-bold"
          >
            Admin Panel
          </a>
          <p className="flex items-center space-x-1 font-heading text-[11px] tracking-widest text-primary/80 uppercase font-black">
            <span>Made with love and good vibes</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
