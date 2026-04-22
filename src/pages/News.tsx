import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const companyNews = [
  {
    id: 1,
    title: '兴欣科技成功入选国家级“专精特新”小巨人企业名单',
    date: '2024-03-20',
    day: '20',
    yearMonth: '2024-03',
    desc: '此次入选标志着公司在技术创新、市场占有率及品牌影响力方面获得了国家级认可。公司将继续加大研发投入，推动产业升级。',
    image: 'https://picsum.photos/seed/news1/800/600'
  },
  {
    id: 2,
    title: '公司2023年度总结表彰大会圆满落幕',
    date: '2024-01-15',
    day: '15',
    yearMonth: '2024-01',
    desc: '回顾过去，展望未来。兴欣人将继续秉持“精益求精”的精神，再创佳绩。大会表彰了年度优秀员工和突出贡献团队。',
    image: 'https://picsum.photos/seed/news2/800/600'
  },
  {
    id: 3,
    title: '兴欣科技二期智能制造基地正式投产',
    date: '2023-11-08',
    day: '08',
    yearMonth: '2023-11',
    desc: '新基地引入了国际先进的自动化生产线，产能将提升50%，进一步满足国内外市场对高端复合管道日益增长的需求。',
    image: 'https://picsum.photos/seed/news3/800/600'
  },
  {
    id: 4,
    title: '深化校企合作，共建管材新材料联合实验室',
    date: '2023-09-22',
    day: '22',
    yearMonth: '2023-09',
    desc: '公司与知名高校材料科学与工程学院达成战略合作，共同致力于新型环保高分子管材的研发与应用推广。',
    image: 'https://picsum.photos/seed/news4/800/600'
  }
];

const industryNews = [
  {
    id: 5,
    title: '中塑协：2024年塑料管道行业发展趋势分析报告发布',
    date: '2024-03-15',
    day: '15',
    yearMonth: '2024-03',
    desc: '报告指出，绿色环保、高性能复合化将是未来管道行业发展的主旋律，智能化生产制造将加速普及。',
    image: 'https://picsum.photos/seed/ind1/800/600'
  },
  {
    id: 6,
    title: '广交会：高端复合管道成为海外客商关注焦点',
    date: '2024-03-10',
    day: '10',
    yearMonth: '2024-03',
    desc: '在刚刚落幕的广交会上，中国制造的高端复合管道凭借优异的性能和极高的性价比，赢得了众多海外采购商的青睐。',
    image: 'https://picsum.photos/seed/ind2/800/600'
  },
  {
    id: 7,
    title: '国家水利部：加强农村饮水安全工程管网建设',
    date: '2024-03-05',
    day: '05',
    yearMonth: '2024-03',
    desc: '水利部印发指导意见，要求各地加大投入，采用安全可靠的新型管材，全面提升农村供水保障水平。',
    image: 'https://picsum.photos/seed/ind3/800/600'
  }
];

const technicalKnowledge = [
  {
    id: 8,
    title: '钢丝网骨架塑料复合管的电热熔焊接工艺解析',
    date: '2024-02-28',
    day: '28',
    yearMonth: '2024-02',
    desc: '详细介绍电热熔焊接技术在钢丝网骨架塑料复合管施工中的应用，包括焊前准备、氧化层处理、焊接参数设定及常见问题排查。',
    image: 'https://picsum.photos/seed/tech1/800/600'
  },
  {
    id: 9,
    title: 'HDPE双壁波纹管在市政排水工程中的施工规范',
    date: '2024-02-10',
    day: '10',
    yearMonth: '2024-02',
    desc: '探讨HDPE双壁波纹管沟槽开挖、基础处理、管道敷设、接口连接及闭水试验等关键施工环节的技术要求，确保工程质量。',
    image: 'https://picsum.photos/seed/tech2/800/600'
  },
  {
    id: 10,
    title: '如何有效提高聚乙烯(PE)给水管的使用寿命？',
    date: '2024-01-25',
    day: '25',
    yearMonth: '2024-01',
    desc: '从原材料选择、生产工艺控制、管网设计优化及日常维护等方面，全面解析延长PE给水管使用寿命的技术要点与防护措施。',
    image: 'https://picsum.photos/seed/tech3/800/600'
  }
];

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState<'company' | 'industry' | 'technical'>('company');
  
  let currentNews = companyNews;
  if (activeTab === 'industry') currentNews = industryNews;
  if (activeTab === 'technical') currentNews = technicalKnowledge;

  return (
    <div className="pt-[140px] bg-[#f8f9fa] min-h-screen">
      {/* Banner */}
      <section className="w-full relative line-height-0 block">
        <img src="https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E6%96%B0%E9%97%BB%E5%8A%A8%E6%80%81banner.jpg" alt="新闻中心" className="w-full h-auto block" referrerPolicy="no-referrer" />
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-[72px] z-30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-center">
            <button
              onClick={() => setActiveTab('company')}
              className={`px-8 md:px-12 py-6 text-[16px] md:text-[18px] font-medium transition-all relative ${
                activeTab === 'company' ? 'text-[#e58a44]' : 'text-slate-600 hover:text-[#559bd9]'
              }`}
            >
              企业动态
              {activeTab === 'company' && (
                <motion.div layoutId="newsTab" className="absolute bottom-0 left-0 w-full h-[3px] bg-[#e58a44]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('industry')}
              className={`px-8 md:px-12 py-6 text-[16px] md:text-[18px] font-medium transition-all relative ${
                activeTab === 'industry' ? 'text-[#e58a44]' : 'text-slate-600 hover:text-[#559bd9]'
              }`}
            >
              行业资讯
              {activeTab === 'industry' && (
                <motion.div layoutId="newsTab" className="absolute bottom-0 left-0 w-full h-[3px] bg-[#e58a44]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('technical')}
              className={`px-8 md:px-12 py-6 text-[16px] md:text-[18px] font-medium transition-all relative ${
                activeTab === 'technical' ? 'text-[#e58a44]' : 'text-slate-600 hover:text-[#559bd9]'
              }`}
            >
              技术知识
              {activeTab === 'technical' && (
                <motion.div layoutId="newsTab" className="absolute bottom-0 left-0 w-full h-[3px] bg-[#e58a44]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* News List */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col gap-5">
            {currentNews.map((news, i) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row border border-slate-100 md:h-[180px]"
              >
                {/* Image Area */}
                <div className="w-full md:w-[280px] h-[200px] md:h-full overflow-hidden relative shrink-0">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#559bd9]/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>

                {/* Content Area */}
                <div className="p-6 md:px-8 md:py-5 flex flex-col justify-center flex-1 relative">
                  {/* Date Badge */}
                  <div className="absolute top-0 right-6 md:right-8 bg-[#f8f9fa] group-hover:bg-[#559bd9] transition-colors duration-500 px-3 py-2 rounded-b-xl text-center border border-t-0 border-slate-100 group-hover:border-[#559bd9]">
                    <div className="text-[22px] font-bold text-[#559bd9] group-hover:text-white leading-none mb-1 transition-colors">
                      {news.day}
                    </div>
                    <div className="text-[11px] text-slate-500 group-hover:text-white/90 transition-colors">
                      {news.yearMonth}
                    </div>
                  </div>

                  <h3 className="text-[18px] md:text-[20px] font-bold text-slate-800 mb-2 group-hover:text-[#e58a44] transition-colors pr-20 line-clamp-1">
                    <a href="#">{news.title}</a>
                  </h3>
                  
                  <p className="text-[14px] text-slate-600 leading-[1.7] mb-4 line-clamp-2 text-justify pr-16 md:pr-24">
                    {news.desc}
                  </p>
                  
                  <div className="mt-auto">
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 text-[13px] font-bold text-[#559bd9] group-hover:text-[#e58a44] transition-colors"
                    >
                      查看详情
                      <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination (Static for demo) */}
          <div className="mt-16 flex justify-center gap-2">
            <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 text-slate-500 hover:border-[#559bd9] hover:text-[#559bd9] transition-colors">
              &lt;
            </button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#559bd9] text-white font-medium shadow-md shadow-[#559bd9]/20">
              1
            </button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 text-slate-600 hover:border-[#559bd9] hover:text-[#559bd9] transition-colors font-medium">
              2
            </button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 text-slate-500 hover:border-[#559bd9] hover:text-[#559bd9] transition-colors">
              &gt;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
