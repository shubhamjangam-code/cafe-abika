import React, { useState, useEffect } from 'react';
import { db, auth, storage } from '../firebase';
import { signOut } from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { menuItems } from '../data/menu';
import { config } from '../data/config';
import { Logo } from '../components/Navbar';
import AmbientBackground from '../components/AmbientBackground';
import { 
  FaUtensils, 
  FaCog, 
  FaSignOutAlt, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaCheck, 
  FaCloudUploadAlt, 
  FaStar, 
  FaFolder, 
  FaRupeeSign, 
  FaUndo,
  FaHome
} from 'react-icons/fa';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'settings'
  const [items, setItems] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // type: 'success' | 'error'

  // Form states for Add/Edit Menu Item
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState(30);
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState('sandwiches-burgers');
  const [formImage, setFormImage] = useState('');
  const [formRating, setFormRating] = useState(4.8);
  const [formIsVeg, setFormIsVeg] = useState(true);
  const [formIsPopular, setFormIsPopular] = useState(false);
  const [formIsChefRecommendation, setFormIsChefRecommendation] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form states for Cafe Settings
  const [settTitle, setSettTitle] = useState('');
  const [settSubtitle, setSettSubtitle] = useState('');
  const [settPhone, setSettPhone] = useState('');
  const [settAddress, setSettAddress] = useState('');
  const [settHours, setSettHours] = useState('');

  // Fetch Menu Items & Settings
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Menu Items
      const menuSnap = await getDocs(collection(db, 'menu'));
      const menuData = menuSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(menuData);

      // 2. Fetch Cafe Settings
      const settingsSnap = await getDocs(collection(db, 'settings'));
      let settingsObj = {};
      settingsSnap.forEach(doc => {
        settingsObj[doc.id] = doc.data();
      });

      if (settingsObj['cafe-info']) {
        const info = settingsObj['cafe-info'];
        setSettings(info);
        setSettTitle(info.title || config.title || '');
        setSettSubtitle(info.subtitle || config.subtitle || '');
        setSettPhone(info.phone || config.phone || '');
        setSettAddress(info.address || config.address || '');
        setSettHours(info.hours || config.hours || '');
      } else {
        setSettTitle(config.title || 'Ambika Cafe');
        setSettSubtitle(config.subtitle || 'Good Food, Good Vibes, Divine Taste');
        setSettPhone(config.phone || '7721802321');
        setSettAddress(config.address || 'Opp. Government College, Main Road, City');
        setSettHours(config.hours || '7:30 AM - 11:00 PM');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      showMsg('Failed to fetch data from Firestore.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  // Seed default data if database is empty
  const handleSeedDatabase = async () => {
    if (!window.confirm('Are you sure you want to seed the database? This will overwrite existing items.')) return;
    setLoading(true);
    try {
      for (const item of menuItems) {
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

      await setDoc(doc(db, 'settings', 'cafe-info'), {
        title: config.title || 'Ambika Cafe',
        subtitle: config.subtitle || 'Good Food, Good Vibes, Divine Taste',
        phone: config.phone || '7721802321',
        address: config.address || 'Opp. Government College, Main Road, City',
        hours: config.hours || '7:30 AM - 11:00 PM'
      });

      showMsg('Database successfully seeded with default menu items and settings!');
      fetchData();
    } catch (error) {
      console.error(error);
      showMsg('Failed to seed database. Verify Firestore Rules.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle Logout
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      if (onLogout) onLogout();
    } catch (error) {
      console.error('Signout failed:', error);
    }
  };

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showMsg('Image size should be less than 5MB.', 'error');
      return;
    }

    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `menu/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormImage(downloadURL);
      showMsg('Image uploaded successfully to Firebase Storage!');
    } catch (error) {
      console.error('Image upload failed:', error);
      showMsg('Image upload failed. Check Firebase Storage rules.', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // Open modal for Add
  const openAddModal = () => {
    setEditItem(null);
    setFormName('');
    setFormPrice(30);
    setFormDescription('');
    setFormCategory('sandwiches-burgers');
    setFormImage('');
    setFormRating(4.8);
    setFormIsVeg(true);
    setFormIsPopular(false);
    setFormIsChefRecommendation(false);
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const openEditModal = (item) => {
    setEditItem(item);
    setFormName(item.name || '');
    setFormPrice(item.price || 30);
    setFormDescription(item.description || '');
    setFormCategory(item.category || 'sandwiches-burgers');
    setFormImage(item.image || '');
    setFormRating(item.rating || 4.8);
    setFormIsVeg(item.isVeg !== undefined ? item.isVeg : true);
    setFormIsPopular(item.isPopular || false);
    setFormIsChefRecommendation(item.isChefRecommendation || false);
    setIsModalOpen(true);
  };

  // Submit Menu Item (Add / Edit)
  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const itemData = {
      name: formName,
      price: Number(formPrice),
      description: formDescription,
      category: formCategory,
      image: formImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
      rating: Number(formRating),
      isVeg: Boolean(formIsVeg),
      isPopular: Boolean(formIsPopular),
      isChefRecommendation: Boolean(formIsChefRecommendation)
    };

    try {
      if (editItem) {
        const docRef = doc(db, 'menu', editItem.id);
        await updateDoc(docRef, itemData);
        showMsg('Menu item updated successfully!');
      } else {
        const colRef = collection(db, 'menu');
        await addDoc(colRef, itemData);
        showMsg('Menu item added successfully!');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error saving item:', error);
      showMsg('Failed to save menu item. Check Firestore permission rules.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Delete Menu Item
  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    setLoading(true);
    try {
      const docRef = doc(db, 'menu', itemId);
      await deleteDoc(docRef);
      showMsg('Menu item deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
      showMsg('Failed to delete item.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Save Settings
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = doc(db, 'settings', 'cafe-info');
      await setDoc(docRef, {
        title: settTitle,
        subtitle: settSubtitle,
        phone: settPhone,
        address: settAddress,
        hours: settHours
      });
      showMsg('Cafe settings updated successfully!');
      fetchData();
    } catch (error) {
      console.error('Error updating settings:', error);
      showMsg('Failed to save settings.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Counting metrics
  const totalDishes = items.length;
  const vegCount = items.filter(item => item.isVeg).length;
  const popularCount = items.filter(item => item.isPopular || item.isChefRecommendation).length;

  return (
    <div className="min-h-screen bg-[#120D0B] text-[#FAF5EC] flex flex-col font-sans relative overflow-x-hidden">
      {/* Background Ambient Component */}
      <AmbientBackground />

      {/* Dynamic Notifications */}
      {message.text && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-2xl border shadow-2xl flex items-center space-x-3 transition-all duration-300 ${
          message.type === 'error' 
            ? 'bg-red-950/90 text-red-200 border-red-500/40' 
            : 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40'
        }`}>
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 animate-pulse ${message.type === 'error' ? 'bg-red-500' : 'bg-emerald-400'}`} />
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-[#18110E]/90 backdrop-blur-lg border-b border-gold/20 py-4 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-40 shadow-2xl">
        <div className="flex items-center space-x-3">
          <Logo className="w-8 h-8" />
          <div>
            <h1 className="font-heading font-black text-lg sm:text-xl tracking-wider text-amber-200">
              Ambika <span className="text-primary">Cafe</span>
            </h1>
            <p className="text-[10px] text-amber-300/80 font-heading uppercase tracking-widest -mt-1 font-bold">
              Management Portal
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <a 
            href="/" 
            className="flex items-center space-x-1.5 text-xs text-amber-200 hover:text-gold transition-colors font-medium border border-gold/30 rounded-full px-4 py-2 bg-gold/10 hover:bg-gold/20 shadow-sm"
          >
            <FaHome className="text-sm text-gold" />
            <span>Live Site</span>
          </a>
          <button 
            onClick={handleSignOut}
            className="flex items-center space-x-1.5 text-xs bg-red-950/70 border border-red-500/40 text-red-300 px-4 py-2 rounded-full hover:bg-red-900/80 transition-colors font-medium cursor-pointer"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="flex-grow flex flex-col md:flex-row relative z-10">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-[#18110E]/80 backdrop-blur-md border-r border-gold/15 p-6 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-heading font-black text-gold/80 uppercase tracking-widest mb-3">
                Navigation
              </p>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold font-heading tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                    activeTab === 'menu'
                      ? 'bg-gradient-to-r from-primary to-amber-600 text-white border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-[#221815] text-amber-200/80 border-gold/15 hover:bg-[#2C1F1B] hover:text-white'
                  }`}
                >
                  <FaUtensils className="text-sm" />
                  <span>Manage Menu</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold font-heading tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-gradient-to-r from-primary to-amber-600 text-white border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-[#221815] text-amber-200/80 border-gold/15 hover:bg-[#2C1F1B] hover:text-white'
                  }`}
                >
                  <FaCog className="text-sm" />
                  <span>Cafe Settings</span>
                </button>
              </nav>
            </div>

            <div className="border-t border-gold/15 pt-6">
              <p className="text-[10px] font-heading font-black text-gold/80 uppercase tracking-widest mb-3">
                Data Maintenance
              </p>
              <button
                onClick={handleSeedDatabase}
                className="w-full flex items-center justify-center space-x-2 text-[10px] bg-gold/10 border border-gold/30 text-amber-300 font-heading font-bold uppercase tracking-wider py-2.5 rounded-xl hover:bg-gold hover:text-black transition-all cursor-pointer shadow-sm"
              >
                <FaUndo />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>

          <div className="text-[10px] text-amber-200/50 font-light mt-8 border-t border-gold/10 pt-4 text-center">
            &copy; 2026 Ambika Cafe Management
          </div>
        </aside>

        {/* Dashboard Content Area */}
        <main className="flex-grow p-6 sm:p-8">
          
          {/* Quick Metrics (Only visible on Menu tab) */}
          {activeTab === 'menu' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
              <div className="bg-[#1C1412]/85 backdrop-blur-md p-5 rounded-2xl border border-gold/20 shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-amber-200/70 font-bold uppercase tracking-wider block font-heading">Total Dishes</span>
                  <span className="text-xl sm:text-2xl font-heading font-black text-amber-200">{totalDishes}</span>
                </div>
                <div className="w-10 h-10 bg-gold/10 text-gold rounded-xl flex items-center justify-center border border-gold/20">
                  <FaUtensils className="text-lg" />
                </div>
              </div>

              <div className="bg-[#1C1412]/85 backdrop-blur-md p-5 rounded-2xl border border-gold/20 shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-amber-200/70 font-bold uppercase tracking-wider block font-heading">Pure Veg</span>
                  <span className="text-xl sm:text-2xl font-heading font-black text-emerald-400">{vegCount}</span>
                </div>
                <div className="w-10 h-10 bg-emerald-950/80 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/30">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              <div className="bg-[#1C1412]/85 backdrop-blur-md p-5 rounded-2xl border border-gold/20 shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-amber-200/70 font-bold uppercase tracking-wider block font-heading">Featured</span>
                  <span className="text-xl sm:text-2xl font-heading font-black text-amber-300">{popularCount}</span>
                </div>
                <div className="w-10 h-10 bg-amber-950/80 text-amber-300 rounded-xl flex items-center justify-center border border-amber-500/30">
                  <FaStar className="text-lg" />
                </div>
              </div>
            </div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* TAB 1: MANAGE MENU */}
          {activeTab === 'menu' && (
            <div className="bg-[#1C1412]/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gold/20 overflow-hidden">
              <div className="p-6 border-b border-gold/15 flex items-center justify-between flex-wrap gap-4 bg-[#120D0B]/60">
                <div>
                  <h2 className="font-heading font-black text-xl text-amber-200">Menu Items Manager</h2>
                  <p className="text-xs text-amber-100/70 mt-1">Add, edit, or remove dishes dynamically from your live website.</p>
                </div>
                <button
                  onClick={openAddModal}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary to-amber-600 hover:from-amber-600 hover:to-primary text-white text-xs font-heading font-black uppercase tracking-wider px-5 py-3 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.3)] border border-gold/30 transition-all hover:scale-105 cursor-pointer"
                >
                  <FaPlus />
                  <span>Add New Dish</span>
                </button>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#120D0B]/90 text-amber-300 text-xs font-bold border-b border-gold/15 font-heading">
                      <th className="p-4 pl-6">Dish Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Veg Status</th>
                      <th className="p-4">Badges</th>
                      <th className="p-4 text-right pr-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/10 text-sm">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-[#251A17]/60 transition-colors">
                        <td className="p-4 pl-6">
                          <div className="flex items-center space-x-3.5">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-11 h-11 object-cover rounded-xl border border-gold/20 bg-black/40"
                            />
                            <div>
                              <p className="font-bold text-amber-200">{item.name}</p>
                              <p className="text-xs text-amber-100/60 line-clamp-1 max-w-xs">{item.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 uppercase text-xs font-bold text-amber-200/80 tracking-wide">
                          {item.category?.replace('-', ' ')}
                        </td>
                        <td className="p-4 font-bold text-amber-300 font-sans">
                          ₹{item.price}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${
                            item.isVeg 
                              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40' 
                              : 'bg-red-950/80 text-red-400 border-red-500/40'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.isVeg ? 'bg-emerald-400' : 'bg-red-500'}`} />
                            {item.isVeg ? 'Veg' : 'Non-Veg'}
                          </span>
                        </td>
                        <td className="p-4 space-x-1.5">
                          {item.isPopular && (
                            <span className="text-[9px] bg-amber-600 text-white font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border border-amber-300/40">Bestseller</span>
                          )}
                          {item.isChefRecommendation && (
                            <span className="text-[9px] bg-primary text-white font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border border-amber-300/40">Chef's Choice</span>
                          )}
                          {!item.isPopular && !item.isChefRecommendation && (
                            <span className="text-xs text-amber-100/40 italic">Standard</span>
                          )}
                        </td>
                        <td className="p-4 text-right pr-6 space-x-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-2 text-amber-300 hover:bg-gold/20 rounded-xl transition-all inline-flex items-center justify-center border border-gold/20"
                            title="Edit Item"
                          >
                            <FaEdit className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 text-red-400 hover:bg-red-950/80 rounded-xl transition-all inline-flex items-center justify-center border border-red-500/30"
                            title="Delete Item"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {items.length === 0 && (
                      <tr>
                        <td colSpan="6" className="p-12 text-center text-amber-100/60 text-base font-light">
                          No menu items found. Click <strong>"Reset Defaults"</strong> in sidebar to load initial dishes.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: CAFE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-[#1C1412]/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gold/20 max-w-3xl overflow-hidden">
              <div className="p-6 border-b border-gold/15 bg-[#120D0B]/60">
                <h2 className="font-heading font-black text-xl text-amber-200">Cafe Information Settings</h2>
                <p className="text-xs text-amber-100/70 mt-1">Configure general website content such as title, address, timings, and contact phone.</p>
              </div>

              <form onSubmit={handleSettingsSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Cafe Title */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-amber-300 tracking-wider uppercase mb-2 font-heading">Cafe Brand Name</label>
                    <input
                      type="text"
                      required
                      value={settTitle}
                      onChange={(e) => setSettTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm transition-all bg-[#120D0B] text-amber-100 placeholder-amber-200/30"
                    />
                  </div>

                  {/* Cafe Subtitle */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-amber-300 tracking-wider uppercase mb-2 font-heading">Hero Slogan / Subtitle</label>
                    <input
                      type="text"
                      required
                      value={settSubtitle}
                      onChange={(e) => setSettSubtitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm transition-all bg-[#120D0B] text-amber-100 placeholder-amber-200/30"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-amber-300 tracking-wider uppercase mb-2 font-heading">WhatsApp Phone (10 Digits)</label>
                    <input
                      type="text"
                      required
                      value={settPhone}
                      onChange={(e) => setSettPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm transition-all bg-[#120D0B] text-amber-100 placeholder-amber-200/30"
                    />
                  </div>

                  {/* Timings */}
                  <div>
                    <label className="block text-xs font-bold text-amber-300 tracking-wider uppercase mb-2 font-heading">Working Hours</label>
                    <input
                      type="text"
                      required
                      value={settHours}
                      onChange={(e) => setSettHours(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm transition-all bg-[#120D0B] text-amber-100 placeholder-amber-200/30"
                    />
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-amber-300 tracking-wider uppercase mb-2 font-heading">Cafe Address Location</label>
                    <textarea
                      required
                      rows="3"
                      value={settAddress}
                      onChange={(e) => setSettAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm transition-all bg-[#120D0B] text-amber-100 placeholder-amber-200/30 resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gold/15 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-gradient-to-r from-primary to-amber-600 hover:from-amber-600 hover:to-primary text-white text-xs font-heading font-black uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.3)] border border-gold/30 transition-all hover:scale-105 cursor-pointer"
                  >
                    <FaCheck />
                    <span>Save Config Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* DISH FORM MODAL (ADD / EDIT) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1C1412]/95 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.9)] border border-gold/30 w-full max-w-xl overflow-hidden my-8 text-amber-100">
            <div className="bg-gradient-to-r from-[#2A1813] via-[#3D1E16] to-[#2A1813] p-6 text-white flex items-center justify-between border-b border-gold/20">
              <h3 className="font-heading font-black text-lg tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-gold to-amber-300">
                {editItem ? 'Edit Menu Dish' : 'Add New Menu Dish'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-amber-200 hover:text-gold transition-colors text-2xl font-light font-sans focus:outline-none cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleMenuSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Dish Name */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-amber-300 tracking-wider uppercase mb-1.5 font-heading">Dish Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Special Sabudana Vada"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm transition-all bg-[#120D0B] text-amber-100 placeholder-amber-200/30"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-[10px] font-bold text-amber-300 tracking-wider uppercase mb-1.5 font-heading">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm transition-all bg-[#120D0B] text-amber-100"
                  >
                    <option value="sandwiches-burgers">Sandwiches & Burgers</option>
                    <option value="pizza-bites">Pizza & Fast Bites</option>
                    <option value="breakfast-specials">Breakfast Specials</option>
                    <option value="beverages">Tea, Coffee & Shakes</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-[10px] font-bold text-amber-300 tracking-wider uppercase mb-1.5 font-heading">Price (Rs.)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gold/70 text-xs">
                      <FaRupeeSign />
                    </span>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm transition-all bg-[#120D0B] text-amber-100"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-amber-300 tracking-wider uppercase mb-1.5 font-heading">Description</label>
                  <textarea
                    rows="2"
                    placeholder="Short description of ingredients and taste..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm transition-all bg-[#120D0B] text-amber-100 placeholder-amber-200/30 resize-none"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-[10px] font-bold text-amber-300 tracking-wider uppercase mb-1.5 font-heading">Rating (1.0 - 5.0)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-yellow-400 text-xs">
                      <FaStar />
                    </span>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      required
                      value={formRating}
                      onChange={(e) => setFormRating(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm transition-all bg-[#120D0B] text-amber-100"
                    />
                  </div>
                </div>

                {/* Veg / Non-Veg Toggle */}
                <div className="flex items-center space-x-3 pl-2">
                  <span className="text-xs font-bold text-amber-300 font-heading tracking-wider uppercase">Veg Status</span>
                  <button
                    type="button"
                    onClick={() => setFormIsVeg(!formIsVeg)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none border border-gold/20 ${
                      formIsVeg ? 'bg-emerald-600' : 'bg-red-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        formIsVeg ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-xs font-bold text-amber-100/80 font-heading uppercase">
                    {formIsVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>

                {/* Image Selection Fields */}
                <div className="sm:col-span-2 border-t border-gold/15 pt-3">
                  <label className="block text-[10px] font-bold text-amber-300 tracking-wider uppercase mb-1.5 font-heading">Dish Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm transition-all bg-[#120D0B] text-amber-100 placeholder-amber-200/30 mb-3"
                  />
                  
                  {/* Image File Uploader */}
                  <div className="bg-[#120D0B]/80 border border-dashed border-gold/30 rounded-xl p-4 text-center">
                    <FaCloudUploadAlt className="text-2xl text-gold mx-auto mb-1" />
                    <p className="text-xs text-amber-200 font-semibold">Or upload direct photo from disk</p>
                    <p className="text-[10px] text-amber-100/50 mt-0.5 mb-3">JPG, PNG, or WEBP up to 5MB</p>
                    
                    <input
                      type="file"
                      accept="image/*"
                      id="file-upload"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label 
                      htmlFor="file-upload"
                      className="inline-block bg-gold/10 border border-gold/30 hover:bg-gold hover:text-black text-amber-300 text-[10px] font-heading font-black uppercase tracking-wider px-4 py-2 rounded-full cursor-pointer transition-all"
                    >
                      {uploadingImage ? 'Uploading Image...' : 'Select Local File'}
                    </label>
                  </div>

                  {/* Image Preview */}
                  {formImage && (
                    <div className="mt-3 flex items-center space-x-4 p-2.5 bg-[#120D0B] border border-gold/20 rounded-xl">
                      <img 
                        src={formImage} 
                        alt="Preview" 
                        className="w-16 h-16 object-cover rounded-lg border border-gold/30"
                      />
                      <div>
                        <span className="text-[9px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">Image Loaded</span>
                        <p className="text-[10px] text-amber-100/60 line-clamp-1 max-w-[280px] mt-1 font-mono">{formImage}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Badge Flags */}
                <div className="sm:col-span-2 border-t border-gold/15 pt-3 flex flex-wrap gap-5">
                  <label className="flex items-center space-x-2 text-xs font-bold text-amber-300 uppercase tracking-wider font-heading cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsPopular}
                      onChange={(e) => setFormIsPopular(e.target.checked)}
                      className="rounded border-gold/30 text-amber-500 focus:ring-amber-500 w-4 h-4 bg-[#120D0B]"
                    />
                    <span>Mark as Bestseller / Popular</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs font-bold text-amber-300 uppercase tracking-wider font-heading cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsChefRecommendation}
                      onChange={(e) => setFormIsChefRecommendation(e.target.checked)}
                      className="rounded border-gold/30 text-amber-500 focus:ring-amber-500 w-4 h-4 bg-[#120D0B]"
                    />
                    <span>Mark as Chef's Recommendation</span>
                  </label>
                </div>

              </div>

              <div className="pt-4 border-t border-gold/15 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#120D0B] text-amber-200 border border-gold/20 text-xs font-heading font-black uppercase tracking-wider px-5 py-3 rounded-full hover:bg-[#251A17] transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="bg-gradient-to-r from-primary to-amber-600 hover:from-amber-600 hover:to-primary text-white text-xs font-heading font-black uppercase tracking-wider px-6 py-3 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.3)] border border-gold/30 transition-all hover:scale-105 disabled:opacity-50 cursor-pointer"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
