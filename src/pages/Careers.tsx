import React from 'react';
import Recruitment from '../components/Recruitment';
import { motion } from 'motion/react';

export default function CareersPage() {
  return (
    <div className="pt-20">
      <section className="bg-slate-900 py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/seed/careers-header/1920/600" alt="Header" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
          >
            人才招聘
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/70 max-w-2xl mx-auto font-light"
          >
            加入兴欣科技，共同筑就城市生命线。
          </motion.p>
        </div>
      </section>
      <Recruitment />
    </div>
  );
}
