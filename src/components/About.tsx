import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Award, TrendingUp, Users, ChevronRight } from 'lucide-react';

const stats = [
  { icon: Award, label: '行业地位', value: '国内前五', detail: '复合管道领军企业' },
  { icon: TrendingUp, label: '成立时间', value: '1994年', detail: '30年深耕管道行业' },
  { icon: Users, label: '研发实力', value: '4个省级', detail: '省级研发平台支持' },
  { icon: MapPin, label: '生产基地', value: '湖北鄂州', detail: '两大管道研发基地' },
];

export default function About() {
  return (
    <section id="about" className="pt-12 pb-20 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Header Section - Inspired by ERA.com.cn */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[2px] w-12 bg-brand-orange" />
              <span className="text-brand-orange font-bold tracking-[0.3em] uppercase text-sm">
                关于兴欣科技 / ABOUT US
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-tight"
            >
              立足湖北鄂州，<br />打造全球领先的管道系统。
            </motion.h2>
          </div>
        </div>

        {/* Content Section - Less rigid layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with offset decorative elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative lg:pr-12"
          >
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://github.com/yilin20020116-lab/companyweb-images/blob/main/%E5%85%B4%E6%AC%A3%E9%97%A8%E5%A4%B4%E8%B6%85%E9%AB%98%E6%B8%85%E4%BF%AE%E5%A4%8D.png?raw=true"
                alt="兴欣科技门头"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative background box - Offset */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-gray rounded-lg -z-10" />
            <div className="absolute -bottom-10 -right-4 w-48 h-48 bg-brand-blue/5 rounded-lg -z-10" />
            
            {/* Floating badge - Repositioned */}
            <div className="absolute -bottom-10 left-0 bg-white p-6 rounded-xl shadow-xl z-20 flex items-center gap-4 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                <TrendingUp size={20} />
              </div>
              <div>
                <div className="text-xl font-display font-bold text-slate-900">30+</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">行业深耕</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Detailed Text and Stats - Offset positioning */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10 lg:pl-8 lg:pt-12"
          >
            <div className="space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-brand-blue pl-6">
                湖北兴欣科技股份有限公司（股票代码：839675）是一家专注于高端复合管道研发、制造、安装设计、销售的高新技术企业。
              </p>
              <p className="text-lg text-slate-600 leading-relaxed pl-7">
                作为国家级高新技术企业，我们不仅提供高品质的管材及管件，更致力于为市政给排水、石油、化工等领域提供“产品+服务”的全生命周期解决方案。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
              {stats.map((stat, i) => (
                <div key={i} className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-gray group-hover:bg-brand-blue group-hover:text-white flex items-center justify-center text-brand-blue transition-colors">
                      <stat.icon size={20} />
                    </div>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.detail}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
