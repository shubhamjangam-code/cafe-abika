import React from 'react';
import { motion } from 'framer-motion';
import { FaTag, FaPercentage, FaPizzaSlice, FaClock } from 'react-icons/fa';

const offers = [
  {
    id: 1,
    title: "Weekend Flat 15% Off",
    code: "DELIGHT15",
    desc: "Get 15% discount on all orders above ₹499. Valid on Saturday & Sunday.",
    badge: "Discount",
    icon: <FaPercentage className="text-white" />,
    color: "from-amber-500 to-primary",
    whatsappMsg: "Hi Cafe Delight, I want to claim the Weekend Flat 15% Off discount using code DELIGHT15."
  },
  {
    id: 2,
    title: "Mega Family Combo",
    code: "FAMILY599",
    desc: "1 Paneer Tikka Pizza + 1 Club Sandwich + 2 Oreo Shakes at just ₹599 (Save ₹100!).",
    badge: "Combo Deal",
    icon: <FaPizzaSlice className="text-white" />,
    color: "from-emerald-500 to-accent",
    whatsappMsg: "Hi Cafe Delight, I want to order the Mega Family Combo for ₹599!"
  },
  {
    id: 3,
    title: "Today's Special Freebie",
    code: "FREEBREAD",
    desc: "Buy any Medium Pizza and get a portion of Cheesy Garlic Bread completely FREE!",
    badge: "Limited Offer",
    icon: <FaTag className="text-white" />,
    color: "from-blue-500 to-indigo-600",
    whatsappMsg: "Hi Cafe Delight, I want to claim Today's Special: Free Garlic Bread with my Medium Pizza order!"
  }
];

const OfferBanner = () => {
  const handleClaimOffer = (msg) => {
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="py-20 bg-lightBg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
          >
            <FaClock className="text-xs animate-spin" />
            <span>Limited Period Offers</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-extrabold text-3xl sm:text-4xl text-darkText"
          >
            Sizzling Special Offers
          </motion.h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-premium border border-primary/5 flex flex-col justify-between h-full group"
            >
              {/* Colored Header Banner */}
              <div className={`bg-gradient-to-r ${offer.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10 text-9xl">
                  {offer.icon}
                </div>
                
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {offer.badge}
                </span>
                
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl mt-4 leading-tight">
                  {offer.title}
                </h3>
              </div>

              {/* Offer Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-grayText text-sm sm:text-base leading-relaxed">
                    {offer.desc}
                  </p>
                  
                  {/* Coupon Code Box */}
                  <div className="mt-5 p-3.5 bg-secondary border border-primary/10 border-dashed rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-grayText font-medium uppercase tracking-wider block">Use Promo Code</span>
                      <span className="font-mono font-extrabold text-lg text-primary tracking-wider">{offer.code}</span>
                    </div>
                    <span className="text-xs font-semibold text-primary/70 uppercase">Copy Code</span>
                  </div>
                </div>

                {/* Claim Info */}
                <div className="mt-6 text-center py-3.5 px-5 bg-accent/10 border border-accent/20 rounded-xl text-accent font-heading font-bold text-xs uppercase tracking-wider">
                  Show code at counter to claim
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OfferBanner;
