import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Layers } from 'lucide-react';

interface ProductItem {
  title: string;
  advantages: string;
  applications: string;
  image: string;
}

interface CategoryData {
  category: string;
  id: string;
  items: ProductItem[];
}

interface ProductGridProps {
  data: CategoryData;
}

export default function ProductGrid({ data }: ProductGridProps) {
  return (
    <div className="bg-white">
      <section id={data.id} className="w-full">
        <div className="w-full bg-white py-12 md:py-16 text-center border-t border-slate-100">
          <h2 className="text-3xl md:text-3xl font-bold text-slate-800 tracking-wide">{data.category}</h2>
          <div className="w-12 h-1 bg-[#e58a44] mx-auto mt-4"></div>
        </div>
        <ul className="w-full">
          {data.items.map((product, i) => {
            const isEven = i % 2 === 1;
            
            return (
              <li 
                key={product.title} 
                id={`product-${product.title}`}
                className={`w-full h-auto py-16 md:py-24 overflow-hidden ${isEven ? 'bg-[#559bd9]' : 'bg-[#f8f9fa]'}`}
              >
                <div className="max-w-[1200px] mx-auto relative flex flex-col md:flex-row items-center px-6 md:px-0 min-h-[460px]">
                  
                  {/* Image */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`w-full md:w-[600px] mb-10 md:mb-0 md:absolute md:top-0 md:bottom-0 md:my-auto md:h-[460px] z-0 ${isEven ? 'md:left-[-110px]' : 'md:right-[-119px]'}`}
                  >
                    <Link to={`/product/${encodeURIComponent(product.title)}`} state={{ fromProducts: true }} className="block relative group overflow-hidden rounded-xl shadow-2xl h-full cursor-pointer">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brand-blue/20 backdrop-blur-[2px]">
                        <span className="bg-brand-orange text-white px-6 py-3 rounded-full font-bold tracking-widest shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">查看详情</span>
                      </div>
                    </Link>
                  </motion.div>

                  {/* Text Content */}
                  <div className={`w-full md:w-[540px] relative z-10 ${isEven ? 'md:ml-auto md:mr-[30px]' : 'md:ml-[30px]'}`}>
                    <motion.h3 
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <Link to={`/product/${encodeURIComponent(product.title)}`} state={{ fromProducts: true }} className={`block text-[24px] md:text-[28px] font-bold mb-[16px] ${isEven ? 'text-white' : 'text-slate-800'} whitespace-nowrap tracking-tight hover:text-brand-orange transition-colors`}>
                        {product.title}
                      </Link>
                      <div className={`w-12 h-1 mb-8 ${isEven ? 'bg-white/50' : 'bg-[#e58a44]'}`}></div>
                    </motion.h3>
                    
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="mb-8"
                    >
                      <div className={`flex items-center gap-2 py-[10px] border-b mb-[16px] ${isEven ? 'border-white/30' : 'border-slate-200'}`}>
                        <CheckCircle2 size={20} className={isEven ? 'text-white' : 'text-[#559bd9]'} />
                        <span className={`font-semibold text-[18px] ${isEven ? 'text-white' : 'text-slate-800'}`}>
                          产品优势
                        </span>
                      </div>
                      <div className={`pl-4 border-l-2 ${isEven ? 'border-white/20' : 'border-[#559bd9]/20'}`}>
                        <p className={`text-[15px] leading-[1.8] text-justify ${isEven ? 'text-white/90' : 'text-slate-600'}`}>
                          {product.advantages}
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <div className={`flex items-center gap-2 py-[10px] border-b mb-[16px] ${isEven ? 'border-white/30' : 'border-slate-200'}`}>
                        <Layers size={20} className={isEven ? 'text-white' : 'text-[#559bd9]'} />
                        <span className={`font-semibold text-[18px] ${isEven ? 'text-white' : 'text-slate-800'}`}>
                          应用领域
                        </span>
                      </div>
                      <div className={`pl-4 border-l-2 ${isEven ? 'border-white/20' : 'border-[#559bd9]/20'}`}>
                        <p className={`text-[15px] leading-[1.8] text-justify ${isEven ? 'text-white/90' : 'text-slate-600'}`}>
                          {product.applications}
                        </p>
                      </div>
                      
                      <Link 
                        to={`/product/${encodeURIComponent(product.title)}`} 
                        state={{ fromProducts: true }}
                        className={`inline-flex items-center justify-center mt-[30px] px-[32px] py-[12px] rounded-full text-[15px] font-medium transition-all duration-300 ${
                          isEven 
                            ? 'bg-white text-[#559bd9] hover:bg-transparent hover:text-white border-2 border-white' 
                            : 'bg-[#559bd9] text-white hover:bg-[#e58a44] border-2 border-transparent hover:shadow-lg hover:shadow-[#e58a44]/30'
                        }`}
                      >
                        产品详情
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </Link>
                    </motion.div>
                  </div>
                  
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
