import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { config } from '../data/config';

const Contact = ({ dynamicConfig }) => {
  const phoneNum = dynamicConfig?.phone || '7721802321';
  const addressText = dynamicConfig?.address || config.address;
  const hoursText = dynamicConfig?.hours || config.hours;
  const whatsappUrl = `https://wa.me/91${phoneNum}`;
  const phoneFormatted = phoneNum.length === 10 
    ? `+91 ${phoneNum.slice(0, 5)} ${phoneNum.slice(5)}` 
    : phoneNum;

  return (
    <section id="contact" className="scroll-mt-20 py-20 bg-[#140E0C]/90 relative z-10 text-[#FAF5EC] border-t border-gold/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-1.5 bg-gold/10 text-amber-300 px-4 py-1.5 rounded-full text-xs font-heading font-semibold uppercase tracking-widest mb-4 border border-gold/30 shadow-sm"
          >
            <span>Visit Us • Quick Details</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-gold to-amber-300 tracking-wide"
          >
            Visit & Contact Us
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary via-gold to-amber-400 mx-auto mt-4 rounded-full" />
          <p className="text-amber-100/80 mt-4 text-sm sm:text-base font-sans font-light">
            We'd love to serve you. Reach out for orders, queries, or drop by to enjoy fresh food and divine vibes.
          </p>
        </div>

        {/* Contact Details Card - Centered & Balanced */}
        <div className="bg-[#1C1412]/85 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-gold/20 shadow-2xl hover:border-gold/40 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Phone & WhatsApp Contact */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
              <div className="p-4 bg-emerald-950/60 text-emerald-400 rounded-2xl text-xl border border-emerald-500/30">
                <FaWhatsapp />
              </div>
              <div>
                <h4 className="font-heading font-bold text-amber-300 text-sm uppercase tracking-wider">Phone & WhatsApp</h4>
                <p className="text-amber-100/80 text-xs sm:text-sm mt-1 font-sans font-light">
                  <a 
                    href={`tel:+91${phoneNum}`} 
                    className="font-bold text-amber-200 hover:text-gold transition-colors inline-block text-base"
                  >
                    {phoneFormatted}
                  </a>
                </p>
              </div>
              <div className="flex items-center flex-wrap justify-center md:justify-start gap-2 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md border border-emerald-400/30 transition-all duration-300 hover:scale-105"
                >
                  <FaWhatsapp className="text-sm" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:+91${phoneNum}`}
                  className="inline-flex items-center space-x-1.5 bg-gold/10 hover:bg-gold hover:text-black text-amber-300 border border-gold/30 text-xs font-semibold px-4 py-2 rounded-full shadow-md transition-all duration-300 hover:scale-105"
                >
                  <FaPhoneAlt className="text-[10px]" />
                  <span>Call Direct</span>
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 border-t md:border-t-0 md:border-l border-gold/15 pt-6 md:pt-0 md:pl-8">
              <div className="p-4 bg-gold/10 text-gold rounded-2xl text-xl border border-gold/20">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4 className="font-heading font-bold text-amber-300 text-sm uppercase tracking-wider">Address</h4>
                <p className="text-amber-100/80 text-xs sm:text-sm leading-relaxed font-sans font-light mt-1">
                  {addressText}
                </p>
              </div>
              <a
                href={dynamicConfig?.googleMapsUrl || config.googleMapsUrl || "https://maps.app.goo.gl/tRvpkgNfSYfsAEgf7"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-amber-300 hover:text-gold font-bold underline decoration-gold/50 transition-colors pt-1"
              >
                <FaMapMarkerAlt className="text-[10px]" />
                <span>Open in Google Maps →</span>
              </a>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 border-t md:border-t-0 md:border-l border-gold/15 pt-6 md:pt-0 md:pl-8">
              <div className="p-4 bg-gold/10 text-gold rounded-2xl text-xl border border-gold/20">
                <FaClock />
              </div>
              <div>
                <h4 className="font-heading font-bold text-amber-300 text-sm uppercase tracking-wider">Opening Hours</h4>
                <p className="text-amber-100/80 text-xs sm:text-sm mt-1 font-sans font-light leading-relaxed">
                  {hoursText}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
