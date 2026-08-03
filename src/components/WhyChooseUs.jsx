import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaTags, FaAward, FaMotorcycle, FaUserTie, FaUtensils, FaHeart, FaShieldAlt } from 'react-icons/fa';

const features = [
  {
    icon: <FaLeaf className="text-emerald-600" />,
    title: "100% Fresh Ingredients",
    desc: "We source our vegetables daily from local farms and use certified organic coffee beans for brewing."
  },
  {
    icon: <FaTags className="text-amber-600" />,
    title: "Affordable Pricing",
    desc: "Casual cafe vibe and fresh gourmet fast food at prices that are friendly to your wallet."
  },
  {
    icon: <FaAward className="text-yellow-600" />,
    title: "Premium Quality",
    desc: "Zero compromises on quality. We follow strict quality controls from ingredient sourcing to preparation."
  },
  {
    icon: <FaMotorcycle className="text-blue-600" />,
    title: "Fast 30-Min Delivery",
    desc: "Our delivery partners ensure your food reaches your doorstep piping hot and within 30 minutes in Islampur."
  },
  {
    icon: <FaUserTie className="text-purple-600" />,
    title: "Experienced Chefs",
    desc: "Our culinary experts have years of experience crafting traditional and modern fusion recipes."
  },
  {
    icon: <FaUtensils className="text-rose-600" />,
    title: "Best Taste Guarantee",
    desc: "Our unique spice blends and standardized recipes guarantee a rich taste you'll fall in love with."
  },
  {
    icon: <FaHeart className="text-red-500 animate-pulse" />,
    title: "Customer Satisfaction",
    desc: "Customer satisfaction is our ultimate goal. We strive to provide a memorable dining service every time."
  },
  {
    icon: <FaShieldAlt className="text-teal-600" />,
    title: "Hygienic Clean Kitchen",
    desc: "Our kitchen is sanitized daily. We observe clean cooking practices and pack food in food-grade boxes."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-[#18110E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-100"
          >
            What Makes Us Special?
          </motion.h2>
          <div className="w-12 h-1 bg-gold mx-auto mt-4 rounded-full" />
          <p className="text-amber-200/70 mt-4 text-sm sm:text-base font-sans">
            We are dedicated to providing the ultimate gastronomic experience in Islampur. Here is why our customers choose us.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(183, 110, 43, 0.15)" }}
              className="bg-lightBg rounded-2xl p-6 border border-primary/5 hover:border-primary/20 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm mb-5 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              
              {/* Content */}
              <h3 className="font-heading font-bold text-darkText text-base mb-2">
                {feat.title}
              </h3>
              <p className="text-grayText text-xs sm:text-sm leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
