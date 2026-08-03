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

    if (activeCategory !== 'all') {
      result = result.filter(item => item.category === activeCategory);
    }

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
    <section id="menu" className="scroll-mt-20 py-24 bg-[#120D0B] relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 text-amber-300 px-4 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-widest mb-3 border border-amber-500/20 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Freshly Prepared • 100% Pure Veg</span>
          </div>
          
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 tracking-wide">
            Our Gourmet Menu
          </h2>
          <p className="text-[#FAF5EC]/75 text-sm sm:text-base mt-3 font-sans max-w-xl mx-auto leading-relaxed">
            Handcrafted with authentic spices and fresh local ingredients. Order directly via WhatsApp!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
        </motion.div>

        {/* Search Bar with Translucent Glass Styling */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center mb-10 max-w-md mx-auto"
        >
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-amber-400/70">
              <FaSearch className="text-sm" />
            </span>
            <input
              type="text"
              placeholder="Search dishes (e.g. Sandwich, Burger, Chai, Coffee)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-[rgba(212,175,55,0.25)] focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400 text-sm transition-all bg-[#1C1412]/80 backdrop-blur-xl text-amber-100 placeholder-amber-200/40 shadow-inner"
            />
          </div>
        </motion.div>

        {/* Horizontal Category Filter Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto touch-pan-x scroll-smooth pb-4 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar max-w-full"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSearchQuery('');
              }}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-heading font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105'
                  : 'bg-[#1C1412]/90 text-amber-200/80 border-[rgba(212,175,55,0.2)] hover:border-amber-400/60 hover:text-white hover:bg-[#251A17]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Menu Cards Grid - Glassmorphism & Steam Effect */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-[#1C1412]/85 backdrop-blur-xl rounded-2xl overflow-hidden border border-[rgba(212,175,55,0.2)] hover:border-[rgba(212,175,55,0.6)] shadow-[0_8px_24px_rgba(212,175,55,0.15)] hover:shadow-[0_0_28px_rgba(212,175,55,0.3)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Image Container with Steam Animation */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-black/50">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1412] via-transparent to-black/40" />

                    {/* Rising Steam Vapor Overlay for Fresh Hot Food */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex space-x-1 pointer-events-none z-10">
                      <span className="w-1 h-4 bg-gradient-to-t from-amber-100/50 via-amber-200/30 to-transparent rounded-full blur-[1px] animate-steam" />
                      <span className="w-1.5 h-5 bg-gradient-to-t from-amber-100/60 via-amber-200/35 to-transparent rounded-full blur-[1px] animate-steam [animation-delay:0.4s]" />
                      <span className="w-1 h-3.5 bg-gradient-to-t from-amber-100/40 via-amber-200/20 to-transparent rounded-full blur-[1px] animate-steam [animation-delay:0.8s]" />
                    </div>

                    {/* Top Right Rating Badge */}
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-amber-100 text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-md flex items-center space-x-1 border border-[rgba(212,175,55,0.3)]">
                      <FaStar className="text-yellow-400 text-[11px]" />
                      <span>{item.rating || 4.8}</span>
                    </div>

                    {/* Bottom Left Chef Choice / Bestseller Badge */}
                    {(item.isChefRecommendation || item.isPopular) && (
                      <div className="absolute bottom-3 left-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-[10px] font-heading font-extrabold tracking-wider uppercase px-3 py-1 rounded-r-lg shadow-md border-y border-r border-amber-300/30">
                        {item.isChefRecommendation ? "CHEF CHOICE" : "BESTSELLER"}
                      </div>
                    )}

                  </div>

                  {/* Card Content Body */}
                  <div className="pt-5 px-5 pb-4">
                    <h3 className="font-heading font-extrabold text-amber-200 text-lg leading-tight tracking-wide group-hover:text-amber-100 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#FAF5EC]/75 font-sans mt-2 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Price & Order Action Row */}
                <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-[rgba(212,175,55,0.15)] mt-auto bg-black/20">
                  {/* Left Side: Price Block */}
                  <div>
                    <span className="text-[10px] font-bold text-amber-200/50 uppercase tracking-widest block leading-none">
                      PRICE
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-amber-300 tracking-tight font-sans mt-0.5 block">
                      ₹{item.price}
                    </span>
                  </div>

                  {/* Right Side: WhatsApp Order Button */}
                  <button
                    onClick={() => handleWhatsAppOrder(item.name, item.price)}
                    className="inline-flex items-center justify-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md border border-emerald-400/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <FaWhatsapp className="text-base text-emerald-100" />
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
            <p className="text-amber-200/60 text-lg font-sans">No dishes found matching your search.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 text-amber-300 font-bold hover:underline cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Menu;

