import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, menuItems as defaultMenuItems } from '../data/menu';
import { FaSearch, FaStar, FaWhatsapp } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

const Menu = ({ activeCategory, setActiveCategory, dynamicConfig }) => {
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filter items whenever menuItems, activeCategory, or searchQuery changes
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

    setFilteredItems(result);
  }, [menuItems, activeCategory, searchQuery]);

  const handleWhatsAppOrder = (itemName, price) => {
    const text = `Hi Ambika Cafe, I would like to order "${itemName}" (Rs. ${price}). Please confirm my order!`;
    const encodedText = encodeURIComponent(text);
    const phoneNum = dynamicConfig?.phone || '7721802321';
    window.open(`https://wa.me/91${phoneNum}?text=${encodedText}`, '_blank');
  };

  // Generate Schema.org JSON-LD for Google Search indexing
  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Ambika Cafe Menu",
    "description": "100% Pure Vegetarian Casual Cafe menu featuring fresh gourmet sandwiches, burgers, pizzas, snacks, kulhad chai, cold coffee, and shakes.",
    "hasMenuItem": (menuItems.length > 0 ? menuItems : defaultMenuItems).map(item => ({
      "@type": "MenuItem",
      "name": item.name,
      "description": item.description,
      "offers": {
        "@type": "Offer",
        "price": item.price,
        "priceCurrency": "INR"
      }
    }))
  };

  return (
    <section id="menu" className="scroll-mt-20 py-24 bg-lightBg relative z-10">
      {/* Schema.org Structured Microdata for Google Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-1.5 bg-gold/10 text-amber-300 px-4 py-1.5 rounded-full text-xs font-heading font-semibold uppercase tracking-widest mb-4 border border-gold/30 shadow-sm"
          >
            <span>Interactive Menu • Instant WhatsApp Order</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-gold to-amber-300 tracking-wide"
          >
            Our Fresh & Delicious Menu
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-gold to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Search Bar Container */}
        <div className="flex items-center justify-center mb-10 bg-[#1A120F]/90 p-4 rounded-2xl border border-gold/20 max-w-md mx-auto shadow-inner">
          {/* Search Box */}
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gold/70">
              <FaSearch className="text-sm" />
            </span>
            <input
              type="text"
              placeholder="Search dishes (e.g. Sandwich, Burger, Coffee)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm transition-all bg-[#120D0B] text-amber-100 placeholder-amber-200/40"
            />
          </div>
        </div>

        {/* Horizontal Category Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-12 -mx-4 px-4 scrollbar-thin scrollbar-thumb-primary">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSearchQuery('');
              }}
              className={`px-6 py-3 min-h-[44px] rounded-full text-xs font-heading font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap border ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-primary to-amber-600 text-white border-gold shadow-[0_0_18px_rgba(212,175,55,0.4)] scale-105'
                  : 'bg-[#1C1412]/80 text-amber-200/80 border-gold/20 hover:border-gold/60 hover:text-white hover:bg-[#251A17]'
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="group bg-[#1C1412]/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-gold/20 flex flex-col h-full hover:border-gold/60 hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all duration-300"
              >
                {/* Image & Badges */}
                <div className="relative h-48 overflow-hidden bg-black/40">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Steam Vapor Overlay Effect */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-16 bg-gradient-to-t from-white/25 via-white/10 to-transparent rounded-full blur-md animate-steam" />
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center space-x-1 border border-gold/30 shadow-sm">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="text-xs font-bold text-amber-200">{item.rating}</span>
                  </div>

                  {/* Popular or Chef Rec Badges */}
                  {item.isChefRecommendation && (
                    <div className="absolute bottom-3 left-3 bg-primary text-white text-[9px] font-heading font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md border border-amber-300/40">
                      Chef Choice
                    </div>
                  )}
                  {item.isPopular && !item.isChefRecommendation && (
                    <div className="absolute bottom-3 left-3 bg-amber-600 text-white text-[9px] font-heading font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md border border-amber-300/40">
                      Bestseller
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-heading font-bold text-base text-amber-200 group-hover:text-gold transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-amber-100/70 text-xs mt-2 leading-relaxed font-sans font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Order Action */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gold/10">
                    <div>
                      <span className="text-[10px] text-amber-200/50 font-medium uppercase tracking-wider block">Price</span>
                      <span className="font-heading font-black text-xl text-amber-300">
                        ₹{item.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleWhatsAppOrder(item.name, item.price)}
                      className="inline-flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl min-h-[44px] transition-colors duration-300 shadow-md border border-emerald-400/30 cursor-pointer"
                      title="Order via WhatsApp"
                    >
                      <FaWhatsapp className="text-sm" />
                      <span>Order</span>
                    </button>
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
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
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
