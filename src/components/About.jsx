import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaSmile, FaUtensils } from 'react-icons/fa';

const About = () => {
  const highlights = [
    { icon: <FaUtensils />, title: "लय भारी फूड", desc: "गरमागरम बर्गर, सँडविच आणि क्रिस्पी स्नॅक्स, अगदी तुमच्यासाठी ताजे तयार केलेले." },
    { icon: <FaSmile />, title: "आपली हक्काची जागा", desc: "मित्रांसोबत गप्पा मारण्यासाठी आणि निवांत वेळ घालवण्यासाठी एकदम मस्त वातावरण." },
    { icon: <FaHeart />, title: "चव एक नंबर", desc: "प्रेमाने आणि उत्तम दर्जाच्या साहित्याने बनवलेली चव, जी थेट काळजाला भिडेल." }
  ];

  return (
    <section id="about" className="scroll-mt-20 py-24 bg-secondary/20 relative overflow-hidden z-10">
      
      {/* Decorative Mandala overlay for About section */}
      <div className="absolute inset-0 mandala-pattern opacity-[0.035] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Cozy Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            {/* Background saffron/gold border accent */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/20 rounded-2xl -z-10 translate-x-1 translate-y-1 hidden sm:block" />
            
            <img
              src="/maharashtrian_cafe.png"
              alt="Ambika Cafe Authentic Maharashtrian Vibes"
              className="rounded-2xl shadow-premium object-cover w-full h-[28rem] hover:scale-[1.01] transition-transform duration-500 border border-primary/10"
            />
            
            {/* Simple Floating Badge */}
            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-premium border border-primary/10 flex items-center space-x-3">
              <span className="text-primary font-marathi-heading font-black text-2xl leading-none">१००%</span>
              <span className="text-accent font-bold text-[10px] font-marathi-body uppercase tracking-wider leading-tight">
                शुद्ध शाकाहारी<br />आणि कडक स्वच्छता
              </span>
            </div>
          </motion.div>

          {/* Right Column - Text & Icons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <h2 className="font-marathi-heading font-black text-3xl sm:text-4xl text-accent mb-6 leading-tight">
              आपला हक्काचा अंबिका कॅफे!
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mb-6 rounded-full" />
            
            <p className="text-grayText text-sm sm:text-base leading-relaxed font-marathi-body font-light mb-8">
              इस्लामपूरकरांसाठी आपला लाडका आणि हक्काचा अंबिका कॅफे! जिथे लय भारी चव आणि मस्त शांत वातावरण एकत्र मिळतं. मित्रांसोबत गप्पा मारत गरमागरम कटिंग चहा, एकदम भारी आणि कुरकुरीत बर्गर, सँडविच आणि मस्त स्नॅक्सचा आस्वाद घ्यायला नक्की या. आमची क्वालिटी एक नंबर, स्वच्छता एकदम कडक आणि पाहुणचार तर अगदी घरचा! त्यामुळे प्रत्येक घासात तुम्हाला मिळेल तोच घरचा जिव्हाळा.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex flex-col items-start p-5 bg-white rounded-xl border border-primary/5 hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="text-primary text-lg p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300 mb-4 h-10 w-10 flex items-center justify-center">
                    {h.icon}
                  </div>
                  <h3 className="font-marathi-heading font-black text-accent text-base group-hover:text-primary transition-colors duration-300 mb-2">
                    {h.title}
                  </h3>
                  <p className="text-grayText text-xs leading-relaxed font-marathi-body font-light">
                    {h.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
