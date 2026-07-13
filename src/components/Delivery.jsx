import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaPhoneAlt, FaWhatsapp, FaMotorcycle } from 'react-icons/fa';

const Delivery = () => {
  const deliveryPoints = [
    { title: "Free Home Delivery", desc: "No delivery charges on any orders above ₹200." },
    { title: "Superfast 30-Min Delivery", desc: "We deliver within 30 minutes in all sectors of Islampur." },
    { title: "Piping Hot & Fresh Food", desc: "Special double-insulated bags keep your pizzas and drinks fresh." },
    { title: "Strict Hygienic Packaging", desc: "Contactless cooking, sanitised bags, and tamper-proof packing seals." },
    { title: "Local Ward Delivery Coverage", desc: "Serving all residential areas, colleges, and offices in Islampur." }
  ];

  return (
    <section className="py-20 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Small Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <FaMotorcycle className="text-sm animate-pulse" />
              <span>Express Delivery</span>
            </div>

            {/* Title */}
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-darkText leading-tight">
              Hungry? Get Your Favorite Food Delivered At Your Doorstep!
            </h2>
            <p className="text-grayText mt-4 text-sm sm:text-base leading-relaxed">
              Why step out when you can enjoy premium cafe flavors from the comfort of your couch? We bring Islampur's best pizzas, coffees, burgers, and Punjabi combos directly to you. Fast, clean, and free!
            </p>

            {/* Points Checklist */}
            <div className="mt-8 space-y-4">
              {deliveryPoints.map((point, i) => (
                <div key={i} className="flex items-start space-x-3.5">
                  <FaCheckCircle className="text-accent text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading font-bold text-darkText text-base">
                      {point.title}
                    </h3>
                    <p className="text-grayText text-xs sm:text-sm mt-0.5">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
              <a
                href="https://wa.me/919876543210?text=Hi%20Cafe%20Delight,%20I'd%20like%20to%20order%20food%20for%20home%20delivery."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-full shadow-md transition-all duration-300 hover:scale-105"
              >
                <FaWhatsapp className="text-lg" />
                <span>Order on WhatsApp</span>
              </a>

              <a
                href="tel:+919876543210"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-full shadow-md transition-all duration-300 hover:scale-105"
              >
                <FaPhoneAlt className="text-sm" />
                <span>Call +91 98765 43210</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column - Illustration / Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Design circle backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] sm:w-[32rem] sm:h-[32rem] bg-primary/5 rounded-full -z-10" />
            
            <img
              src="https://images.unsplash.com/photo-1526367790999-0150786486a9?auto=format&fit=crop&q=80&w=800"
              alt="Cafe Delight Express Delivery Rider"
              className="rounded-3xl shadow-premium object-cover w-full h-[26rem] sm:h-[32rem] hover:scale-[1.01] transition-transform duration-500"
            />
            
            {/* Floating badge inside image */}
            <div className="absolute top-6 left-6 glass-card px-4 py-3 rounded-2xl shadow-premium flex items-center space-x-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-accent animate-ping absolute" />
              <span className="w-3.5 h-3.5 rounded-full bg-accent relative" />
              <span className="text-darkText font-bold text-xs sm:text-sm tracking-wide">
                Delivery Active in Islampur
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Delivery;
