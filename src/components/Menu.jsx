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

  // Subscribe to Menu collection with localStorage fallback & sync
  useEffect(() => {
    const loadMenuFromStorage = () => {
      const local = localStorage.getItem('custom_menu_items');
      if (local) {
        try {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMenuItems(parsed);
            return true;
          }
        } catch (e) {
          console.warn("Failed to parse local menu storage:", e);
        }
      }
      return false;
    };

    // Initial load from storage if available
    const hasLocal = loadMenuFromStorage();
    if (!hasLocal) {
      setMenuItems(defaultMenuItems);
    }

    const unsubscribe = onSnapshot(collection(db, 'menu'), (snapshot) => {
      if (snapshot.empty) {
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
        if (!loadMenuFromStorage()) {
          setMenuItems(defaultMenuItems);
        }
      } else {
        const itemsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMenuItems(itemsList);
        localStorage.setItem('custom_menu_items', JSON.stringify(itemsList));
      }
    }, (error) => {
      console.warn("Firestore menu fetch failed, falling back to storage/defaults:", error);
      if (!loadMenuFromStorage()) {
        setMenuItems(defaultMenuItems);
      }
    });

    const handleCustomEvent = () => loadMenuFromStorage();
    window.addEventListener('menu_updated', handleCustomEvent);

    return () => {
      unsubscribe();
      window.removeEventListener('menu_updated', handleCustomEvent);
    };
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

        {/* Menu Items Container (Single-Screen Mobile Vertical Alignment & Glassmorphism Multi-Row Cards) */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6"
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
                whileHover={{ y: -4 }}
                className="group bg-[#1C1412]/90 backdrop-blur-xl rounded-2xl p-4 border border-gold/20 shadow-xl hover:border-gold/50 transition-all duration-300 flex flex-col space-y-3"
              >
                {/* ROW 1: Circular Food Thumbnail + Rising Steam + Bold Gold Dish Name + Complete Description */}
                <div className="flex items-start space-x-3.5 relative">
                  {/* Circular Food Image Container */}
                  <div className="relative shrink-0 mt-0.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gold/40 shadow-md bg-black/60"
                    />

                    {/* Hot Steam/Vapor Rising Animation Overlay */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex space-x-1 pointer-events-none z-10">
                      <motion.span
                        animate={{ y: [0, -10, -18], opacity: [0, 0.7, 0], scale: [0.8, 1.2, 1.6] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                        className="w-1 h-3.5 bg-gradient-to-t from-amber-100/50 via-amber-200/30 to-transparent rounded-full blur-[1px]"
                      />
                      <motion.span
                        animate={{ y: [0, -12, -20], opacity: [0, 0.8, 0], scale: [0.8, 1.3, 1.7] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                        className="w-1.5 h-4 bg-gradient-to-t from-amber-100/60 via-amber-200/35 to-transparent rounded-full blur-[1px]"
                      />
                      <motion.span
                        animate={{ y: [0, -8, -16], opacity: [0, 0.6, 0], scale: [0.8, 1.1, 1.5] }}
                        transition={{ duration: 2.0, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                        className="w-1 h-3 bg-gradient-to-t from-amber-100/40 via-amber-200/20 to-transparent rounded-full blur-[1px]"
                      />
                    </div>
                  </div>

                  {/* Dish Name & Description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-heading font-extrabold text-amber-200 group-hover:text-gold text-base sm:text-lg leading-tight tracking-wide transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-1 shrink-0 bg-black/60 px-2 py-0.5 rounded border border-gold/20 text-xs">
                        <FaStar className="text-yellow-400 text-[10px]" />
                        <span className="font-bold text-amber-200 text-[11px]">{item.rating || 4.8}</span>
                      </div>
                    </div>
                    <p className="text-xs text-amber-100/70 font-sans mt-1 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* ROW 2: Category Tag + Price (₹) + Veg Badge + Badges + Order Action Button */}
                <div className="pt-2.5 border-t border-gold/15 flex flex-wrap items-center justify-between gap-2.5">
                  {/* Info Cluster */}
                  <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                    {/* Category Tag */}
                    <span className="text-[10px] font-heading font-extrabold text-gold/90 tracking-widest uppercase bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
                      {item.category?.replace('-', ' ')}
                    </span>

                    {/* Price */}
                    <span className="text-sm sm:text-base font-extrabold text-amber-300 font-sans tracking-wide">
                      ₹{item.price}
                    </span>

                    {/* Veg Badge */}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      item.isVeg !== false 
                        ? 'bg-emerald-950/90 text-emerald-400 border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.2)]' 
                        : 'bg-red-950/90 text-red-400 border-red-500/50'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1 ${item.isVeg !== false ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
                      {item.isVeg !== false ? 'Veg' : 'Non-Veg'}
                    </span>

                    {/* Badges (BESTSELLER / CHEF'S CHOICE) */}
                    {item.isPopular && (
                      <span className="text-[9px] bg-amber-600/90 text-white font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-amber-300/40">
                        BESTSELLER
                      </span>
                    )}
                    {item.isChefRecommendation && (
                      <span className="text-[9px] bg-primary/90 text-white font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-amber-300/40">
                        CHEF'S CHOICE
                      </span>
                    )}
                  </div>

                  {/* Action Button: WhatsApp Order */}
                  <button
                    onClick={() => handleWhatsAppOrder(item.name, item.price)}
                    className="inline-flex items-center justify-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all duration-300 shadow-md border border-emerald-400/40 cursor-pointer shrink-0 ml-auto"
                    title="Order via WhatsApp"
                  >
                    <FaWhatsapp className="text-sm text-emerald-100" />
                    <span>Order</span>
                  </button>
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
