import React from 'react';
import { motion } from 'motion/react';

const partners = [
  { name: '中国建筑', logo: 'https://picsum.photos/seed/cscec/200/100?grayscale' },
  { name: '中国中铁', logo: 'https://picsum.photos/seed/crec/200/100?grayscale' },
  { name: '中国交建', logo: 'https://picsum.photos/seed/cccc/200/100?grayscale' },
  { name: '中国电建', logo: 'https://picsum.photos/seed/powerchina/200/100?grayscale' },
  { name: '万科集团', logo: 'https://picsum.photos/seed/vanke/200/100?grayscale' },
  { name: '保利地产', logo: 'https://picsum.photos/seed/poly/200/100?grayscale' },
];

export default function Partners() {
  return (
    <section className="py-20 bg-white border-t border-slate-50">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">
            合作伙伴 / PARTNERS
          </h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-50 hover:opacity-100 transition-opacity duration-500">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex justify-center bg-slate-50 p-4 rounded-lg hover:bg-white hover:shadow-sm transition-all"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-10 object-contain filter grayscale hover:grayscale-0 transition-all"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
