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
      {settings?.pageBanners?.cases && (
        <section className="w-full relative line-height-0 block">
          <img 
            src={settings.pageBanners.cases} 
            alt="工程案例" 
            className="w-full h-auto block" 
            referrerPolicy="no-referrer" 
          />
        </section>
      )}
      <Cases />
    </div>
  );
}
