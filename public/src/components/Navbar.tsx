import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, PhoneCall, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: '首页', en: 'Home', href: '/' },
  { 
    name: '关于兴欣', 
    en: 'About', 
    href: '/about',
    subLinks: [
      { name: '公司简介', href: '/about' },
      { name: '荣誉资质', href: '/qualifications' },
    ]
  },
  { 
    name: '产品中心', 
    en: 'Products', 
    href: '/products',
    subLinks: [
      { name: '供水产品', href: '/products/water' },
      { name: '排水产品', href: '/products/drainage' },
      { name: '连接件', href: '/products/accessories' },
    ]
  },
  { 
    name: '工程案例', 
    en: 'Cases', 
    href: '/cases',
    subLinks: [
      { name: '市政案例', href: '/cases#municipal' },
      { name: '农业案例', href: '/cases#agriculture' },
      { name: '工业案例', href: '/cases#industrial' },
      { name: '矿山案例', href: '/cases#mining' },
    ]
  },
  { 
    name: '新闻中心', 
    en: 'News', 
    href: '/news',
    subLinks: [
      { name: '企业动态', href: '/news#company' },
      { name: '行业资讯', href: '/news#industry' },
      { name: '技术知识', href: '/news#technical' },
    ]
  },
  { 
    name: '联系我们', 
    en: 'Contact', 
    href: '/contact',
    subLinks: [
      { name: '联系方式', href: '/contact' },
      { name: '在线留言', href: '/message' },
    ]
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'cn' | 'en'>('cn');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4',
        isScrolled || location.pathname !== '/' ? 'glass py-3 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold text-xl">
            兴
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "font-display font-bold text-xl leading-none transition-colors", 
              isScrolled || location.pathname !== '/' ? "text-brand-blue" : "text-white"
            )}>
              湖北兴欣科技
            </span>
            <span className={cn(
              "text-[10px] uppercase tracking-widest opacity-70 transition-colors",
              isScrolled || location.pathname !== '/' ? "text-slate-500" : "text-white/70"
            )}>
              Hubei Xingxin Technology
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group"
              onMouseEnter={() => link.subLinks && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.href}
                className={cn(
                  "text-base font-medium transition-colors flex items-center gap-1 py-2",
                  isScrolled || location.pathname !== '/' ? "text-slate-700 hover:text-brand-blue" : "text-white/90 hover:text-white"
                )}
              >
                {lang === 'cn' ? link.name : link.en}
                {link.subLinks && (
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>

              {/* Dropdown Menu */}
              {link.subLinks && (
                <div className={cn(
                  "absolute top-full left-0 w-48 bg-white shadow-xl rounded-xl py-2 border border-slate-100 transition-all duration-300 origin-top",
                  activeDropdown === link.name ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
                )}>
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.href}
                      className="block px-6 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-blue transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            title="搜索"
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
              isScrolled || location.pathname !== '/' ? "text-slate-700 hover:bg-slate-100" : "text-white/90 hover:bg-white/20"
            )}
          >
            <Search size={18} />
          </button>
          <button
            onClick={() => setLang(lang === 'cn' ? 'en' : 'cn')}
            className={cn(
              "flex items-center gap-1 text-base font-medium transition-colors ml-2",
              isScrolled || location.pathname !== '/' ? "text-slate-700 hover:text-brand-blue" : "text-white/90 hover:text-white"
            )}
          >
            <Globe size={16} />
            {lang === 'cn' ? 'EN' : '中文'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "lg:hidden p-2",
            isScrolled || location.pathname !== '/' ? "text-slate-900" : "text-white"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl lg:hidden p-6 flex flex-col gap-4 border-t"
          >
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  to={link.href}
                  className="text-lg font-medium hover:text-brand-orange block py-2"
                >
                  {lang === 'cn' ? link.name : link.en}
                </Link>
                {link.subLinks && (
                  <div className="pl-4 border-l-2 border-slate-100 flex flex-col gap-2 mt-2">
                    {link.subLinks.map(sub => (
                      <Link key={sub.name} to={sub.href} className="text-sm text-slate-500 hover:text-brand-blue">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t flex flex-col gap-4">
              <button
                onClick={() => setLang(lang === 'cn' ? 'en' : 'cn')}
                className="flex items-center gap-2 text-lg font-medium"
              >
                <Globe size={20} />
                {lang === 'cn' ? 'English Version' : '中文版本'}
              </button>
              <Link
                to="/contact"
                className="bg-brand-blue text-white px-6 py-3 rounded-xl text-center font-medium"
              >
                {lang === 'cn' ? '立即咨询' : 'Inquiry Now'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
