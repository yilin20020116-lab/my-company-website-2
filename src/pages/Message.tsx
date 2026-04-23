import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquarePlus, Send, CheckCircle2 } from 'lucide-react';
import { DataService } from '../services/dataService';

export default function MessagePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await DataService.addItem('messages', {
        ...formData,
        date: new Date().toISOString()
      });
      setIsSubmitted(true);
      setFormData({ productName: '', name: '', phone: '', email: '', address: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      alert("提交失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 bg-[#f8f9fa] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="./在线留言banner.png" alt="在线留言" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0f4e8b]/70 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-orange/20 rotate-3"
          >
            <MessageSquarePlus size={32} className="text-white -rotate-3" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-wider"
          >
            在线留言
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-xl mx-auto"
          >
            您的意见是我们前进的动力，留下您的需求，我们将尽快与您联系。
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24 relative z-20 -mt-10 md:-mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-brand-blue/5 relative overflow-hidden"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#559bd9]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">填写留言信息</h2>
              <div className="w-12 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-slate-700 mb-2">产品名称</label>
                <input 
                  type="text" 
                  id="productName" 
                  value={formData.productName}
                  onChange={e => setFormData({...formData, productName: e.target.value})}
                  placeholder="如果您对特定产品感兴趣，请填写产品名称"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">姓名 <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="请输入您的尊姓大名"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">联系电话 <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" 
                    id="phone" 
                    required 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="请输入您的手机号码"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">电子邮箱</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="请输入您的常用邮箱 (选填)"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">联系地址</label>
                  <input 
                    type="text" 
                    id="address" 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    placeholder="请输入您的联系地址 (选填)"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">留言内容 <span className="text-red-500">*</span></label>
                <textarea 
                  id="message" 
                  rows={5} 
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="为了更快地帮助到您，请详细描述您的需求..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full md:w-auto md:px-16 py-4 bg-brand-blue hover:bg-[#0c4075] text-white rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-brand-blue/20 group disabled:opacity-50"
                >
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  {loading ? '提交中...' : '提交留言'}
                </button>
              </div>
            </form>

            {/* Success Overlay */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex items-center justify-center rounded-2xl"
                >
                  <motion.div 
                    initial={{ scale: 0.8, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="flex flex-col items-center text-center px-6"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">提交成功！</h3>
                    <p className="text-slate-600">感谢您的留言，我们的工作人员会尽快与您取得联系。</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </section>
    </div>
  );
}
