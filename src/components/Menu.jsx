import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, menuItems as defaultMenuItems } from '../data/menu';
import { FaSearch, FaStar } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

const Menu = ({ activeCategory, setActiveCategory, dynamicConfig }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // Subscribe to Menu collection
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'menu'), (snapshot) => {
      if (snapshot.empty) {
        // Automatically seed with default menu items if Firestore is empty
        const seedData = async () => {
          try {
            for (const item of defaultMenuItems) {
              await setDoc(doc(db, 'menu', `item_${item.id}`), {
                name: item.name,
                description: item.description,
                price: Number(item.price),
                category: item.category,
                image: item.image,
                rating: Number(item.rating),
                isVeg: Boolean(item.isVeg),
                isPopular: Boolean(item.isPopular),
                isChefRecommendation: Boolean(item.isChefRecommendation)
              });
            }
          } catch (e) {
            console.error("Error seeding default menu:", e);
          }
        };
        seedData();
        setMenuItems(defaultMenuItems);
      } else {
        const itemsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMenuItems(itemsList);
      }
    }, (error) => {
      console.warn("Firestore menu fetch failed, falling back to static config:", error);
      setMenuItems(defaultMenuItems);
    });

    return () => unsubscribe();
  }, []);

  // Filter items whenever menuItems, activeCategory, searchQuery or vegOnly changes
  useEffect(() => {
    let result = menuItems;

    // Filter by Category
    if (activeCategory !== 'all') {
      result = result.filter(item => item.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by Veg status
    if (vegOnly) {
      result = result.filter(item => item.isVeg);
    }

    setFilteredItems(result);
  }, [menuItems, activeCategory, searchQuery, vegOnly]);

  const handleWhatsAppOrder = (itemName, price) => {
    const text = `Hi Ambika Cafe, I would like to order "${itemName}" (Rs. ${price}). Please confirm my order!`;
    const encodedText = encodeURIComponent(text);
    const phoneNum = dynamicConfig?.phone || '7721802321';
    window.open(`https://wa.me/91${phoneNum}?text=${encodedText}`, '_blank');
  };

  return (
    <section id="menu" className="scroll-mt-20 py-24 bg-lightBg relative z-10">
      {/* Decorative Top Arch SVG divider (devotional theme) */}
      <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center -translate-y-4">
        <svg className="w-48 h-8 fill-current text-primary/10" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M 0 0 C 30 15, 70 15, 100 0 L 100 20 L 0 20 Z" />
          <circle cx="50" cy="12" r="2" fill="#D4AF37" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-1.5 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-heading font-semibold uppercase tracking-widest mb-4 border border-primary/20"
          >
            <span>Freshly Prepared</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-black text-3xl sm:text-4xl text-accent tracking-wide"
          >
            Our Delicious Menu
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-gold to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Search & Filter Bar Container */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 bg-secondary/35 p-4 rounded-2xl border border-primary/10">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-grayText">
              <FaSearch className="text-sm" />
            </span>
            <input
              type="text"
              placeholder="Search dishes (e.g. Burger, Pizza, Coffee)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all bg-white"
            />
          </div>

          {/* Veg Only Toggle */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
            <span className="text-sm font-semibold text-accent font-sans">Vegetarian Only</span>
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                vegOnly ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  vegOnly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Horizontal Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-12 -mx-4 px-4 scrollbar-thin scrollbar-thumb-primary">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSearchQuery('');
              }}
              className={`px-6 py-3 rounded-full text-xs font-heading font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap border ${
                activeCategory === cat.id
                  ? 'bg-accent text-white border-accent shadow-premium scale-105'
                  : 'bg-white text-accent border-primary/10 hover:border-primary/30 hover:bg-secondary'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-premium border border-primary/10 flex flex-col h-full hover:border-primary/30 hover:shadow-premium-hover transition-all duration-300"
              >
                {/* Image & Badges */}
                <div className="relative h-48 overflow-hidden bg-secondary">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Veg / Non-Veg Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-primary/10 flex items-center space-x-1 shadow-sm">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider font-sans">
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
                    <FaStar className="text-yellow-500 text-xs" />
                    <span className="text-xs font-bold text-accent">{item.rating}</span>
                  </div>

                  {/* Popular or Chef Rec Badges */}
                  {item.isChefRecommendation && (
                    <div className="absolute bottom-3 left-3 bg-primary text-white text-[9px] font-heading font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      Chef Choice
                    </div>
                  )}
                  {item.isPopular && !item.isChefRecommendation && (
                    <div className="absolute bottom-3 left-3 bg-accent text-white text-[9px] font-heading font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      Bestseller
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-heading font-bold text-base text-accent group-hover:text-primary transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-grayText text-xs mt-2 line-clamp-2 leading-relaxed font-sans font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Order Action */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-secondary">
                    <div>
                      <span className="text-[10px] text-grayText font-medium uppercase tracking-wider block">Price</span>
                      <span className="font-heading font-black text-base text-accent">
                        ₹{item.price}
                      </span>
                    </div>


                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-grayText text-lg">No dishes found matching your criteria.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); setVegOnly(false); }}
              className="mt-4 text-primary font-semibold hover:underline"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Menu;
