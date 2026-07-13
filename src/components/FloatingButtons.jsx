import React from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { config } from '../data/config';

const FloatingButtons = ({ dynamicConfig }) => {
  const phoneNum = dynamicConfig?.phone || '7721802321';
  const whatsappUrl = `https://wa.me/91${phoneNum}?text=${encodeURIComponent("Hi Ambika Cafe, I'd like to place an order.")}`;
  const phoneCallLink = `tel:+91${phoneNum}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col space-y-3.5">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative group"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping -z-10" />
        <FaWhatsapp className="text-2xl" />
        {/* Tooltip */}
        <span className="absolute left-14 bg-[#2C1819] text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md font-sans">
          Chat on WhatsApp
        </span>
      </a>

      {/* Call Button */}
      <a
        href={phoneCallLink}
        className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative group"
        aria-label="Call Ambika Cafe"
      >
        <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping -z-10" />
        <FaPhoneAlt className="text-lg" />
        {/* Tooltip */}
        <span className="absolute left-14 bg-[#2C1819] text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md font-sans">
          Call Now
        </span>
      </a>
    </div>
  );
};

export default FloatingButtons;
