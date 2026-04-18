import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplets, Waves, Factory, Flame, ArrowRight, ChevronRight, Settings, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'water-supply',
    title: '供水系列',
    en: 'Water Supply',
    icon: Droplets,
    bgColor: 'bg-cyan-500',
    items: [
      {
        title: '多重增强钢塑复合压力管',
        description: '兴欣科技自主研发的高端给水管道。通过多层复合结构设计，完美融合了钢带的高环刚度与聚乙烯的卓越化学稳定性，在承受极高内压的同时保持优异的柔韧性。管材抗内外压能力兼优，长期强度稳定，电热熔焊接连接技术简便可靠，不会造成输送液体资源的浪费。抗内外腐蚀，使用寿命长，极强的耐磨性，安全无毒，柔性系统，良好地避免灾害，重量轻，施工安装费用低，原材料消耗成本低于纯塑或其他结构壁塑料压力管材，工程总体造价低，性价比高，具有很强的市场竞争力，管材结构稳定性好，节能环保。',
        features: ['多层复合增强结构', '承压能力显著提升', '卓越的抗蠕变性能', '卫生无毒，确保饮水安全'],
        image: '/多重增强钢塑复合压力管.png'
      },
      {
        title: 'PE给水管材',
        description: '采用优质聚乙烯原料，严格执行国家标准。具有良好的柔韧性、耐冲击性和优异的焊接性能，是城镇供水管网的首选。',
        features: ['卫生安全性好', '耐腐蚀寿命长', '施工连接方便'],
        image: 'https://picsum.photos/seed/water-2/1200/800'
      },
      {
        title: '孔网钢带聚乙烯复合管',
        description: '以冷轧钢带焊接而成的网状钢管为增强相，具有极佳的尺寸稳定性和抗冲击性能，适用于高压供水环境。',
        features: ['尺寸稳定性好', '抗冲击强度高', '双面防腐'],
        image: 'https://picsum.photos/seed/water-3/1200/800'
      }
    ]
  },
  {
    id: 'drainage',
    title: '排水系列',
    en: 'Drainage System',
    icon: Waves,
    bgColor: 'bg-blue-500',
    items: [
      {
        title: 'HDPE增强缠绕结构壁管(B型)',
        description: '克拉管，专为城市排污、雨水收集及大型排水工程设计。具有高环刚度和优异的抗沉降性能。',
        features: ['高环刚度', '柔性接口无泄漏', '耐化学腐蚀'],
        image: 'https://picsum.photos/seed/drain-1/1200/800'
      },
      {
        title: 'HDPE双壁波纹管',
        description: '具有重量轻、耐高压、韧性好、施工快、寿命长等特点，是传统水泥管和铸铁管的理想替代品。',
        features: ['结构独特强度高', '摩阻系数小', '综合造价低'],
        image: 'https://picsum.photos/seed/drain-2/1200/800'
      },
      {
        title: '预制检查井系统',
        description: '与管道系统完美配套，解决传统砖砌井易渗漏、施工慢的问题，确保排水系统的整体严密性。',
        features: ['安装快捷', '密封性能好', '耐腐蚀抗老化'],
        image: 'https://picsum.photos/seed/drain-3/1200/800'
      }
    ]
  },
  {
    id: 'connectors',
    title: '配套连接件',
    en: 'Connectors & Fittings',
    icon: Settings,
    bgColor: 'bg-brand-orange',
    items: [
      {
        title: '全系列电熔管件',
        description: '采用进口原料及先进工艺生产，布线均匀，焊接可靠，确保管道系统连接处与管材同寿命。',
        features: ['焊接强度高', '规格齐全', '操作简便'],
        image: 'https://picsum.photos/seed/fit-1/1200/800'
      },
      {
        title: '热熔对接管件',
        description: '适用于大口径管道连接，通过热熔对接工艺实现分子级融合，确保系统长期运行的安全稳定。',
        features: ['连接成本低', '密封性极佳', '耐压性能好'],
        image: 'https://picsum.photos/seed/fit-2/1200/800'
      },
      {
        title: '钢塑转换及抢修节',
        description: '解决不同材质管道连接及突发爆管抢修需求，提供快速、可靠的机械连接方案。',
        features: ['抢修速度快', '适应性强', '安装无需专业设备'],
        image: 'https://picsum.photos/seed/fit-3/1200/800'
      }
    ]
  },
];

export default function HomeProduct() {
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [activePage, setActivePage] = useState(0);

  // Reset page when tab changes
  React.useEffect(() => {
    setActivePage(0);
  }, [activeTab.id]);

  const currentItem = activeTab.items[activePage];

  return (
    <section className="pt-8 pb-16 bg-white overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Section Title Block */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-lg font-bold text-brand-orange uppercase tracking-[0.2em] mb-6"
          >
            产品推荐 / PRODUCTS
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight"
          >
            精工品质，<br />
            为您提供全方位管道解决方案。
          </motion.h3>
        </div>

        {/* Top: Category Navigation & View More */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat)}
                className={`px-8 py-3 rounded-full font-bold transition-all duration-300 border-2 text-lg ${
                  activeTab.id === cat.id 
                    ? 'bg-brand-blue border-brand-blue text-white shadow-lg' 
                    : 'bg-white border-slate-100 text-slate-500 hover:border-brand-blue/30'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
          
          <Link 
            to="/products"
            className="group flex items-center gap-2 text-brand-blue font-bold text-lg hover:text-brand-blue/80 transition-colors"
          >
            查看更多产品 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Main Content Area - Split Layout */}
        <div className="bg-slate-50 rounded-2xl shadow-2xl border border-white relative min-h-[480px] flex flex-col lg:flex-row">
          
          {/* Navigation Arrows - Top Right Positioned, Brand Blue */}
          <div className="absolute -top-7 right-12 z-40 flex gap-4">
            <button
              onClick={() => setActivePage((prev) => (prev - 1 + 3) % 3)}
              className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center hover:bg-brand-blue/90 transition-all shadow-xl border-2 border-white"
            >
              <ChevronRight size={24} className="rotate-180" />
            </button>
            <button
              onClick={() => setActivePage((prev) => (prev + 1) % 3)}
              className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center hover:bg-brand-blue/90 transition-all shadow-xl border-2 border-white"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Left Side: Text Content */}
          <div className="lg:w-[40%] p-12 md:p-14 flex flex-col justify-center bg-white relative z-20">
            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-brand-blue rounded-lg flex items-center justify-center text-white shrink-0">
                  <ThumbsUp size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold text-slate-900 leading-tight">热销产品推荐</h2>
                  <p className="text-slate-400 text-xs tracking-widest uppercase mt-1">HOT PRODUCT RECOMMENDATION</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="h-1.5 w-16 bg-brand-blue rounded-full" />
                <h3 className="text-2xl font-bold text-slate-800 leading-tight hover:text-brand-orange transition-colors">
                  <Link to={`/product/${encodeURIComponent(currentItem.title)}`}>
                    {currentItem.title}
                  </Link>
                </h3>
                <p className="text-slate-500 leading-relaxed text-base lg:text-[16px] line-clamp-4">
                  {currentItem.description}
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {currentItem.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-base font-medium text-slate-600">
                      <ChevronRight size={16} className="text-brand-blue" />
                      {f}
                    </div>
                  ))}
                </div>
                
                <Link to={`/product/${encodeURIComponent(currentItem.title)}`} className="inline-flex mt-4 text-brand-orange font-bold text-[15px] items-center gap-2 hover:gap-3 transition-all duration-300">
                  产品详情 <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Brand Logo Placeholder moved to bottom of text area */}
            <div className="mt-10 hidden sm:flex flex-col items-start opacity-30">
              <div className="text-brand-blue font-display font-bold text-xl tracking-tighter">XINGXIN</div>
              <div className="h-[1px] w-24 bg-brand-blue" />
              <div className="text-[9px] tracking-[0.3em] text-brand-blue font-bold">兴欣科技</div>
            </div>
          </div>

          {/* Right Side: Large Image with Water Background */}
          <div className="lg:w-[60%] relative min-h-[400px] lg:min-h-full overflow-hidden flex items-center justify-center bg-slate-50">
            {/* Water Background Effect */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://picsum.photos/seed/water-ripples/1200/800?blur=2" 
                alt="Water Background" 
                className="w-full h-full object-cover opacity-40"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent z-10" />
            </div>

            {/* Product Image - Large */}
            <Link to={`/product/${encodeURIComponent(currentItem.title)}`} className="relative z-20 w-full h-full flex items-center justify-center p-8 group cursor-pointer block">
              <img 
                key={currentItem.image}
                src={currentItem.image} 
                alt={currentItem.title} 
                className="max-w-[110%] max-h-[110%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
