import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, Newspaper, Globe } from 'lucide-react';

const companyNews = [
  {
    title: '兴欣科技成功入选国家级“专精特新”小巨人企业名单',
    date: '2024-03-20',
    desc: '此次入选标志着公司在技术创新、市场占有率及品牌影响力方面获得了国家级认可。',
    image: 'https://picsum.photos/seed/news1/400/250'
  },
  {
    title: '公司2023年度总结表彰大会圆满落幕',
    date: '2024-01-15',
    desc: '回顾过去，展望未来。兴欣人将继续秉持“精益求精”的精神，再创佳绩。',
    image: 'https://picsum.photos/seed/news2/400/250'
  }
];

const industryNews = [
  {
    title: '中塑协：2024年塑料管道行业发展趋势分析报告发布',
    source: '中塑协',
    date: '2024-03-15'
  },
  {
    title: '广交会：高端复合管道成为海外客商关注焦点',
    source: '广交会',
    date: '2024-03-10'
  },
  {
    title: '国家水利部：加强农村饮水安全工程管网建设',
    source: '水利部',
    date: '2024-03-05'
  }
];

export default function News() {
  return (
    <section id="news" className="py-12 bg-brand-gray relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 text-[8rem] font-display font-bold text-slate-100 select-none pointer-events-none -translate-y-1/4 -translate-x-1/4">
        LATEST
      </div>
      
      <div className="max-w-[1600px] mx-auto relative z-10 px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {/* Company News (Main) */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="mb-6">
              <h4 className="text-xl font-bold text-slate-900">企业动态</h4>
            </div>
            
            <div className="flex flex-col gap-4 flex-1">
              {companyNews.map((news, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer grid md:grid-cols-12 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Left: Smaller Image Box */}
                  <div className="md:col-span-4 relative aspect-video md:aspect-auto overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Right: Compact Content */}
                  <div className="md:col-span-8 p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-brand-blue font-bold text-[9px] uppercase tracking-widest mb-2">
                      <Calendar size={10} />
                      {news.date}
                    </div>
                    <h5 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-blue transition-colors line-clamp-1">
                      {news.title}
                    </h5>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                      {news.desc}
                    </p>
                    <div className="flex items-center gap-2 text-brand-blue font-bold text-[10px] uppercase tracking-widest pt-3 border-t border-slate-50 w-fit">
                      阅读更多 <ArrowRight size={12} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Industry News (Sidebar) */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h4 className="text-xl font-bold text-slate-900">行业资讯</h4>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex-1 flex flex-col">
              <div className="space-y-4 flex-1">
                {industryNews.map((news, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group cursor-pointer pb-4 border-b border-slate-100 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-2 text-[9px] font-bold text-brand-orange uppercase tracking-widest mb-1">
                      <span>{news.source}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-slate-400">{news.date}</span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-brand-blue transition-colors leading-relaxed line-clamp-2">
                      {news.title}
                    </h5>
                  </motion.div>
                ))}
              </div>
              
              <button className="w-full mt-6 py-3 rounded-lg bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all">
                查看全部资讯
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
