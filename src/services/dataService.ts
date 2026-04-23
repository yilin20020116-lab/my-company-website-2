import axios from 'axios';

// Interfaces remain same for compatibility
export interface NewsItem { id: string; title: string; content: string; date: string; category: string; imageUrl?: string; summary?: string; orientation?: 'landscape' | 'portrait'; richHTML?: string; }
export interface ProductItem { id: string; name: string; category: string; description: string; specifications?: string; imageUrl?: string; detailImageUrl?: string; features?: string[]; orientation?: 'landscape' | 'portrait'; richHTML?: string; }
export interface ProjectCase { id: string; title: string; location?: string; date?: string; description?: string; imageUrl: string; category?: string; orientation?: 'landscape' | 'portrait'; }
export interface QualificationItem { id: string; title: string; category: string; year: string; imageUrl: string; orientation?: 'landscape' | 'portrait'; }

export interface SiteSettings {
  heroBanners: string[];
  heroTitle: string;
  heroSubtitle: string;
  pageBanners: {
    products: string;
    cases: string;
    qualifications: string;
    news: string;
  };
  global?: {
    logo: string;
    phone: string;
    address: string;
    email: string;
    qrCode1: string;
    qrCode2: string;
    icp: string;
  };
  about?: {
    title: string;
    content1: string;
    content2: string;
    image: string;
  };
}

export const DataService = {
  async getSettings(): Promise<SiteSettings> {
    const res = await axios.get('/api/settings');
    return res.data;
  },
  async updateSettings(data: any): Promise<SiteSettings> {
    const res = await axios.put('/api/settings', data);
    return res.data;
  },
  async getProductCategories(): Promise<any[]> {
    const res = await axios.get('/api/data/productCategories');
    return res.data;
  },
  async getNews(): Promise<NewsItem[]> {
    const res = await axios.get('/api/data/news');
    return res.data;
  },
  async getProducts(): Promise<ProductItem[]> {
    const res = await axios.get('/api/data/products');
    return res.data;
  },
  async getProjectCases(): Promise<ProjectCase[]> {
    const res = await axios.get('/api/data/cases');
    return res.data;
  },
  async getQualifications(): Promise<QualificationItem[]> {
    const res = await axios.get('/api/data/qualifications');
    return res.data;
  },
  async getMessages(): Promise<any[]> {
    const res = await axios.get('/api/data/messages');
    return res.data;
  },
  async addItem(col: string, data: any) {
    const collection = col === 'projectCases' ? 'cases' : col;
    const res = await axios.post(`/api/data/${collection}`, data);
    return res.data;
  },
  async updateItem(col: string, id: string, data: any) {
    const collection = col === 'projectCases' ? 'cases' : col;
    const res = await axios.put(`/api/data/${collection}/${id}`, data);
    return res.data;
  },
  async deleteItem(col: string, id: string) {
    const collection = col === 'projectCases' ? 'cases' : col;
    const res = await axios.delete(`/api/data/${collection}/${id}`);
    return res.data;
  }
};
