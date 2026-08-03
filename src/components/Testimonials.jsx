import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { testimonials } from '../data/testimonials';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  const stats = [
    { number: "5000+", label: "Happy Customers" },
    { number: "150+", label: "Menu Items" },
    { number: "10+", label: "Years Experience" },
    { number: "30 Min", label: "Average Delivery" }
  ];

  return (
    <section id="reviews" className="py-20 bg-[#18110E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-100"
          >
            What Our Customers Say
          </motion.h2>
          <div className="w-12 h-1 bg-gold mx-auto mt-4 rounded-full" />
          <p className="text-amber-200/70 mt-4 text-sm sm:text-base font-sans">
            Read real-time feedback from our food lovers in Islampur.
          </p>
        </div>

        {/* Swiper Slider Wrapper */}
        <div className="max-w-4xl mx-auto">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-16"
          >
            {testimonials.map((test) => (
              <SwiperSlide key={test.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-8 sm:p-12 shadow-premium border border-primary/5 relative mx-2"
                >
                  {/* Quote Icon */}
                  <FaQuoteLeft className="text-primary/10 text-6xl sm:text-7xl absolute top-6 left-6" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    
                    {/* Stars */}
                    <div className="flex space-x-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < Math.floor(test.rating) ? "text-yellow-500 text-lg" : "text-gray-200 text-lg"} 
                        />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-darkText italic text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                      "{test.review}"
                    </p>

                    {/* User profile details */}
                    <div className="mt-8 flex items-center space-x-4">
                      <img
                        src={test.avatar}
                        alt={test.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-primary shadow-sm"
                      />
                      <div className="text-left">
                        <h4 className="font-heading font-bold text-darkText text-base">
                          {test.name}
                        </h4>
                        <span className="text-primary font-medium text-xs tracking-wider block">
                          {test.role}
                        </span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Stats / Counters Block */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-primary/10 pt-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <span className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-primary block leading-none">
                {stat.number}
              </span>
              <span className="text-darkText font-medium text-xs sm:text-sm tracking-widest uppercase mt-3.5 block">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
