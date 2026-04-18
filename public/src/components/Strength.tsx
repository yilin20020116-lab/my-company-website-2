import React from 'react';
import { motion } from 'motion/react';

export default function Strength() {
  return (
    <section id="strength" className="py-24 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Main Title */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="w-12 h-[2px] bg-brand-orange" />
            <h2 className="text-xl font-bold text-brand-orange uppercase tracking-[0.2em]">
              企业实力 / STRENGTH
            </h2>
            <div className="w-12 h-[2px] bg-brand-orange" />
          </motion.div>
        </div>

        {/* Factory Strength (Image Layout matching user request) */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-display font-bold text-slate-900 mb-4"
            >
              现代化生产基地
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 max-w-2xl mx-auto"
            >
              两座大型现代化智能厂区，引进国际领先自动化生产线，确保每一寸管道都符合严苛品质标准。
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Base 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] md:h-[500px] rounded-2xl lg:rounded-none lg:rounded-tr-[80px] lg:rounded-br-[80px] overflow-hidden group"
            >
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600" 
                alt="一号生产基地" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <p className="text-brand-orange text-sm font-bold tracking-widest uppercase mb-2">TOTAL AREA: 50,000㎡</p>
                <h4 className="text-white text-3xl md:text-4xl font-bold mb-3">一号生产基地</h4>
                <p className="text-white/80 text-sm md:text-base">专注大口径市政排污及水利工程管道生产</p>
              </div>
            </motion.div>

            {/* Base 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] md:h-[500px] rounded-2xl lg:rounded-none lg:rounded-tl-[80px] lg:rounded-bl-[80px] overflow-hidden group lg:mt-24"
            >
              <img 
                src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=1600" 
                alt="二号生产基地" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <p className="text-white text-sm font-bold tracking-widest uppercase mb-2">INTELLIGENT LINE: 12+</p>
                <h4 className="text-white text-3xl md:text-4xl font-bold mb-3">二号生产基地</h4>
                <p className="text-white/80 text-sm md:text-base">高精度建筑给水与特种工业管道智能车间</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* R&D Strength (Brochure Layout) */}
        <div className="relative">
          <div className="text-center mb-12">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-display font-bold text-slate-900 mb-4"
            >
              卓越的研发体系
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 max-w-2xl mx-auto"
            >
              创新是发展的核心驱动力。公司依托四大省级平台与两大研发基地，汇聚顶尖人才，持续引领行业技术革新。
            </motion.p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-0">
            {/* Image Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-3/5 relative z-0"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=1600" 
                  alt="研发实力" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            {/* Content Section (Overlapping) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="w-full lg:w-1/2 relative z-10 mt-8 lg:mt-0 lg:-ml-32"
            >
              <div className="bg-white p-10 md:p-14 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-brand-orange font-bold tracking-widest uppercase text-sm">R&D STRENGTH</span>
                  <div className="h-[1px] flex-1 bg-slate-200" />
                </div>
                <h4 className="text-3xl font-display font-bold text-slate-900 mb-6">突破技术壁垒，引领行业标准</h4>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                  依托四个省级研发平台与两个管道研发基地，我们拥有一支由行业专家领衔的资深研发团队，不断在管道材料、结构设计、智能制造等领域取得突破。
                </p>

                <div className="grid grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-bold text-slate-900">4</span>
                      <span className="text-sm font-medium text-slate-500">个</span>
                    </div>
                    <span className="text-sm font-medium text-slate-500">省级研发平台</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-bold text-slate-900">2</span>
                      <span className="text-sm font-medium text-slate-500">个</span>
                    </div>
                    <span className="text-sm font-medium text-slate-500">管道研发基地</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-bold text-slate-900">30+</span>
                      <span className="text-sm font-medium text-slate-500">项</span>
                    </div>
                    <span className="text-sm font-medium text-slate-500">国家专利</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
