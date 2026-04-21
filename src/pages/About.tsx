import React from 'react';
import About from '../components/About';
import Culture from '../components/Culture';
import Timeline from '../components/Timeline';
import Strength from '../components/Strength';
import { motion } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Corporate Video Header Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden px-6 md:px-12 lg:px-24">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/factory-video/1920/1080" 
            alt="Corporate Video Background" 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[1px]" />
        </div>
        
        <div className="max-w-[1440px] mx-auto w-full relative z-10 py-24 md:py-32 text-left">
          <div className="max-w-4xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-left"
            >
              <div className="text-left">
                <div className="flex items-center gap-4 mb-6 justify-start">
                  <div className="h-[2px] w-12 bg-brand-orange" />
                  <span className="text-brand-orange font-bold tracking-[0.3em] uppercase text-sm">
                    企业宣传片 / CORPORATE VIDEO
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-8 text-left">
                  三十载匠心如一 <br />
                  <span className="text-brand-orange text-4xl md:text-6xl">筑就管道行业领军品牌</span>
                </h1>
                <div className="space-y-6 relative max-w-2xl text-left">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-orange/30 rounded-full" />
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed pl-6 font-light text-left">
                    湖北兴欣科技股份有限公司（股票代码：839675）创立于1994年，作为国家级高新技术企业，我们始终专注于高端复合管道的研发、制造与系统化服务。
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-4 justify-start">
                <button className="flex items-center gap-4 px-10 py-5 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-lg transition-all group shadow-2xl shadow-brand-orange/20">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-orange shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={20} fill="currentColor" className="ml-1" />
                  </div>
                  <span className="text-lg font-bold">立即观看企业宣传片</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <About />
      <Culture />
      <Timeline />
      <Strength />
    </div>
  );
}
