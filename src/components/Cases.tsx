import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, MapPin, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

const categories = ['全部', '市政工程', '工业特种', '燃气热力', '海外项目'];

const projects = [
  {
    title: '鄂州花湖机场配套压力管道',
    category: '市政工程',
    location: '湖北鄂州',
    desc: '为亚洲首个专业货运机场提供高品质供水系统保障。',
    image: 'https://picsum.photos/seed/case1/800/600',
    hasVideo: true
  },
  {
    title: '东南亚某大型工业园供水项目',
    category: '海外项目',
    location: '越南/泰国',
    desc: '兴欣管道走出国门，为海外工业园区提供高标准流体输送方案。',
    image: 'https://picsum.photos/seed/overseas1/800/600',
    hasVideo: false
  },
  {
    title: '内蒙古伊泰煤制油项目',
    category: '工业特种',
    location: '内蒙古',
    desc: '耐磨、耐腐蚀特种管道，助力大型能源化工项目。',
    image: 'https://picsum.photos/seed/case3/800/600',
    hasVideo: true
  },
  {
    title: '中东地区油气输送配套',
    category: '海外项目',
    location: '中东地区',
    desc: '针对极端环境设计的增强复合管道，成功应用于海外油气配套工程。',
    image: 'https://picsum.photos/seed/overseas2/800/600',
    hasVideo: false
  },
  {
    title: '广东大亚湾核电配套',
    category: '工业特种',
    location: '广东惠州',
    desc: '高标准、严要求，为核电站配套设施提供管道支持。',
    image: 'https://picsum.photos/seed/case5/800/600',
    hasVideo: true
  },
  {
    title: '北京大兴机场市政管网',
    category: '市政工程',
    location: '北京',
    desc: '参与全球最大单体航站楼的地下管网建设。',
    image: 'https://picsum.photos/seed/case6/800/600',
    hasVideo: false
  }
];

export default function Cases() {
  const [activeTab, setActiveTab] = useState('全部');

  const filteredProjects = activeTab === '全部' 
    ? projects.slice(0, 3) 
    : projects.filter(p => p.category === activeTab).slice(0, 3);

  return (
    <section id="cases" className="section-padding bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 right-0 text-[12rem] font-display font-bold text-slate-50 select-none pointer-events-none -translate-y-1/2 translate-x-1/3 rotate-90">
        PROJECTS
      </div>
      
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-lg font-bold text-brand-orange uppercase tracking-[0.2em] mb-6"
            >
              工程案例 / CASES
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight"
            >
              遍布全球，<br />
              见证每一个品质工程。
            </motion.h3>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  'px-6 py-2 rounded-lg text-sm font-bold transition-all',
                  activeTab === cat
                    ? 'bg-brand-blue text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-lg bg-slate-100 aspect-[4/3]"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <div className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-widest mb-2">
                    <MapPin size={12} />
                    {project.location}
                  </div>
                  <h4 className="text-2xl font-bold mb-2 group-hover:text-brand-orange transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-white/70 line-clamp-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {project.desc}
                  </p>
                </div>

                {/* Video Icon */}
                {project.hasVideo && (
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                    <Play size={20} fill="white" />
                  </div>
                )}

                {/* Action Button */}
                <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-brand-blue p-3 rounded-xl text-white">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center">
          <button className="px-10 py-4 rounded-full border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 hover:border-brand-blue hover:text-brand-blue transition-all">
            查看更多工程案例
          </button>
        </div>
      </div>
    </section>
  );
}
