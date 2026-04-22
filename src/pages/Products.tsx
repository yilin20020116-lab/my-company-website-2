import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { productData } from '../data/products';

export default function ProductsPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const currentCategoryData = productData.find(c => c.id === categoryId) || productData[0];
  
  const [activeHoverCategory, setActiveHoverCategory] = useState<string | null>(null);

  useEffect(() => {
    // If we land on /products without a category, handle it quietly or scroll to top
    if (!categoryId) {
      navigate(`/products/${productData[0].id}`, { replace: true });
      return;
    }

    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [categoryId, location.hash, navigate]);

  return (
    <div className="pt-[140px]">
      <section className="w-full relative line-height-0 block">
        <img src="https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E4%BA%A7%E5%93%81%E4%B8%AD%E5%BF%83banner.jpg" alt="产品中心" className="w-full h-auto block" referrerPolicy="no-referrer" />
      </section>

      {/* Secondary Navigation */}
      <div className="bg-[#559bd9] relative z-40 sticky top-[72px]" onMouseLeave={() => setActiveHoverCategory(null)}>
        <div className="max-w-[1200px] mx-auto overflow-x-auto no-scrollbar">
          <ul className="flex justify-center min-w-max md:min-w-0">
            {productData.map((category, idx) => {
              const isActive = currentCategoryData.id === category.id;
              return (
                <li 
                  key={idx} 
                  className={`relative w-[180px] md:w-[240px] shrink-0 text-center transition-colors duration-300 ${isActive ? 'bg-[#e58a44]' : 'bg-transparent'}`}
                  onMouseEnter={() => setActiveHoverCategory(category.id)}
                >
                  <button 
                    onClick={() => {
                      setActiveHoverCategory(null);
                      navigate(`/products/${category.id}`);
                    }}
                    className="w-full py-4 text-[16px] md:text-[18px] text-white font-medium"
                  >
                    {category.category}
                  </button>
                  
                  {/* Triangle indicator */}
                  {(isActive || activeHoverCategory === category.id) && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white z-50"></div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Full-width Horizontal Submenu */}
        <AnimatePresence>
          {activeHoverCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-white shadow-md overflow-hidden z-40"
            >
              <div className="max-w-[1400px] mx-auto px-6">
                <ul className="flex flex-wrap justify-center items-center gap-x-6 lg:gap-x-8 gap-y-4 py-5">
                  {productData.find(c => c.id === activeHoverCategory)?.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <button 
                        onClick={() => {
                          if (activeHoverCategory === currentCategoryData.id) {
                            // If we are already on the correct category, just scroll
                            const element = document.getElementById(`product-${item.title}`);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                          } else {
                            // Link to the correct category and hash
                            navigate(`/products/${activeHoverCategory}#product-${item.title}`);
                          }
                          setActiveHoverCategory(null);
                        }}
                        className="text-[14px] text-[#333] hover:text-[#e58a44] transition-colors whitespace-nowrap"
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ProductGrid data={currentCategoryData} />
    </div>
  );
}
