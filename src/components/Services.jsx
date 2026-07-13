import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { services } from '../data/services';
import { 
  FaUtensils, 
  FaMotorcycle, 
  FaShoppingBag, 
  FaBirthdayCake, 
  FaUsers, 
  FaBoxOpen, 
  FaBriefcase, 
  FaClipboardList, 
  FaCalendarCheck,
  FaArrowRight
} from 'react-icons/fa';

// Map icon strings to React Components
const iconMap = {
  FaUtensils: <FaUtensils />,
  FaMotorcycle: <FaMotorcycle />,
  FaShoppingBag: <FaShoppingBag />,
  FaBirthdayCake: <FaBirthdayCake />,
  FaUsers: <FaUsers />,
  FaBoxOpen: <FaBoxOpen />,
  FaBriefcase: <FaBriefcase />,
  FaClipboardList: <FaClipboardList />,
  FaCalendarCheck: <FaCalendarCheck />
};

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-extrabold text-3xl sm:text-4xl text-darkText"
          >
            Services We Offer
          </motion.h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
          <p className="text-grayText mt-4 text-sm sm:text-base">
            From intimate coffee dates to grand celebrations, we provide professional hospitality services tailored to your taste in Islampur.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(183, 110, 43, 0.12)" }}
              className="bg-lightBg p-8 rounded-3xl border border-primary/5 hover:border-primary/20 hover:bg-white transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary text-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {iconMap[service.icon]}
                </div>
                
                {/* Service Details */}
                <h3 className="font-heading font-bold text-xl text-darkText group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-grayText text-sm sm:text-base mt-3 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Call to Action indicator */}
              <div className="mt-6 flex items-center space-x-1.5 text-primary text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Inquire Now</span>
                <FaArrowRight className="text-[10px]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Table Reservation Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-primary to-primary-dark p-8 md:p-12 rounded-3xl shadow-premium text-white flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Table Reservation
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl mt-4 leading-tight">
              Planning a Special Dinner? Book a Table Today!
            </h3>
            <p className="text-white/80 text-sm sm:text-base mt-2 max-w-xl font-light">
              Reserve your spot in advance and get a complimentary dessert on your arrival. Perfect for dates, birthdays, and family get-togethers.
            </p>
          </div>
          
          <Link
            to="contact"
            smooth={true}
            duration={800}
            offset={-70}
            className="cursor-pointer bg-white text-primary hover:bg-secondary font-bold text-sm px-8 py-4 rounded-full shadow-md transition-all duration-300 hover:scale-105"
          >
            Book Table Online
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
