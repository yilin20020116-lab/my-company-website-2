import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Eye, Share2, Printer } from 'lucide-react';
import { DataService, NewsItem } from '../services/dataService';

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNews = async () => {
      try {
        const allNews = await DataService.getNews();
        const found = allNews.find(n => n.id === id);
        if (found) {
          setNews(found);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading) return <div className="pt-[140px] h-screen flex justify-center items-center"><div className="animate-spin w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full"></div></div>;
  if (!news) return <div className="pt-[140px] h-screen flex justify-center text-slate-500">新闻不存在或已被删除</div>;

  return (
    <div className="pt-[110px] md:pt-[140px] bg-[#f8f9fa] min-h-screen pb-20">
      <div className="max-w-[800px] mx-auto px-6">
        
        {/* Breadcrumb */}
        <div className="py-6 flex items-center text-sm">
          <Link to="/" className="text-slate-500 hover:text-brand-blue transition-colors">
            首页
          </Link>
          <span className="text-slate-300 mx-2">/</span>
          <Link to="/news" className="text-slate-500 hover:text-brand-blue transition-colors">
            新闻中心
          </Link>
          <span className="text-slate-300 mx-2">/</span>
          <span className="text-slate-700 truncate">{news.title}</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100"
        >
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-500 hover:text-brand-blue transition-colors mb-8 group w-fit"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            返回列表
          </button>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            {news.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-10 pb-6 border-b border-slate-100">
            <span className="bg-brand-blue/5 text-brand-blue px-3 py-1 rounded-full font-medium">
              {news.category || '公司动态'}
            </span>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{news.date ? new Date(news.date).toLocaleDateString('zh-CN') : new Date().toLocaleDateString('zh-CN')}</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 ml-auto cursor-pointer hover:text-brand-blue transition-colors" onClick={() => window.print()}>
               <Printer size={16} /> 打印
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-brand-blue transition-colors">
               <Share2 size={16} /> 分享
            </div>
          </div>

          <div className="prose prose-slate prose-lg max-w-none prose-headings:text-brand-blue prose-a:text-brand-orange hover:prose-a:text-brand-orange/80 prose-img:rounded-xl">
             {/* Render Rich HTML or fallback to summary/content */}
             {news.richHTML ? (
               <div dangerouslySetInnerHTML={{ __html: news.richHTML }} />
             ) : (
               <div dangerouslySetInnerHTML={{ __html: news.content || news.summary || '' }} className="whitespace-pre-wrap" />
             )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
