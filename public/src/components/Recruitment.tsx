import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Clock, Heart, GraduationCap, Coffee, ArrowRight } from 'lucide-react';

const jobs = [
  {
    title: '高级管道研发工程师',
    department: '技术部',
    location: '湖北鄂州',
    type: '全职',
    salary: '15k-25k',
    requirements: '材料学相关专业硕士及以上学历，3年以上复合管道研发经验。'
  },
  {
    title: '区域销售经理',
    department: '销售部',
    location: '全国外派',
    type: '全职',
    salary: '10k-20k + 提成',
    requirements: '大专及以上学历，具备市政工程或建材行业销售经验者优先。'
  },
  {
    title: '自动化生产线操作员',
    department: '生产部',
    location: '湖北鄂州',
    type: '全职',
    salary: '6k-9k',
    requirements: '高中及以上学历，吃苦耐劳，有机械设备操作经验者优先。'
  }
];

const benefits = [
  { icon: Heart, title: '五险一金', desc: '完善的社会保障体系' },
  { icon: GraduationCap, title: '带薪培训', desc: '完善的职业晋升通道' },
  { icon: Coffee, title: '员工福利', desc: '节日礼包、定期团建' },
];

export default function Recruitment() {
  return (
    <section id="careers" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Intro */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-lg font-bold text-brand-orange uppercase tracking-[0.2em] mb-6"
            >
              人才招聘 / CAREERS
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight mb-8"
            >
              兴欣科技，<br />
              期待与卓越的你同行。
            </motion.h3>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              我们尊重每一份才华，致力于为员工创造公平、开放、充满挑战的工作环境。
              在这里，你不仅是在工作，更是在参与建设支撑城市运行的“生命线”。
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex flex-col gap-3 p-6 rounded-2xl bg-brand-gray border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                    <benefit.icon size={20} />
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">{benefit.title}</h5>
                  <p className="text-xs text-slate-500">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Job List */}
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl border border-slate-100 bg-white hover:border-brand-blue hover:shadow-xl hover:shadow-brand-blue/5 transition-all cursor-pointer"
              >
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors mb-2">
                      {job.title}
                    </h4>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Briefcase size={14} /> {job.department}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                    </div>
                  </div>
                  <div className="text-brand-orange font-display font-bold text-lg">
                    {job.salary}
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  {job.requirements}
                </p>
                <button className="text-sm font-bold text-brand-blue flex items-center gap-2 group-hover:gap-3 transition-all">
                  立即申请 <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
            
            <div className="text-center pt-6">
              <p className="text-sm text-slate-400">
                没有找到合适的职位？欢迎发送简历至：<span className="text-brand-blue font-bold">ezxxjc@163.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
