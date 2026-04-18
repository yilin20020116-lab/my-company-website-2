import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'motion/react';

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (value >= 1000) {
      return Math.round(latest).toLocaleString();
    }
    return Math.round(latest);
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const stats = [
  {
    target: 30,
    suffix: '+',
    label: '项有效专利',
    sub: 'Active Patents'
  },
  {
    target: 50,
    suffix: '+',
    label: '条自动化生产线',
    sub: 'Production Lines'
  },
  {
    target: 500000,
    suffix: '',
    label: '吨/年产量',
    sub: 'Annual Output (Tons)'
  },
  {
    target: 1000,
    suffix: '+',
    label: '项标杆工程案例',
    sub: 'Project Cases'
  }
];

export default function Stats() {
  return (
    <section className="py-20 bg-brand-blue relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-6xl font-display font-bold text-yellow-400 mb-4">
                <Counter value={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-white font-bold text-lg md:text-xl mb-1">
                {stat.label}
              </div>
              <div className="text-white/40 text-[10px] uppercase tracking-[0.2em]">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
