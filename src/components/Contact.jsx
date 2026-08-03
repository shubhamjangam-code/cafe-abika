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
    <section id="contact" className="scroll-mt-20 py-24 bg-[#140E0C]/90 relative z-10 text-[#FAF5EC] border-t border-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-1.5 bg-gold/10 text-amber-300 px-4 py-1.5 rounded-full text-xs font-heading font-semibold uppercase tracking-widest mb-4 border border-gold/30 shadow-sm"
          >
            <span>Visit Us • Quick Location</span>
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

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column - Contact Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-[#1C1412]/85 backdrop-blur-md rounded-3xl p-8 border border-gold/20 space-y-6 shadow-2xl h-full flex flex-col justify-between hover:border-gold/40 transition-colors">
              
              <div className="space-y-6">
                <h3 className="font-heading font-bold text-xl text-amber-200 mb-4">
                  Contact Info
                </h3>

                {/* Phone & WhatsApp Contact */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-950/60 text-emerald-400 rounded-xl text-base flex-shrink-0 mt-0.5 border border-emerald-500/30">
                    <FaWhatsapp className="text-lg" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-amber-300 text-sm uppercase tracking-wider">Phone & WhatsApp</h4>
                    <p className="text-amber-100/80 text-xs sm:text-sm mt-0.5 font-sans font-light">
                      <a 
                        href={`tel:+91${phoneNum}`} 
                        className="font-bold text-amber-200 hover:text-gold transition-colors inline-block"
                      >
                        {phoneFormatted}
                      </a>
                    </p>
                    <div className="mt-3 flex items-center flex-wrap gap-3">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-full min-h-[44px] shadow-md border border-emerald-400/30 transition-all duration-300"
                      >
                        <FaWhatsapp className="text-sm" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={`tel:+91${phoneNum}`}
                        className="inline-flex items-center space-x-1.5 bg-gold/10 hover:bg-gold hover:text-black text-amber-300 border border-gold/30 text-xs font-semibold px-4 py-2 rounded-full min-h-[44px] shadow-md transition-all duration-300"
                      >
                        <FaPhoneAlt className="text-[10px]" />
                        <span>Call Direct</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gold/10 text-gold rounded-xl text-base flex-shrink-0 mt-0.5 border border-gold/20">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-amber-300 text-sm uppercase tracking-wider">Address</h4>
                    <p className="text-amber-100/80 text-xs sm:text-sm leading-relaxed font-sans font-light">
                      {addressText}
                    </p>
                    <a
                      href={dynamicConfig?.googleMapsUrl || config.googleMapsUrl || "https://maps.app.goo.gl/tRvpkgNfSYfsAEgf7"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs text-amber-300 hover:text-gold font-bold underline decoration-gold/50 transition-colors pt-1"
                    >
                      <FaMapMarkerAlt className="text-[10px]" />
                      <span>Get Directions on Google Maps →</span>
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gold/10 text-gold rounded-xl text-base flex-shrink-0 mt-0.5 border border-gold/20">
                    <FaClock />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-amber-300 text-sm uppercase tracking-wider">Opening Hours</h4>
                    <p className="text-amber-100/80 text-xs sm:text-sm mt-1 font-sans font-light">
                      {hoursText}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Interactive Map Container with Direct Link */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gold/20 h-80 lg:h-full min-h-[340px] bg-[#120D0B] relative group">
              {/* Subtle gold framing */}
              <div className="absolute inset-0 border-2 border-gold/20 pointer-events-none rounded-3xl z-10" />
              
              {/* Floating Overlay Button */}
              <a
                href={dynamicConfig?.googleMapsUrl || config.googleMapsUrl || "https://maps.app.goo.gl/tRvpkgNfSYfsAEgf7"}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 z-20 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs px-4 py-2.5 rounded-full shadow-xl flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
              >
                <FaMapMarkerAlt />
                <span>Open in Google Maps</span>
              </a>

              <iframe
                title="Ambika Cafe Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15250.720337851216!2d74.2562479422026!3d17.039864700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc106d3381a95e7%3A0xb304b73b5443fa3d!2sIslampur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[30%] invert-[90%] hue-rotate-180 contrast-[110%] relative z-0"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
