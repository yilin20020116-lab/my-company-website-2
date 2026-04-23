import React, { useState, useEffect } from 'react';
import { ArrowUp, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataService, SiteSettings } from '../services/dataService';

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    DataService.getSettings().then(setSettings);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sitemap = [
    {
      title: '首页',
      href: '/',
      links: []
    },
    {
      title: '关于兴欣',
      href: '/about',
      links: [
        { name: '公司简介', href: '/about' },
        { name: '荣誉资质', href: '/qualifications' }
      ]
    },
    {
      title: '产品中心',
      href: '/products',
      links: [
        { name: '供水产品', href: '/products/water' },
        { name: '排水产品', href: '/products/drainage' },
        { name: '连接件', href: '/products/accessories' }
      ]
    },
    {
      title: '工程案例',
      href: '/cases',
      links: [
        { name: '市政案例', href: '/cases#municipal' },
        { name: '农业案例', href: '/cases#agriculture' },
        { name: '工业案例', href: '/cases#industrial' },
        { name: '矿山案例', href: '/cases#mining' }
      ]
    },
    {
      title: '新闻中心',
      href: '/news',
      links: [
        { name: '企业动态', href: '/news#company' },
        { name: '行业资讯', href: '/news#industry' },
        { name: '技术知识', href: '/news#technical' }
      ]
    },
    {
      title: '联系我们',
      href: '/contact',
      links: [
        { name: '联系方式', href: '/contact' },
        { name: '在线留言', href: '/message' }
      ]
    }
  ];

  return (
    <footer className="bg-[#0f4e8b] text-white pt-16 pb-8 px-6 md:px-12 lg:px-24 font-sans">
      <div className="max-w-[1400px] mx-auto relative">
        {/* Top row with Logo/Contacts and Sitemap */}
        <div className="flex flex-col lg:flex-row justify-between mb-16 gap-16">
          
          {/* Left Column (Contact & Social & Search) */}
          <div className="lg:w-[35%]">
            {/* Brand Logo */}
            <div className="flex items-center gap-6 mb-10">
              <img 
                src={settings?.global?.logo || "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E5%85%B4%E6%AC%A3logo%E6%A0%87.png?t=1"}
                alt="兴欣科技" 
                className="h-[200px] w-auto object-contain drop-shadow-lg" 
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-[32px] leading-none tracking-wider">兴欣科技</span>
                <span className="text-[12px] uppercase tracking-[0.1em] opacity-80 mt-1 font-medium">Xingxin Pipes</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-white/90 text-[15px] font-medium mr-2">关于我们:</span>
              
              <div className="flex gap-4">
                {/* WeChat Channels */}
                <div className="relative group">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 hover:bg-[#07c160] transition-colors cursor-pointer border border-white/10 shadow-sm relative z-20">
                    <svg viewBox="0 0 576 512" fill="currentColor" className="w-[24px] h-[24px]">
                      <path d="M385.2 167.6c6.4 0 12.6.3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13.6 104.9 13.6 195.3c0 53.6 29.8 102.1 76.8 135.2L70 376l61.5-31.5c23.6 6.8 48.6 10.4 74.5 10.4 7.6 0 15-.3 22.4-1.1-6-15.1-9.3-31.8-9.3-49.3 0-75.7 68.6-137 156.1-137.1zM130.6 150.3c-13.6 0-24.6-11.2-24.6-24.9 0-13.8 11-25 24.6-25 13.6 0 24.6 11.2 24.6 25 0 13.7-11 24.9-24.6 24.9zm135.5 0c-13.6 0-24.6-11.2-24.6-24.9 0-13.8 11-25 24.6-25 13.6 0 24.6 11.2 24.6 25 .1 13.7-11 24.9-24.6 24.9zm101.4 179.8c-10.7 0-19.3-8.8-19.3-19.7 0-10.9 8.6-19.7 19.3-19.7 10.7 0 19.3 8.8 19.3 19.7 0 10.9-8.6 19.7-19.3 19.7zm93.4 0c-10.7 0-19.3-8.8-19.3-19.7 0-10.9 8.6-19.7 19.3-19.7 10.7 0 19.3 8.8 19.3 19.7 0 10.9-8.7 19.7-19.3 19.7zm-26.6 63.8l-40.4 20.7 13.4-29.8c-29.5-20.7-48.4-53.7-48.4-90.1 0-61.9 55.4-112 123.6-112s123.6 50.1 123.6 112c0 61.9-55.4 112-123.6 112-16.7 0-32.5-2.2-48.2-12.8z"/>
                    </svg>
                  </div>
                  {/* QR Popup */}
                  <div className="absolute top-[80%] left-[80%] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 w-[160px] bg-white p-2 shadow-2xl z-50 border-4 border-white pointer-events-none">
                    <img src={settings?.global?.qrCode1 || "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7.jpg"} alt="微信公众号二维码" className="w-full h-auto border border-slate-100" referrerPolicy="no-referrer" />
                  </div>
                </div>

                {/* Douyin */}
                <div className="relative group">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 hover:bg-[#111111] transition-colors cursor-pointer border border-white/10 shadow-sm relative z-20">
                    <svg viewBox="0 0 448 512" fill="currentColor" className="w-[22px] h-[22px]">
                      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                    </svg>
                  </div>
                  <div className="absolute top-[80%] left-[80%] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 w-[160px] bg-white p-2 shadow-2xl z-50 border-4 border-white pointer-events-none">
                    <img src={settings?.global?.qrCode2 || "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E6%8A%96%E9%9F%B3.png"} alt="官方抖音二维码" className="w-full h-auto border border-slate-100" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details Text */}
            <div className="space-y-4 text-[15px] font-medium tracking-wide leading-relaxed mb-8">
              <div className="flex items-end gap-3 pb-2 pt-2">
                <div className="flex justify-between w-[64px] opacity-90">服务热线</div>
                <span>:</span>
                <span className="text-[28px] font-bold font-display leading-[0.8]">{settings?.global?.phone || '027-53018822'}</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex justify-between w-[64px] opacity-90 shrink-0"><span>地</span><span>址</span></div>
                <span>:</span>
                <span className="opacity-90 max-w-[280px]">{settings?.global?.address || '湖北省鄂州市鄂城区四海大道58号'}</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex justify-between w-[64px] opacity-90 shrink-0"><span>邮</span><span>箱</span></div>
                <span>:</span>
                <span className="opacity-90">{settings?.global?.email || 'ezxxjc@163.com'}</span>
              </div>
            </div>

            {/* Search Bar in Footer */}
            <div className="relative max-w-sm">
              <input 
                type="text" 
                placeholder="搜索感兴趣的内容..." 
                className="w-full bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg py-3 px-4 outline-none focus:bg-white/20 focus:border-white/40 transition-all text-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#e58a44] transition-colors p-1">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Right Column (Sitemap Grid) */}
          <div className="lg:w-[62%] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-4 pt-4">
            {sitemap.map((section, idx) => (
              <div key={idx} className="flex flex-col">
                <Link to={section.href} className="text-[16px] font-medium text-white mb-2 tracking-wide hover:text-[#e58a44] transition-colors">
                  {section.title}
                </Link>
                <div className="w-[30px] h-[1px] bg-white/50 mb-5"></div>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      {link.href.startsWith('#') ? (
                        <a href={link.href} className="text-[14px] text-white/70 hover:text-[#e58a44] transition-colors block">
                          {link.name}
                        </a>
                      ) : (
                        <Link to={link.href} className="text-[14px] text-white/70 hover:text-[#e58a44] transition-colors block">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 relative">
          <p className="text-[12px] text-white/50 tracking-wider">
            © {new Date().getFullYear()} 湖北兴欣科技股份有限公司 版权所有. {settings?.global?.icp || '鄂ICP备XXXXXXXX号'}
          </p>
          <div className="flex items-center gap-8">
            <button 
              onClick={scrollToTop}
              title="回到顶部"
              className="text-[#e58a44] hover:text-white transition-colors p-3 hover:bg-[#e58a44] bg-white/5 rounded-full border border-white/10 shadow-lg"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
