import React, { useState, useEffect } from 'react';
import Cases from '../components/Cases';
import { motion } from 'motion/react';
import { DataService, SiteSettings } from '../services/dataService';

export default function CasesPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    DataService.getSettings().then(setSettings);
  }, []);

  return (
    <div className="pt-[140px]">
      <section className="w-full relative line-height-0 block">
        <img 
          src={settings?.pageBanners?.cases || "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E5%B7%A5%E7%A8%8B%E6%A1%88%E4%BE%8Bbanner.jpg"} 
          alt="工程案例" 
          className="w-full h-auto block" 
          referrerPolicy="no-referrer" 
        />
      </section>
      <Cases />
    </div>
  );
}
