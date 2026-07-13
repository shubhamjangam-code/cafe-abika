import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const categoryCards = [
  {
    id: 'coffee',
    name: 'Coffee & Tea',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=300',
    count: '4 Items'
  },
  {
    id: 'breakfast',
    name: 'Breakfast & Snacks',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=300',
    count: '3 Items'
  },
  {
    id: 'pizza',
    name: 'Premium Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300',
    count: '2 Items'
  },
  {
    id: 'burger',
    name: 'Burgers & Sandwiches',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300',
    count: '2 Items'
  },
  {
    id: 'south-indian',
    name: 'South Indian',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=300',
    count: '2 Items'
  },
  {
    id: 'punjabi',
    name: 'Punjabi Special',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=300',
    count: '2 Items'
  },
  {
    id: 'chinese',
    name: 'Chinese Delight',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=300',
    count: '2 Items'
  },
  {
    id: 'shakes',
    name: 'Milkshakes & Drinks',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=300',
    count: '2 Items'
  },
  {
    id: 'desserts',
    name: 'Desserts & Waffles',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&q=80&w=300',
    count: '2 Items'
  }
];

const Categories = ({ onSelectCategory }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-extrabold text-2xl sm:text-3xl text-darkText"
          >
            Explore Popular Categories
          </motion.h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-3 rounded-full" />
        </div>

        {/* Carousel / Grid layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4">
          {categoryCards.map((cat, i) => (
            <Link
              key={cat.id}
              to="menu"
              spy={true}
              smooth={true}
              offset={-70}
              duration={800}
              onClick={() => onSelectCategory(cat.id)}
              className="cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="group relative h-28 sm:h-32 rounded-xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300"
              >
                {/* Background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-3 text-white">
                  <h3 className="font-heading font-bold text-xs sm:text-sm leading-snug group-hover:text-primary transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-gray-300 font-light mt-0.5">
                    {cat.count}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;
