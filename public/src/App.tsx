import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/About';
import QualificationsPage from './pages/QualificationsPage';
import ProductsPage from './pages/Products';
import CasesPage from './pages/Cases';
import NewsPage from './pages/News';
import CareersPage from './pages/Careers';

import ContactPage from './pages/Contact';
import MessagePage from './pages/Message';
import ProductDetailPage from './pages/ProductDetail';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-white selection:bg-brand-blue selection:text-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/qualifications" element={<QualificationsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:categoryId" element={<ProductsPage />} />
            <Route path="/product/:productTitle" element={<ProductDetailPage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/message" element={<MessagePage />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
