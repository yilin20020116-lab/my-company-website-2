import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Home, ArrowLeft, CheckCircle2, Layers, ShieldCheck, Box, Settings, Loader2 } from 'lucide-react';
import { productData as staticProductData } from '../data/products';
import { DataService, ProductItem } from '../services/dataService';

export default function ProductDetailPage() {
  const { productTitle } = useParams<{ productTitle: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [remoteProducts, setRemoteProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Determine where the user came from
  const isFromHome = location.state?.fromHome;
  const isFromProducts = location.state?.fromProducts;

  useEffect(() => {
    DataService.getProducts().then(rp => {
      setRemoteProducts(rp);
      setIsLoading(false);
    });
  }, []);

  const mergedProductData = useMemo(() => {
    const data = JSON.parse(JSON.stringify(staticProductData)); // deep clone
    remoteProducts.forEach(rp => {
      const cat = data.find((c: any) => c.id === rp.category);
      if (cat) {
        const existingIdx = cat.items.findIndex((item: any) => item.title === rp.name);
        const newItem = {
          title: rp.name,
          advantages: rp.description,
          applications: (rp as any).applications || '',
          image: rp.imageUrl || 'https://picsum.photos/600/400',
          richHTML: (rp as any).richHTML,
          detailImageUrl: (rp as any).detailImageUrl
        };

        if (existingIdx !== -1) {
          cat.items[existingIdx] = { ...cat.items[existingIdx], ...newItem };
        } else {
          cat.items.push(newItem);
        }
      }
    });
    return data;
  }, [remoteProducts]);

  useEffect(() => {
    if (isLoading) return;
    
    if (!productTitle) {
      navigate('/products', { replace: true });
      return;
    }

    let foundProduct = null;
    let foundCategory = null;

    for (const cat of mergedProductData) {
      const p = cat.items.find((item: any) => item.title === decodeURIComponent(productTitle));
      if (p) {
        foundProduct = p;
        foundCategory = cat;
        break;
      }
    }

    if (!foundProduct) {
      navigate('/products', { replace: true });
    } else {
      setProduct(foundProduct);
      setCategory(foundCategory);
    }
    
    window.scrollTo(0, 0);
  }, [productTitle, navigate, mergedProductData, isLoading]);

  if (!product || !category) return <div className="min-h-screen pt-20 flex items-center justify-center"><Loader2 className="w-8 h-8 text-brand-blue animate-spin" /></div>;

  return (
    <div className="pt-[140px] bg-slate-50 min-h-screen pb-20">
      
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center text-sm">
          <Link to="/" className="text-slate-500 hover:text-brand-blue flex items-center gap-1 transition-colors">
            <Home size={16} /> 首页
          </Link>
          <ChevronRight size={16} className="text-slate-400 mx-2" />
          
          {isFromHome ? (
            <>
              <span className="text-slate-500">
                产品详情
              </span>
              <ChevronRight size={16} className="text-slate-400 mx-2" />
            </>
          ) : (
            <>
              <Link to="/products" className="text-slate-500 hover:text-brand-blue transition-colors">
                产品中心
              </Link>
              <ChevronRight size={16} className="text-slate-400 mx-2" />
              <Link to={`/products/${category.id}`} className="text-slate-500 hover:text-brand-blue transition-colors">
                {category.category}
              </Link>
              <ChevronRight size={16} className="text-slate-400 mx-2" />
            </>
          )}

          <span className="text-brand-blue font-medium">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-6 md:mt-10 text-slate-800">
        
        {/* Back Button */}
        <button 
          onClick={() => {
            if (isFromHome) {
              navigate('/');
            } else if (isFromProducts) {
              navigate(-1); // or /products
            } else {
              navigate(-1);
            }
          }} 
          className="flex items-center gap-2 text-slate-500 hover:text-brand-blue transition-colors mb-6 group w-fit"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          返回上一步
        </button>

        {/* Top Section: Image & Basic Info */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-brand-blue/5 overflow-hidden flex flex-col md:flex-row gap-10 lg:gap-16 border border-slate-100">
          
          {/* Main Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-1/2 relative bg-slate-50 rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center p-4 border border-slate-100"
          >
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover rounded-xl shadow-sm hover:scale-105 transition-transform duration-700 cursor-zoom-in"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Basic Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-1/2 flex flex-col"
          >
            <div className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-bold tracking-wide mb-4 self-start border border-brand-blue/20">
              {category.category}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight leading-tight">
              {product.title}
            </h1>
            
            <div className="w-16 h-1 bg-brand-orange mb-8 rouned-full"></div>

            <div className="space-y-6 flex-grow text-slate-600 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              <div className="flex gap-4 items-start">
                <Box className="text-[#559bd9] shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">产品特性简介</h3>
                  <p className="text-sm leading-relaxed">{(product.advantages || '').substring(0, 100)}...</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <Settings className="text-[#559bd9] shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">适用场景</h3>
                  <p className="text-sm leading-relaxed">{product.applications}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link 
                to="/message" 
                className="bg-brand-blue text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-[#0c4075] transition-all shadow-lg focus:ring-4 focus:ring-brand-blue/30"
              >
                在线询价
              </Link>
              <Link 
                to="/contact" 
                className="bg-white text-brand-blue border-2 border-brand-blue/20 px-8 py-4 rounded-xl font-bold text-center hover:border-brand-blue hover:bg-brand-blue/5 transition-all"
              >
                联系客服
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Detailed Info Tabs/Sections */}
        <div className="mt-12 bg-white rounded-3xl p-6 md:p-12 shadow-xl shadow-brand-blue/5 border border-slate-100">
          
          <div className="flex items-center gap-4 mb-10 pb-4 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <ShieldCheck className="text-brand-orange" size={28} />
              产品图文详情
            </h2>
          </div>

          {product.richHTML ? (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-slate prose-lg max-w-none prose-headings:text-brand-blue prose-a:text-brand-orange hover:prose-a:text-brand-orange/80 prose-img:rounded-xl prose-table:overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: product.richHTML }}
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="text-[#559bd9]" size={24} />
                  <h3 className="text-xl font-bold text-slate-800 tracking-wide">产品优势</h3>
                </div>
                <div className="prose prose-slate max-w-none prose-p:leading-loose text-slate-600 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <p>
                    {product.advantages}
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Layers className="text-[#559bd9]" size={24} />
                  <h3 className="text-xl font-bold text-slate-800 tracking-wide">应用领域</h3>
                </div>
                <div className="prose prose-slate max-w-none prose-p:leading-loose text-slate-600 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <p>
                    {product.applications || ''}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {(product.applications || '').split('、').filter(Boolean).map((app: string, idx: number) => (
                      <span key={idx} className="bg-brand-blue/5 text-brand-blue px-3 py-1 rounded-full text-sm font-medium border border-brand-blue/10">
                        {app.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* detail image */}
          {product.detailImageUrl && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 border-t border-slate-100 pt-8"
            >
              <img src={product.detailImageUrl} alt="产品详情图" className="w-full h-auto rounded-xl shadow-sm" />
            </motion.div>
          )}

          <div className="mt-12 text-center pt-8 border-t border-slate-100">
             <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-brand-blue font-bold px-6 py-3 rounded-full hover:bg-brand-blue/5 transition-colors">
               <ArrowLeft size={18} /> 返回产品列表
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}
