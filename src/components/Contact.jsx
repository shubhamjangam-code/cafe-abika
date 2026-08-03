import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { config } from '../data/config';

const Contact = ({ dynamicConfig }) => {
  const phoneNum = dynamicConfig?.phone || config.phone;
  const addressText = dynamicConfig?.address || config.address;
  const hoursText = dynamicConfig?.hours || config.hours;
  const whatsappUrl = `https://wa.me/91${phoneNum}`;
  const phoneFormatted = phoneNum.length === 10 
    ? `+91 ${phoneNum.slice(0, 5)} ${phoneNum.slice(5)}` 
    : phoneNum;

  return (
    <section id="contact" className="scroll-mt-20 py-24 bg-white relative z-10">
      
      {/* Decorative top border wave */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-secondary/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-black text-3xl sm:text-4xl text-accent tracking-wide"
          >
            Visit & Contact Us
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary via-gold to-accent mx-auto mt-4 rounded-full" />
          <p className="text-grayText mt-4 text-sm sm:text-base font-sans font-light">
            We'd love to serve you. Reach out for orders, queries, or drop by to enjoy fresh food and divine vibes.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column - Contact Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-secondary/40 rounded-3xl p-8 border border-primary/10 space-y-8 shadow-sm h-full flex flex-col justify-between">
              
              <div className="space-y-6">
                <h3 className="font-heading font-bold text-xl text-accent mb-4">
                  Contact Info
                </h3>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary text-base flex-shrink-0 mt-0.5 border border-primary/10">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-accent text-sm uppercase tracking-wider">Address</h4>
                    <p className="text-grayText text-xs sm:text-sm mt-1 leading-relaxed font-sans font-light">
                      {addressText}
                    </p>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600 text-base flex-shrink-0 mt-0.5 border border-emerald-500/20">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-accent text-sm uppercase tracking-wider">Phone & Direct Orders</h4>
                    <a href={`tel:+91${phoneNum}`} className="text-emerald-700 font-bold text-sm sm:text-base hover:underline block mt-1">
                      {phoneFormatted}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary text-base flex-shrink-0 mt-0.5 border border-primary/10">
                    <FaClock />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-accent text-sm uppercase tracking-wider">Opening Hours</h4>
                    <p className="text-grayText text-xs sm:text-sm mt-1 font-sans font-light">
                      {hoursText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-primary/10">
                <a
                  href={`tel:+91${phoneNum}`}
                  className="flex-1 inline-flex items-center justify-center space-x-2 bg-accent hover:bg-primary text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-sm"
                >
                  <FaPhoneAlt />
                  <span>Call Now</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-sm"
                >
                  <FaWhatsapp className="text-sm" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Column - Map */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden shadow-premium border border-primary/10 h-80 lg:h-full min-h-[320px] bg-secondary relative">
              {/* Subtle gold framing */}
              <div className="absolute inset-0 border-2 border-gold/10 pointer-events-none rounded-3xl z-10" />
              <iframe
                title="Ambika Cafe Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15250.720337851216!2d74.2562479422026!3d17.039864700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc106d3381a95e7%3A0xb304b73b5443fa3d!2sIslampur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[20%] contrast-[110%] relative z-0"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
