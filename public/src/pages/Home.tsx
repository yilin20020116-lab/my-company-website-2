import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import HomeProduct from '../components/HomeProduct';
import Stats from '../components/Stats';
import Cases from '../components/Cases';
import News from '../components/News';
import Partners from '../components/Partners';
import { motion } from 'motion/react';
import { ArrowRight, Play, Award, ShieldCheck, Settings, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pt-0">
      <Hero />
      
      {/* Why Choose Us Section - Flat Style from Image - Wider Layout */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
            {[
              {
                icon: Award,
                title: '30年行业深耕',
                desc: '始于1994年，三十载专注管道研发，拥有深厚的行业积淀与技术底蕴。'
              },
              {
                icon: ShieldCheck,
                title: '国家级高新技术',
                desc: '国家级“专精特新”小巨人企业，拥有4个省级研发平台及多项核心专利。'
              },
              {
                icon: Settings,
                title: '全生命周期服务',
                desc: '提供从产品研发、系统设计到施工指导、后期运维的一站式整体解决方案。'
              },
              {
                icon: Users,
                title: '卓越品牌背书',
                desc: '股票代码839675，长期服务于中建、中铁等大型央企，品质经得起考验。'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-brand-blue mb-6">
                  <item.icon size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <News />

      <HomeProduct />
      <Stats />
      <Cases />
      <Partners />
    </div>
  );
}
