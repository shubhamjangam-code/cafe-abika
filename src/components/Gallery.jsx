import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryCategories, galleryItems } from '../data/gallery';
import { FaEye, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [modalIndex, setModalIndex] = useState(null);

  const filteredItems = activeTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  const handleOpenModal = (index) => {
    setModalIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setModalIndex(null);
    document.body.style.overflow = 'unset';
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setModalIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setModalIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="py-20 bg-[#120D0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-100"
          >
            Visual Gallery
          </motion.h2>
          <div className="w-12 h-1 bg-gold mx-auto mt-4 rounded-full" />
          <p className="text-amber-200/70 mt-4 text-sm sm:text-base font-sans">
            Take a look at our freshly crafted items, cozy wooden interiors, and premium coffee setups.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex justify-center items-center space-x-2 overflow-x-auto pb-4 mb-10 -mx-4 px-4">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap ${
                activeTab === cat.id
                  ? 'bg-primary text-white shadow-premium'
                  : 'bg-lightBg text-darkText border border-gray-100 hover:border-primary/20 hover:bg-secondary'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleOpenModal(index)}
                className="group relative rounded-3xl overflow-hidden shadow-premium aspect-[4/3] cursor-pointer"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="p-3 bg-primary rounded-full text-lg shadow-lg mb-2"
                  >
                    <FaEye />
                  </motion.div>
                  <h3 className="font-heading font-bold text-base text-center">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-gray-300 uppercase tracking-widest mt-1">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {modalIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 text-white/80 hover:text-white p-2 text-2xl focus:outline-none transition-colors"
                aria-label="Close Lightbox"
              >
                <FaTimes />
              </button>

              {/* Navigation Left */}
              <button
                onClick={handlePrevImage}
                className="absolute left-6 text-white/60 hover:text-white p-3 text-2xl sm:text-3xl focus:outline-none transition-colors"
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </button>

              {/* Modal Image Wrapper */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl max-h-[80vh] flex flex-col items-center justify-center"
              >
                <img
                  src={filteredItems[modalIndex].image}
                  alt={filteredItems[modalIndex].title}
                  className="rounded-xl object-contain max-w-full max-h-[70vh] shadow-2xl border border-white/5"
                />
                <div className="text-center mt-4">
                  <h3 className="text-white font-heading font-bold text-lg sm:text-xl">
                    {filteredItems[modalIndex].title}
                  </h3>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 inline-block">
                    Category: {filteredItems[modalIndex].category}
                  </span>
                </div>
              </motion.div>

              {/* Navigation Right */}
              <button
                onClick={handleNextImage}
                className="absolute right-6 text-white/60 hover:text-white p-3 text-2xl sm:text-3xl focus:outline-none transition-colors"
                aria-label="Next image"
              >
                <FaChevronRight />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Gallery;
