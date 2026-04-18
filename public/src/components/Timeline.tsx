import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const timelineData = [
  {
    year: '1994',
    title: '公司成立',
    content: '湖北兴欣科技股份有限公司正式创立。',
  },
  {
    year: '2005',
    title: '技术引进',
    content: '引进华中地区第一条钢丝网骨架聚乙烯复合管生产线。',
  },
  {
    year: '2008',
    title: '规模扩张',
    content: '成为华中地区规格最齐全电熔管件生产企业。',
  },
  {
    year: '2015',
    title: '品牌跨越',
    content: '荣获中国驰名商标，获批湖北省企业技术中心，引进中南地区第一条钢骨架管生产线。',
  },
  {
    year: '2016',
    title: '产品创新',
    content: '引进华中地区第一条多重增强钢塑复合管生产线。',
  },
  {
    year: '2018',
    title: '品质认可',
    content: '荣获“湖北名牌产品”称号。',
  },
  {
    year: '2021',
    title: '科技领先',
    content: '获评“国家级高新技术企业”。',
  },
  {
    year: '2022',
    title: '专精特新',
    content: '入选上市后备“金种子”企业，获评湖北省“专精特新”小巨人企业。',
  },
  {
    year: '2023',
    title: '知识产权',
    content: '获评“国家知识产权优势企业”。',
  },
  {
    year: '2024',
    title: '实验室认证',
    content: '通过国家CNAS实验室认证，科研实力再上新台阶。',
  },
];

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(activeIndex);
  const isScrollingRef = useRef(false);

  // Keep ref in sync with state for the event listener
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Handle wheel scroll to navigate years
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      
      // Only hijack scroll if hovering over the left half (timeline area)
      if (mouseX > rect.width * 0.50) {
        return; // Allow normal page scroll
      }

      const currentIdx = activeIndexRef.current;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      const canScrollDown = currentIdx < timelineData.length - 1;
      const canScrollUp = currentIdx > 0;

      // Only hijack scroll if we can actually navigate in that direction
      if ((isScrollingDown && canScrollDown) || (isScrollingUp && canScrollUp)) {
        e.preventDefault(); // Stop page scroll
        
        if (!isScrollingRef.current) {
          isScrollingRef.current = true;
          
          if (isScrollingDown) {
            setActiveIndex(currentIdx + 1);
          } else {
            setActiveIndex(currentIdx - 1);
          }
          
          // Debounce to prevent rapid skipping
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 800); 
        }
      }
    };

    // Use passive: false to allow preventDefault
    section.addEventListener('wheel', handleWheel, { passive: false });
    return () => section.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <section ref={sectionRef} id="history" className="relative h-[900px] bg-[#0A1931] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&q=80&w=2000" 
          alt="Ocean Background" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1931] via-[#0A1931]/80 to-transparent" />
      </div>

      {/* Left Arc Background - Shifted Left */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 rounded-full bg-[#0B162C] border-r border-white/10 z-10 shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
        style={{ 
          width: '3000px', 
          height: '3000px', 
          right: 'calc(50% + 150px)' // Right edge is 150px left of center
        }} 
      />

      {/* Title inside Arc */}
      <div className="absolute right-[calc(50%+250px)] top-1/2 -translate-y-1/2 z-20 text-right">
        <h2 className="text-7xl font-display font-bold text-white mb-4 tracking-wider">发展历程</h2>
        <p className="text-white/50 tracking-widest uppercase text-lg">DEVELOPMENT HISTORY</p>
      </div>

      {/* Active Indicator Triangle */}
      <div className="absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-500" style={{ right: 'calc(50% + 150px)' }}>
        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[14px] border-l-white translate-x-full" />
      </div>

      {/* Curved Timeline Years */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0 z-20">
        {timelineData.map((item, index) => {
          const offset = index - activeIndex;
          const y = offset * 110; // Increased vertical spacing (拉长)
          const r = 1500; // Radius of the arc
          // centerX is -1500 - 150 = -1650
          const centerX = -1650;
          const x = centerX + Math.sqrt(r * r - y * y);
          
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 4;

          if (!isVisible) return null;

          return (
            <motion.div
              key={item.year}
              className="absolute -translate-y-1/2 cursor-pointer flex items-center"
              initial={false}
              animate={{ 
                y, 
                x: x + 40, // 40px padding from the edge
                opacity: 1 - Math.abs(offset) * 0.2,
                scale: isActive ? 1.1 : 1
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={() => setActiveIndex(index)}
            >
              <span className={`font-display font-bold transition-colors ${isActive ? 'text-white text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-white/40 text-lg hover:text-white/80'}`}>
                {item.year}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="absolute left-[calc(50%+50px)] top-1/2 -translate-y-1/2 z-20 w-[600px] pr-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h3 className="text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">{timelineData[activeIndex].year}</h3>
            <h4 className="text-2xl font-bold text-white mb-4 drop-shadow-md">{timelineData[activeIndex].title}</h4>
            <p className="text-lg text-white/80 leading-relaxed drop-shadow-md">
              {timelineData[activeIndex].content}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute bottom-10 right-[calc(50%+150px)] translate-x-1/2 z-20 flex flex-col items-center animate-bounce opacity-50 pointer-events-none">
        <span className="text-white/80 text-xs mb-2 tracking-widest uppercase">在左侧滑动</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
