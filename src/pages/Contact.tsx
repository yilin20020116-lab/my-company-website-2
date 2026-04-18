import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, HeadphonesIcon, Globe } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="./联系我们banner.png" alt="联系方式" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-blue/60 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-wider"
          >
            联系方式
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-1 bg-brand-orange mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            感谢您对兴欣科技的信任与支持，我们随时为您提供专业、高效的服务。
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-20 -mt-16 md:-mt-24 relative z-20">
        
        {/* Contact info grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Card 1: 商务中心 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-xl shadow-brand-blue/5 border border-slate-100 hover:border-brand-blue/30 transition-colors"
          >
            <div className="w-14 h-14 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue mb-6">
              <Phone size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-6">商务中心</h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                 <span className="text-slate-500 font-medium">服务热线 1</span>
                 <span className="text-brand-blue font-bold text-lg font-display tracking-wider">027-53018822</span>
               </div>
               <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                 <span className="text-slate-500 font-medium">服务热线 2</span>
                 <span className="text-brand-blue font-bold text-lg font-display tracking-wider">027-53018831</span>
               </div>
               <div className="flex justify-between items-center pb-1">
                 <span className="text-slate-500 font-medium">服务热线 3</span>
                 <span className="text-brand-blue font-bold text-lg font-display tracking-wider">027-53018853</span>
               </div>
            </div>
          </motion.div>

          {/* Card 2: 售后服务 & 产品投诉 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-xl shadow-brand-blue/5 border border-slate-100 hover:border-brand-blue/30 transition-colors"
          >
            <div className="w-14 h-14 bg-[#559bd9]/10 rounded-xl flex items-center justify-center text-[#559bd9] mb-6">
              <HeadphonesIcon size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-6">售后与监督</h3>
            
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">售后服务</h4>
            <div className="space-y-3 mb-6">
               <div className="flex justify-between items-center bg-slate-50/80 p-3 rounded-lg border border-slate-100">
                 <span className="text-slate-700 font-medium">曾部长</span>
                 <span className="text-[#559bd9] font-bold font-display tracking-wider">18696253750</span>
               </div>
               <div className="flex justify-between items-center bg-slate-50/80 p-3 rounded-lg border border-slate-100">
                 <span className="text-slate-700 font-medium">高部长</span>
                 <span className="text-[#559bd9] font-bold font-display tracking-wider">13971995433</span>
               </div>
            </div>

            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">产品投诉</h4>
            <div className="flex justify-between items-center bg-brand-orange/5 p-3 rounded-lg border border-brand-orange/10">
              <span className="text-brand-orange font-medium">熊经理</span>
              <span className="text-brand-orange font-bold font-display tracking-wider">18671108676</span>
            </div>
          </motion.div>

          {/* Card 3: 总部信息 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl shadow-brand-blue/5 border border-slate-100 hover:border-brand-blue/30 transition-colors"
          >
            <div className="w-14 h-14 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange mb-6">
              <MapPin size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-6">总部信息</h3>
            
            <div className="space-y-5 text-slate-600">
              <div className="flex items-start gap-4">
                <MapPin className="text-[#559bd9] shrink-0 mt-1" size={20} />
                <div>
                  <span className="block text-xs font-bold text-slate-400 mb-1 tracking-widest uppercase">地址</span>
                  <span className="font-medium text-[15px] text-slate-700">湖北省鄂州市四海大道58号</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-[#559bd9] shrink-0 mt-1" size={20} />
                <div>
                  <span className="block text-xs font-bold text-slate-400 mb-1 tracking-widest uppercase">邮编 & 邮箱</span>
                  <span className="font-medium block text-[15px] text-slate-700">436001</span>
                  <span className="font-medium block mt-1 hover:text-brand-blue cursor-pointer text-[15px] text-slate-700 transition-colors">ezxxjc@163.com</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Globe className="text-[#559bd9] shrink-0 mt-1" size={20} />
                <div>
                  <span className="block text-xs font-bold text-slate-400 mb-1 tracking-widest uppercase">官方网站</span>
                  <span className="font-medium block hover:text-brand-blue cursor-pointer text-[15px] text-slate-700 transition-colors">www.ezhouxx.com</span>
                  <span className="font-medium block mt-1 hover:text-brand-blue cursor-pointer text-[15px] text-slate-700 transition-colors">www.hubeixx.com</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Map & Office Display */}
        <div className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-4 md:p-8 shadow-xl shadow-brand-blue/5 border border-slate-100 flex flex-col items-center"
          >
            <div className="mb-8 flex items-center gap-3 w-full border-b border-slate-100 pb-5">
              <ShieldCheck className="text-brand-orange" size={32} />
              <h2 className="text-3xl font-bold text-slate-800 tracking-wide">湖北兴欣科技股份有限公司</h2>
            </div>
            
            {/* Fake Map Image Placeholder */}
            <div className="w-full bg-slate-100 rounded-xl min-h-[400px] relative overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/mapoffice/1200/600" 
                alt="兴欣科技位置" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between border-l-4 border-brand-blue gap-4">
                  <div>
                    <p className="font-bold text-slate-800 text-lg">总部园区 / 生产基地</p>
                    <p className="text-sm text-slate-600 mt-1">现代化管材管件生产基地与技术研发中心</p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#559bd9]/10 text-brand-blue px-4 py-2 rounded-lg text-sm font-bold">
                    <Clock size={18} /> 开放时间: 8:30 - 17:30
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
      </section>

    </div>
  );
}
