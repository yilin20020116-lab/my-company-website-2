import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, FileCheck, Shield, BookOpen, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { DataService, QualificationItem } from '../services/dataService';

const categories = [
  { id: 'honors', name: '荣誉奖项', icon: Award },
  { id: 'qualifications', name: '资质证书', icon: FileCheck },
  { id: 'patents', name: '专利技术', icon: BookOpen },
];

const fallbackItems: QualificationItem[] = [
  { id: '1', category: 'honors', title: '国家级高新技术企业', year: '2023', imageUrl: 'https://picsum.photos/seed/cert1/400/560' },
  { id: '2', category: 'honors', title: '省级“专精特新”小巨人', year: '2022', imageUrl: 'https://picsum.photos/seed/cert2/400/560' },
  { id: '3', category: 'qualifications', title: 'ISO9001质量管理体系认证', year: '2023', imageUrl: 'https://picsum.photos/seed/cert3/400/560' },
  { id: '4', category: 'qualifications', title: 'ISO14001环境管理体系认证', year: '2023', imageUrl: 'https://picsum.photos/seed/cert4/400/560' },
  { id: '5', category: 'patents', title: '钢丝网骨架复合管专利', year: '2021', imageUrl: 'https://picsum.photos/seed/cert5/400/560' },
  { id: '6', category: 'patents', title: '一种新型连接件专利', year: '2022', imageUrl: 'https://picsum.photos/seed/cert6/400/560' },
];

export default function Qualifications() {
  const [activeTab, setActiveTab] = useState('honors');
  const [items, setItems] = useState<QualificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await DataService.getQualifications();
        setItems(data.length > 0 ? data : fallbackItems);
      } catch (err) {
        setItems(fallbackItems);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  return (
    <section id="qualifications" className="section-padding bg-brand-gray">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                'flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all duration-300',
                activeTab === cat.id
                  ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              )}
            >
              <cat.icon size={20} />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full py-20 flex justify-center">
              <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {items
                .filter((item) => item.category === activeTab)
                .map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-50 mb-4 relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/10 transition-colors" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1 line-clamp-1">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">{item.year} EDITION</p>
                  </motion.div>
                ))}
            </AnimatePresence>
          )}
        </div>

        {/* Trust Footer */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 font-display font-bold text-xl">
            <Shield className="text-brand-blue" />
            国家高新技术企业
          </div>
          <div className="flex items-center gap-2 font-display font-bold text-xl">
            <Shield className="text-brand-blue" />
            专精特新“小巨人”
          </div>
          <div className="flex items-center gap-2 font-display font-bold text-xl">
            <Shield className="text-brand-blue" />
            AAA级信用企业
          </div>
        </div>
      </div>
    </section>
  );
}
