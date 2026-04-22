import React from 'react';
import Cases from '../components/Cases';
import { motion } from 'motion/react';

export default function CasesPage() {
  return (
    <div className="pt-[140px]">
      <section className="w-full relative line-height-0 block">
        <img 
          src="https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E5%B7%A5%E7%A8%8B%E6%A1%88%E4%BE%8Bbanner.jpg" 
          alt="工程案例" 
          className="w-full h-auto block" 
          referrerPolicy="no-referrer" 
        />
      </section>
      <Cases />
    </div>
  );
}
