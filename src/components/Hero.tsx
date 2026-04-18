import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[750px] flex items-center overflow-hidden">
      {/* Background with Video-like feel or high-quality image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/industrial-hero/1920/1080"
          alt="Xingxin Technology Industrial Park"
          className="w-full h-full object-cover animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-brand-orange" />
              <span className="text-white font-bold tracking-[0.3em] uppercase text-sm">
                股票代码：839675
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-tight mb-8">
              健行天下 <br />
              <span className="text-brand-orange">独占鳌头</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed font-light">
              湖北兴欣科技股份有限公司，致力于成为全球领先的管道系统解决方案服务商。
              以科技创新驱动，筑就城市生命线。
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
            className="lg:col-span-4 hidden lg:block"
          >
            <div className="glass p-10 rounded-xl space-y-10">
              <div className="flex items-start gap-4">
                <div className="text-brand-orange font-display font-bold text-4xl">30+</div>
                <div>
                  <div className="text-white font-bold mb-1">行业经验</div>
                  <div className="text-white/60 text-xs">深耕管道行业三十载</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-brand-orange font-display font-bold text-4xl">5w</div>
                <div>
                  <div className="text-white font-bold mb-1">年产能</div>
                  <div className="text-white/60 text-xs">年产能可达5万吨以上</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-brand-orange font-display font-bold text-4xl">4</div>
                <div>
                  <div className="text-white font-bold mb-1">研发平台</div>
                  <div className="text-white/60 text-xs">拥有四个省级研发平台</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Navigation / Indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-10 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex gap-4">
            <div className="w-12 h-1 bg-brand-orange rounded-full" />
            <div className="w-12 h-1 bg-white/20 rounded-full" />
            <div className="w-12 h-1 bg-white/20 rounded-full" />
          </div>
          <div className="text-white/50 text-xs font-mono tracking-widest">
            SCROLL TO EXPLORE
          </div>
        </div>
      </div>
    </section>
  );
}
