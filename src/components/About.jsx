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
    <section id="about" className="scroll-mt-20 py-24 bg-[#120D0B]/95 relative overflow-hidden z-10 text-[#FAF5EC] border-t border-gold/15">
      
      {/* Decorative Mandala overlay for About section */}
      <div className="absolute inset-0 mandala-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Cozy Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            {/* Background gold border accent */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold/20 rounded-2xl -z-10 translate-x-1 translate-y-1 hidden sm:block" />
            
            <img
              src="/ambika_cafe_about.png"
              alt="Ambika Cafe Pure Veg Casual Ambience and Food"
              loading="lazy"
              decoding="async"
              className="rounded-2xl shadow-2xl object-cover w-full h-[28rem] hover:scale-[1.01] transition-transform duration-500 border border-gold/30"
            />
            
            {/* Dark Glass Floating Badge */}
            <div className="absolute bottom-6 right-6 bg-[#1C1412]/95 backdrop-blur-md px-6 py-4 rounded-xl shadow-2xl border border-gold/30 flex items-center space-x-3">
              <span className="text-amber-300 font-marathi-heading font-black text-2xl leading-none">१००%</span>
              <span className="text-amber-100 font-bold text-[10px] font-marathi-body uppercase tracking-wider leading-tight">
                शुद्ध शाकाहारी<br />आणि कडक स्वच्छता
              </span>
            </div>
          </motion.div>

          {/* Right Column - Text & Icons */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="inline-flex items-center space-x-2 bg-gold/10 text-amber-300 px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider mb-3 border border-gold/30 shadow-xs">
              <span>100% Pure Veg Casual Cafe</span>
            </div>
            <h2 className="font-marathi-heading font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-gold to-amber-300 mb-4 leading-tight">
              आपला हक्काचा १००% शुद्ध शाकाहारी कॅज्युअल कॅफे!
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary via-gold to-amber-500 mb-6 rounded-full" />
            
            <p className="text-amber-100/80 text-sm sm:text-base leading-relaxed font-marathi-body font-light mb-8">
              इस्लामपूरकरांसाठी आपला लाडका १००% शुद्ध शाकाहारी कॅज्युअल कॅफे! जिथे मित्रांसोबत गप्पा मारत गरमागरम स्पेशल कुल्हड चहा, कोल्ड कॉफी, थिक शेक्स आणि एकदम भारी कुरकुरीत बर्गर, ग्रिल्ड सँडविच आणि मस्त स्नॅक्सचा आनंद घेता येतो. कॅज्युअल हँगआउट आणि क्विक बाईट्ससाठी तुमची हक्काची जागा!
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex flex-col items-start p-5 bg-[#1C1412]/85 backdrop-blur-md rounded-2xl border border-gold/20 hover:border-gold/60 shadow-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300 group"
                >
                  <div className="text-amber-300 text-lg p-2.5 bg-gold/10 border border-gold/20 rounded-xl group-hover:bg-gold group-hover:text-black transition-colors duration-300 mb-4 h-10 w-10 flex items-center justify-center">
                    {h.icon}
                  </div>
                  <h3 className="font-marathi-heading font-black text-amber-200 text-base group-hover:text-gold transition-colors duration-300 mb-2">
                    {h.title}
                  </h3>
                  <p className="text-amber-100/70 text-xs leading-relaxed font-marathi-body font-light">
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
