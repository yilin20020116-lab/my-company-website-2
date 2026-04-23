import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataService, SiteSettings } from '../services/dataService';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    DataService.getSettings().then(setSettings);
  }, []);

  useEffect(() => {
    if (!settings?.heroBanners?.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % settings.heroBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [settings?.heroBanners]);

  if (!settings) {
    return <div className="h-screen min-h-[750px] flex items-center justify-center bg-slate-900"><Loader2 className="w-8 h-8 text-brand-blue animate-spin" /></div>;
  }

  const slides = settings.heroBanners?.length ? settings.heroBanners : [];

  return (
    <section className="relative h-screen min-h-[750px] flex items-center overflow-hidden">
      {/* Background with Video-like feel or high-quality image */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        {slides.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`湖北兴欣科技展示 ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100 animate-slow-zoom z-10' : 'opacity-0 z-0'
            }`}
            referrerPolicy="no-referrer"
          />
        ))}
        <div className="absolute inset-0 bg-slate-900/40 z-20" />
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 w-full mt-20 lg:mt-32">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-brand-orange" />
              <span className="text-white font-bold tracking-[0.3em] uppercase text-sm">
                股票代码：839675
              </span>
            </div>
            
            <h1 
              className="text-6xl md:text-8xl font-display font-bold text-white leading-tight mb-8"
              dangerouslySetInnerHTML={{ __html: settings.heroTitle || '精益求精 <br/><span class="text-brand-orange">滴水不漏</span>' }}
            />
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed font-light">
              {settings.heroSubtitle || '湖北兴欣科技股份有限公司，致力于成为全球领先的管道系统解决方案服务商。以科技创新驱动，筑就城市生命线。'}
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link to="/products" className="bg-brand-blue hover:bg-brand-blue/90 text-white px-10 py-5 rounded-lg font-bold flex items-center gap-3 transition-all group shadow-2xl shadow-brand-blue/20">
                探索产品中心
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-lg font-bold flex items-center gap-3 transition-all">
                关于兴欣科技
                <ChevronRight size={20} />
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats / Features floating on the right */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-6 hidden lg:block"
          >
            <div className="glass p-8 rounded-xl flex items-center justify-between gap-6 shadow-xl shadow-black/5">
              <div className="flex flex-col">
                <div className="text-brand-orange font-display font-bold text-4xl md:text-5xl mb-2">30+</div>
                <div className="text-slate-900 font-bold mb-1">行业经验</div>
                <div className="text-slate-600 text-xs line-clamp-1">深耕管道行业三十载</div>
              </div>
              
              <div className="w-px h-16 bg-slate-200 hidden md:block" />
              
              <div className="flex flex-col">
                <div className="text-brand-orange font-display font-bold text-4xl md:text-5xl mb-2">5w</div>
                <div className="text-slate-900 font-bold mb-1">年产能</div>
                <div className="text-slate-600 text-xs line-clamp-1">可达5万吨以上</div>
              </div>
              
              <div className="w-px h-16 bg-slate-200 hidden md:block" />
              
              <div className="flex flex-col">
                <div className="text-brand-orange font-display font-bold text-4xl md:text-5xl mb-2">4</div>
                <div className="text-slate-900 font-bold mb-1">研发平台</div>
                <div className="text-slate-600 text-xs line-clamp-1">省级特新研发中心</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Navigation / Indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-10 w-full">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          <div className="flex gap-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-12 h-1.5 -translate-y-0.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === index ? 'bg-brand-orange scale-y-100' : 'bg-white/20 hover:bg-white/40 opacity-50 scale-y-75'
                }`}
                aria-label={`Switch to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="text-white/50 text-xs font-mono tracking-widest">
            SCROLL TO EXPLORE
          </div>
        </div>
      </div>
    </section>
  );
}
