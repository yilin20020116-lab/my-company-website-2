import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, MapPin, ExternalLink, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { DataService, ProjectCase } from '../services/dataService';

const categories = ['全部', '市政工程', '工业特种', '燃气热力', '海外项目'];

export default function Cases() {
  const [activeTab, setActiveTab] = useState('全部');
  const [projects, setProjects] = useState<ProjectCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await DataService.getProjectCases();
        setProjects(data);
      } catch (err) {
        console.error('Failed to load projects', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = activeTab === '全部' 
    ? projects
    : projects.filter(p => (p.category || '市政工程') === activeTab);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
      </div>
    );
  }

  return (
    <section id="cases" className="section-padding bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 right-0 text-[12rem] font-display font-bold text-slate-50 select-none pointer-events-none -translate-y-1/2 translate-x-1/3 rotate-90">
        PROJECTS
      </div>
      
      <div className="max-w-[1440px] mx-auto relative z-10 px-6">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 content-start">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "group relative overflow-hidden rounded-lg bg-slate-100",
                  project.orientation === 'portrait' ? "aspect-[3/4]" : "aspect-[4/3]",
                  project.orientation === 'landscape' && i % 4 === 0 ? "md:col-span-2" : ""
                )}
              >
                <img
                  src={project.imageUrl}
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
                    {project.location || '全国项目'}
                  </div>
                  <h4 className="text-2xl font-bold mb-2 group-hover:text-brand-orange transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-white/70 line-clamp-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {project.description}
                  </p>
                </div>

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
        
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-slate-400 border-2 border-dashed rounded-3xl">
            暂无相关案例
          </div>
        )}

        <div className="mt-16 text-center">
          <button className="px-10 py-4 rounded-full border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 hover:border-brand-blue hover:text-brand-blue transition-all">
            查看更多工程案例
          </button>
        </div>
      </div>
    </section>
  );
}
