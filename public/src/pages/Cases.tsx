import React from 'react';
import Cases from '../components/Cases';
import { motion } from 'motion/react';

export default function CasesPage() {
  return (
    <div className="pt-20">
      <section className="bg-slate-800 py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/seed/cases-header/1920/600" alt="Header" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
          >
            工程案例
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/70 max-w-2xl mx-auto font-light"
          >
            遍布全国的精品工程，见证兴欣管道的卓越品质。
          </motion.p>
        </div>
      </section>
      <Cases />
    </div>
  );
}
