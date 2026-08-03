import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import AmbientBackground from './components/AmbientBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Mascot from './components/Mascot';
import AdminPortal from './admin/AdminPortal';
import { db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { config } from './data/config';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAdmin, setIsAdmin] = useState(false);
  const [dynamicConfig, setDynamicConfig] = useState(config);

  useEffect(() => {
    const path = window.location.pathname;
    setIsAdmin(path.startsWith('/admin'));

    const loadSettingsFromStorage = () => {
      const local = localStorage.getItem('custom_cafe_settings');
      if (local) {
        try {
          const parsed = JSON.parse(local);
          setDynamicConfig(prev => ({
            ...prev,
            ...parsed
          }));
        } catch (e) {
          console.warn("Failed to parse local cafe settings:", e);
        }
      }
    };

    loadSettingsFromStorage();

    const unsubscribe = onSnapshot(doc(db, 'settings', 'cafe-info'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDynamicConfig(prev => ({
          ...prev,
          ...data
        }));
        localStorage.setItem('custom_cafe_settings', JSON.stringify(data));
      }
    }, (err) => {
      console.warn("Could not load real-time settings, using storage/defaults:", err);
      loadSettingsFromStorage();
    });

    const handleSettingsEvent = () => loadSettingsFromStorage();
    window.addEventListener('settings_updated', handleSettingsEvent);

    return () => {
      unsubscribe();
      window.removeEventListener('settings_updated', handleSettingsEvent);
    };
  }, []);

  if (isAdmin) {
    return <AdminPortal />;
  }

  return (
    <div className="relative min-h-screen bg-[#120D0B] text-[#FAF5EC] selection:bg-primary/30 selection:text-amber-200 overflow-x-hidden">
      {/* Global Ambient Background Animation Layer */}
      <AmbientBackground />

      {/* Premium Loader Overlay */}
      <Loader />

      {/* Global Page Elements */}
      <ScrollProgress />
      <Navbar setActiveCategory={setActiveCategory} dynamicConfig={dynamicConfig} />

      {/* Main Single Page Sections */}
      <main className="relative z-10">
        <Hero dynamicConfig={dynamicConfig} />
        <Menu activeCategory={activeCategory} setActiveCategory={setActiveCategory} dynamicConfig={dynamicConfig} />
        <About />
        <Contact dynamicConfig={dynamicConfig} />
      </main>


      {/* Footer Branding */}
      <Footer dynamicConfig={dynamicConfig} />

      <BackToTop />
      <Mascot />
    </div>
  );
}

export default App;

