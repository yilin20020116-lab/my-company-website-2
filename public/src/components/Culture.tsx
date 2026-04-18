import React from 'react';
import { motion } from 'motion/react';

const cultureItems = [
  {
    title: '企业使命',
    enTitle: 'Mission',
    desc: (
      <>
        以客户的价值观为导向，<br />
        以客户满意度作评价标准。
      </>
    ),
    bgColor: 'bg-[#0A4A9B]',
    darkColor: 'border-t-[#073673]',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600' // Customer interaction / satisfaction
  },
  {
    title: '核心理念',
    enTitle: 'Core Values',
    desc: (
      <>
        质量是生命、诚信是灵魂、<br />
        创新是源泉。
      </>
    ),
    bgColor: 'bg-[#0D9488]',
    darkColor: 'border-t-[#0f766e]',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=600' // Lightbulb / Innovation / Quality
  },
  {
    title: '企业精神',
    enTitle: 'Enterprise Spirit',
    desc: (
      <>
        团结务实、求实创新、<br />
        开拓进取、与时俱进。<br />
        健行天下，精益求精，滴水不漏。
      </>
    ),
    bgColor: 'bg-[#F27D26]',
    darkColor: 'border-t-[#c2641e]',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600' // Mountain peak / Progress / Spirit
  },
  {
    title: '目标愿景',
    enTitle: 'Vision',
    desc: (
      <>
        打造中国高端复合管业龙头企业。<br />
        为顾客创造价值，为股东创造利益，<br />
        为员工创造前途，为社会创造繁荣。
      </>
    ),
    bgColor: 'bg-[#0284C7]',
    darkColor: 'border-t-[#0369a1]',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600' // Modern building / Industry leader
  }
];

export default function Culture() {
  return (
    <section id="culture" className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="w-12 h-[2px] bg-brand-orange" />
            <h2 className="text-xl font-bold text-brand-orange uppercase tracking-[0.2em]">
              企业文化 / CULTURE
            </h2>
            <div className="w-12 h-[2px] bg-brand-orange" />
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mt-8">
          {cultureItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative mx-2"
            >
              {/* Header Ribbon */}
              <div className={`absolute -top-4 -left-3 -right-3 h-24 rounded-t-lg flex flex-col items-center justify-center text-white z-20 shadow-md ${item.bgColor}`}>
                <h3 className="text-xl font-bold tracking-widest mb-1">{item.title}</h3>
                <p className="text-sm opacity-90 tracking-wider">({item.enTitle})</p>
                
                {/* Left Triangle */}
                <div className={`absolute -bottom-2 left-0 w-0 h-0 border-t-[8px] border-l-[8px] border-l-transparent ${item.darkColor}`} />
                {/* Right Triangle */}
                <div className={`absolute -bottom-2 right-0 w-0 h-0 border-t-[8px] border-r-[8px] border-r-transparent ${item.darkColor}`} />
              </div>
              
              {/* Card Body */}
              <div className="bg-[#F8F9FA] pt-32 pb-0 rounded-b-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] h-[420px] relative overflow-hidden flex flex-col border border-slate-100">
                {/* Text Content */}
                <div className="relative z-10 px-6 text-center font-bold text-slate-800 leading-loose text-base">
                  {item.desc}
                </div>
                
                {/* Background Image at bottom */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[55%] bg-cover bg-top" 
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                   {/* Gradient overlay to blend image with the light background */}
                   <div className="absolute inset-0 bg-gradient-to-b from-[#F8F9FA] via-[#F8F9FA]/80 to-transparent h-20" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
