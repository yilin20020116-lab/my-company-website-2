import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Qualifications from '../components/Qualifications';

export default function QualificationsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E8%8D%A3%E8%AA%89%E8%B5%84%E8%B4%A8banner.png?v=7" 
            alt="荣誉资质" 
            className="w-full h-full object-cover object-bottom"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-wider text-brand-blue">
              权威认证 信誉保障
            </h1>
            <div className="h-1.5 w-24 bg-brand-yellow mb-3"></div>
            <p className="text-lg md:text-2xl font-medium text-brand-blue/90 max-w-xl">
              追求卓越品质，见证品牌实力
            </p>
          </motion.div>
        </div>
      </section>

      <Qualifications />
    </div>
  );
}
