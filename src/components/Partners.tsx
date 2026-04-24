import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { DataService, PartnerItem } from '../services/dataService';

export default function Partners() {
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await DataService.getPartners();
        setPartners(data);
      } catch (e) {
        console.error('Failed to fetch partners:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  if (loading || partners.length === 0) {
    return null;
  }

  // Double the partners array for seamless infinite scroll
  const scrollingPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-20 bg-white border-t border-slate-50 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 mb-12">
        <div className="text-center">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">
            合作伙伴 / PARTNERS
          </h4>
        </div>
      </div>

      <div className="relative">
        {/* Gradients to fade out the edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

        <motion.div 
          className="flex gap-12 items-center"
          animate={{
            x: [0, - partners.length * 248] // Adjusted based on item width + gap
          }}
          transition={{
            duration: partners.length * 5, // Responsive duration
            ease: "linear",
            repeat: Infinity
          }}
        >
          {scrollingPartners.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="flex-shrink-0 flex justify-center items-center w-[200px] h-[96px] bg-slate-50 p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all group"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-full w-full object-contain opacity-50 group-hover:opacity-100 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
