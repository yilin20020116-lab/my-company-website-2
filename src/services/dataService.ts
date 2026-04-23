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
    try {
      const res = await axios.get('/api/settings');
      if (typeof res.data === 'string' || !res.data) throw new Error('Invalid response');
      return res.data;
    } catch (e) {
      console.warn('Using default settings due to error:', e);
      return {
        heroBanners: [
          "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E9%A6%96%E9%A1%B5%E5%9B%BE/%E5%85%B4%E6%AC%A3%E9%97%A8%E5%A4%B4%E8%B6%85%E9%AB%98%E6%B8%85%E4%BF%AE%E5%A4%8D.png",
          "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E9%A6%96%E9%A1%B5%E5%9B%BE/1920x1080%E5%9B%BE%E7%89%87.png",
          "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E9%A6%96%E9%A1%B5%E5%9B%BE/1920x1080%E5%9B%BE%E7%89%87%20(1).png"
        ],
        heroTitle: "精益求精 \n滴水不漏",
        heroSubtitle: "湖北兴欣科技股份有限公司，致力于成为全球领先的管道系统解决方案服务商。以科技创新驱动，筑就城市生命线。",
        pageBanners: {
          products: "",
          cases: "",
          qualifications: "",
          news: ""
        }
      } as SiteSettings;
    }
  },
  async updateSettings(data: any): Promise<SiteSettings> {
    const res = await axios.put('/api/settings', data);
    return res.data;
  },
  async getProductCategories(): Promise<any[]> {
    try {
      const res = await axios.get('/api/data/productCategories');
      return Array.isArray(res.data) ? res.data : [];
    } catch (e) { return []; }
  },
  async getNews(): Promise<NewsItem[]> {
    try {
      const res = await axios.get('/api/data/news');
      return Array.isArray(res.data) ? res.data : [];
    } catch (e) { return []; }
  },
  async getProducts(): Promise<ProductItem[]> {
    try {
      const res = await axios.get('/api/data/products');
      return Array.isArray(res.data) ? res.data : [];
    } catch (e) { return []; }
  },
  async getProjectCases(): Promise<ProjectCase[]> {
    try {
      const res = await axios.get('/api/data/cases');
      return Array.isArray(res.data) ? res.data : [];
    } catch (e) { return []; }
  },
  async getQualifications(): Promise<QualificationItem[]> {
    try {
      const res = await axios.get('/api/data/qualifications');
      return Array.isArray(res.data) ? res.data : [];
    } catch (e) { return []; }
  },
  async getMessages(): Promise<any[]> {
    try {
      const res = await axios.get('/api/data/messages');
      return Array.isArray(res.data) ? res.data : [];
    } catch (e) { return []; }
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
