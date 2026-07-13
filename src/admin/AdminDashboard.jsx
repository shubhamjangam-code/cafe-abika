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
  const [editItem, setEditItem] = useState(null); // If null, we are adding an item
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState(30);
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState('south-indian');
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
        // Fallback defaults from local config
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
      // 1. Seed Menu Items
      for (const item of menuItems) {
        // Use custom document IDs to prevent duplicates
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

      // 2. Seed Settings
      await setDoc(doc(db, 'settings', 'cafe-info'), {
        title: config.title || 'Ambika Cafe',
        subtitle: config.subtitle || 'Good Food, Good Vibes, Divine Taste',
        phone: config.phone || '7721802321',
        address: config.address || 'Opp. Government College, Main Road, City',
        hours: config.hours || '7:30 AM - 11:00 PM'
      });

      showMsg('Database successfully seeded with default breakfast items and settings!');
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

    setUploadingImage(true);
    try {
      const fileRef = ref(storage, `menu/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      setFormImage(downloadUrl);
      showMsg('Image uploaded successfully to Firebase Storage!');
    } catch (error) {
      console.error('Image upload failed:', error);
      showMsg('Storage upload failed. Pasting URLs is still supported.', 'error');
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
    setFormCategory('south-indian');
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
    setFormCategory(item.category || 'south-indian');
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
      image: formImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600', // fallback
      rating: Number(formRating),
      isVeg: Boolean(formIsVeg),
      isPopular: Boolean(formIsPopular),
      isChefRecommendation: Boolean(formIsChefRecommendation)
    };

    try {
      if (editItem) {
        // Edit Mode
        const docRef = doc(db, 'menu', editItem.id);
        await updateDoc(docRef, itemData);
        showMsg('Menu item updated successfully!');
      } else {
        // Add Mode
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
    <div className="min-h-screen bg-lightBg flex flex-col font-sans text-darkText">
      {/* Dynamic Notifications */}
      {message.text && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-xl border shadow-lg flex items-center space-x-3 transition-all duration-300 ${
          message.type === 'error' 
            ? 'bg-red-50 text-red-800 border-red-200' 
            : 'bg-green-50 text-green-800 border-green-200'
        }`}>
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${message.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`} />
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-primary/10 py-4 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-3">
          <Logo className="w-8 h-8" />
          <div>
            <h1 className="font-heading font-black text-lg sm:text-xl tracking-wider text-accent">
              Ambika <span className="text-primary">Cafe</span>
            </h1>
            <p className="text-[10px] text-grayText font-heading uppercase tracking-widest -mt-1 font-semibold">
              Admin Portal
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <a 
            href="/" 
            className="flex items-center space-x-1.5 text-xs text-grayText hover:text-primary transition-colors font-medium border border-primary/10 rounded-full px-3.5 py-1.5 hover:bg-secondary/40"
          >
            <FaHome className="text-sm" />
            <span>Go to Live Site</span>
          </a>
          <button 
            onClick={handleSignOut}
            className="flex items-center space-x-1.5 text-xs bg-red-50 border border-red-200 text-red-700 px-3.5 py-1.5 rounded-full hover:bg-red-100 transition-colors font-medium"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-primary/10 p-6 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-heading font-black text-grayText uppercase tracking-widest mb-3">
                Navigation
              </p>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold font-heading tracking-wider uppercase transition-all ${
                    activeTab === 'menu'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-accent hover:bg-secondary'
                  }`}
                >
                  <FaUtensils className="text-sm" />
                  <span>Manage Menu</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold font-heading tracking-wider uppercase transition-all ${
                    activeTab === 'settings'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-accent hover:bg-secondary'
                  }`}
                >
                  <FaCog className="text-sm" />
                  <span>Cafe Settings</span>
                </button>
              </nav>
            </div>

            <div className="border-t border-primary/5 pt-6">
              <p className="text-[10px] font-heading font-black text-grayText uppercase tracking-widest mb-3">
                Data Maintenance
              </p>
              <button
                onClick={handleSeedDatabase}
                className="w-full flex items-center justify-center space-x-2 text-[10px] bg-secondary/80 border border-primary/20 text-accent font-heading font-bold uppercase tracking-wider py-2.5 rounded-xl hover:bg-secondary transition-all hover:text-primary"
              >
                <FaUndo />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </div>

          <div className="text-[10px] text-grayText font-light mt-8 border-t border-primary/5 pt-4 text-center">
            &copy; 2026 Ambika Cafe Control
          </div>
        </aside>

        {/* Dashboard Content Area */}
        <main className="flex-grow p-6 sm:p-8">
          
          {/* Quick Metrics (Only visible on Menu tab) */}
          {activeTab === 'menu' && (
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-primary/10 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-grayText font-bold uppercase tracking-wider block font-heading">Total Dishes</span>
                  <span className="text-xl sm:text-2xl font-heading font-black text-accent">{totalDishes}</span>
                </div>
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <FaUtensils className="text-lg" />
                </div>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-primary/10 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-grayText font-bold uppercase tracking-wider block font-heading">Veg Only</span>
                  <span className="text-xl sm:text-2xl font-heading font-black text-green-700">{vegCount}</span>
                </div>
                <div className="w-10 h-10 bg-green-50 text-green-700 rounded-xl flex items-center justify-center">
                  <span className="w-3.5 h-3.5 rounded-full bg-green-600" />
                </div>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-primary/10 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-grayText font-bold uppercase tracking-wider block font-heading">Featured</span>
                  <span className="text-xl sm:text-2xl font-heading font-black text-gold">{popularCount}</span>
                </div>
                <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center">
                  <FaStar className="text-lg" />
                </div>
              </div>
            </div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <div className="fixed inset-0 bg-white/60 backdrop-blur-xs flex items-center justify-center z-50">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* TAB 1: MANAGE MENU */}
          {activeTab === 'menu' && (
            <div className="bg-white rounded-3xl shadow-sm border border-primary/10 overflow-hidden">
              <div className="p-6 border-b border-primary/10 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-heading font-black text-xl text-accent">Menu Items Manager</h2>
                  <p className="text-xs text-grayText mt-1">Add, edit, or remove breakfast dishes dynamically.</p>
                </div>
                <button
                  onClick={openAddModal}
                  className="flex items-center space-x-1.5 bg-accent hover:bg-primary text-white text-xs font-heading font-black uppercase tracking-wider px-5 py-3 rounded-full shadow-md transition-all hover:scale-105"
                >
                  <FaPlus />
                  <span>Add New Dish</span>
                </button>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-secondary/45 text-accent text-xs font-bold border-b border-primary/10 font-heading">
                      <th className="p-4 pl-6">Dish Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Veg / Non-Veg</th>
                      <th className="p-4">Badges</th>
                      <th className="p-4 text-right pr-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5 text-sm">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="p-4 pl-6">
                          <div className="flex items-center space-x-3.5">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-11 h-11 object-cover rounded-xl border border-primary/10 bg-secondary"
                            />
                            <div>
                              <p className="font-bold text-accent">{item.name}</p>
                              <p className="text-xs text-grayText line-clamp-1 max-w-xs">{item.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 uppercase text-xs font-bold text-grayText tracking-wide">
                          {item.category?.replace('-', ' ')}
                        </td>
                        <td className="p-4 font-bold text-accent font-sans">
                          ₹{item.price}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${
                            item.isVeg 
                              ? 'bg-green-50 text-green-800 border-green-150' 
                              : 'bg-red-50 text-red-800 border-red-150'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                            {item.isVeg ? 'Veg' : 'Non-Veg'}
                          </span>
                        </td>
                        <td className="p-4 space-x-1.5">
                          {item.isPopular && (
                            <span className="text-[9px] bg-accent text-white font-bold uppercase tracking-widest px-2 py-0.5 rounded-md">Bestseller</span>
                          )}
                          {item.isChefRecommendation && (
                            <span className="text-[9px] bg-primary text-white font-bold uppercase tracking-widest px-2 py-0.5 rounded-md">Chef's Choice</span>
                          )}
                          {!item.isPopular && !item.isChefRecommendation && (
                            <span className="text-xs text-grayText font-light italic">None</span>
                          )}
                        </td>
                        <td className="p-4 text-right pr-6 space-x-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all inline-flex items-center justify-center border border-transparent hover:border-blue-200"
                            title="Edit Item"
                          >
                            <FaEdit className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 text-red-650 hover:bg-red-50 rounded-xl transition-all inline-flex items-center justify-center border border-transparent hover:border-red-200"
                            title="Delete Item"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {items.length === 0 && (
                      <tr>
                        <td colSpan="6" className="p-12 text-center text-grayText text-base font-light">
                          No menu items found. Click <strong>"Reset to Defaults"</strong> in the sidebar or add a new item above to seed data.
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
            <div className="bg-white rounded-3xl shadow-sm border border-primary/10 max-w-3xl overflow-hidden">
              <div className="p-6 border-b border-primary/10">
                <h2 className="font-heading font-black text-xl text-accent">Cafe Information Settings</h2>
                <p className="text-xs text-grayText mt-1">Configure general website content such as logo text, address, timings, and contact number.</p>
              </div>

              <form onSubmit={handleSettingsSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Cafe Title */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-accent tracking-wider uppercase mb-2 font-heading">Cafe Brand Name</label>
                    <input
                      type="text"
                      required
                      value={settTitle}
                      onChange={(e) => setSettTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                    />
                  </div>

                  {/* Cafe Subtitle */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-accent tracking-wider uppercase mb-2 font-heading">Hero Slogan / Subtitle</label>
                    <input
                      type="text"
                      required
                      value={settSubtitle}
                      onChange={(e) => setSettSubtitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-accent tracking-wider uppercase mb-2 font-heading">WhatsApp & Call Phone (10 Digits)</label>
                    <input
                      type="text"
                      required
                      value={settPhone}
                      onChange={(e) => setSettPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                    />
                  </div>

                  {/* Timings */}
                  <div>
                    <label className="block text-xs font-bold text-accent tracking-wider uppercase mb-2 font-heading">Working Hours Timing</label>
                    <input
                      type="text"
                      required
                      value={settHours}
                      onChange={(e) => setSettHours(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                    />
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-accent tracking-wider uppercase mb-2 font-heading">Cafe Address Location</label>
                    <textarea
                      required
                      rows="3"
                      value={settAddress}
                      onChange={(e) => setSettAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-primary/5 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center space-x-1.5 bg-accent hover:bg-primary text-white text-xs font-heading font-black uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md transition-all hover:scale-105"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-premium border border-primary/10 w-full max-w-xl overflow-hidden my-8">
            <div className="bg-gradient-to-r from-accent to-primary p-6 text-white flex items-center justify-between">
              <h3 className="font-heading font-black text-lg tracking-wider uppercase text-white">
                {editItem ? 'Edit Menu Dish' : 'Add New Menu Dish'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-gold transition-colors text-2xl font-light font-sans focus:outline-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleMenuSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Dish Name */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-accent tracking-wider uppercase mb-1.5 font-heading">Dish Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Special Sabudana Vada"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-[10px] font-bold text-accent tracking-wider uppercase mb-1.5 font-heading">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all bg-white"
                  >
                    <option value="south-indian">South Indian</option>
                    <option value="maharashtrian">Maharashtrian</option>
                    <option value="north-indian">North Indian</option>
                    <option value="beverages">Tea & Beverages</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-[10px] font-bold text-accent tracking-wider uppercase mb-1.5 font-heading">Price (Rs.)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-grayText text-xs">
                      <FaRupeeSign />
                    </span>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-accent tracking-wider uppercase mb-1.5 font-heading">Description</label>
                  <textarea
                    rows="2"
                    placeholder="Short description of the ingredients and presentation..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all resize-none"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-[10px] font-bold text-accent tracking-wider uppercase mb-1.5 font-heading">Rating (1.0 - 5.0)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-yellow-500 text-xs">
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
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Veg / Non-Veg Toggle */}
                <div className="flex items-center space-x-3 pl-2">
                  <span className="text-xs font-bold text-accent font-heading tracking-wider uppercase">Veg Category</span>
                  <button
                    type="button"
                    onClick={() => setFormIsVeg(!formIsVeg)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                      formIsVeg ? 'bg-green-600' : 'bg-red-650'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        formIsVeg ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-xs font-bold text-grayText font-heading uppercase">
                    {formIsVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>

                {/* Image Selection Fields */}
                <div className="sm:col-span-2 border-t border-primary/5 pt-3">
                  <label className="block text-[10px] font-bold text-accent tracking-wider uppercase mb-1.5 font-heading">Dish Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all mb-3"
                  />
                  
                  {/* Image File Uploader */}
                  <div className="bg-secondary/45 border border-dashed border-primary/20 rounded-xl p-4 text-center">
                    <FaCloudUploadAlt className="text-2xl text-primary mx-auto mb-1" />
                    <p className="text-xs text-accent font-semibold">Or upload direct photo from disk</p>
                    <p className="text-[10px] text-grayText mt-0.5 mb-3">JPG, PNG, or WEBP up to 5MB</p>
                    
                    <input
                      type="file"
                      accept="image/*"
                      id="file-upload"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label 
                      htmlFor="file-upload"
                      className="inline-block bg-white border border-primary/20 hover:border-primary text-accent text-[10px] font-heading font-black uppercase tracking-wider px-4 py-2 rounded-full cursor-pointer hover:bg-secondary/20 shadow-sm transition-all"
                    >
                      {uploadingImage ? 'Uploading Image...' : 'Select Local File'}
                    </label>
                  </div>

                  {/* Image Preview */}
                  {formImage && (
                    <div className="mt-3 flex items-center space-x-4 p-2.5 bg-secondary/25 border border-primary/5 rounded-xl">
                      <img 
                        src={formImage} 
                        alt="Preview" 
                        className="w-16 h-16 object-cover rounded-lg border border-primary/10"
                      />
                      <div>
                        <span className="text-[9px] bg-green-50 text-green-800 border border-green-150 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">Image Loaded</span>
                        <p className="text-[10px] text-grayText line-clamp-1 max-w-[280px] mt-1 font-mono">{formImage}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Badge Flags */}
                <div className="sm:col-span-2 border-t border-primary/5 pt-3 flex flex-wrap gap-5">
                  <label className="flex items-center space-x-2 text-xs font-bold text-accent uppercase tracking-wider font-heading cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsPopular}
                      onChange={(e) => setFormIsPopular(e.target.checked)}
                      className="rounded border-primary/20 text-primary focus:ring-primary w-4 h-4"
                    />
                    <span>Mark as Bestseller / Popular</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs font-bold text-accent uppercase tracking-wider font-heading cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsChefRecommendation}
                      onChange={(e) => setFormIsChefRecommendation(e.target.checked)}
                      className="rounded border-primary/20 text-primary focus:ring-primary w-4 h-4"
                    />
                    <span>Mark as Chef's Recommendation</span>
                  </label>
                </div>

              </div>

              <div className="pt-4 border-t border-primary/5 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-secondary text-accent text-xs font-heading font-black uppercase tracking-wider px-5 py-3 rounded-full hover:bg-secondary-dark transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="bg-accent hover:bg-primary text-white text-xs font-heading font-black uppercase tracking-wider px-6 py-3 rounded-full shadow-md transition-all hover:scale-105 disabled:opacity-50"
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
