import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/About';
import QualificationsPage from './pages/QualificationsPage';
import ProductsPage from './pages/Products';
import CasesPage from './pages/Cases';
import NewsPage from './pages/News';
import NewsDetailPage from './pages/NewsDetail';
import CareersPage from './pages/Careers';

import ContactPage from './pages/Contact';
import MessagePage from './pages/Message';
import ProductDetailPage from './pages/ProductDetail';
import { AuthProvider } from './context/AuthContext';
import AdminPage from './pages/Admin';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white selection:bg-brand-blue selection:text-white flex flex-col">
      {!isAdmin && <Navbar />}
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
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AuthProvider>
  );
}
