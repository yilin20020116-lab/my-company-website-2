import axios from "axios";

// Helper function for API calls
const api = axios.create({
  baseURL: "/api"
});

export interface NewsItem {
  id?: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  imageUrl: string;
  content: string;
  views: number;
}

export interface ProductItem {
  id: string;
  name: string;
  title?: string;
  category: string;
  imageUrl?: string;
  richHTML?: string;
  isStatic?: boolean;
}

export interface ProjectCase {
  id?: string;
  title: string;
  category: string;
  date: string;
  details: string;
  imageUrl: string;
  content: string;
}

export interface QualificationItem {
  id?: string;
  title: string;
  date?: string;
  imageUrl: string;
  category?: string;
  year?: string;
  orientation?: 'landscape' | 'portrait';
}

export interface PartnerItem {
  id?: string;
  name?: string;
  logo: string;
  order?: number;
}

export interface SiteSettings {
  contactMobile?: string;
  contactAddress?: string;
  companyName?: string;
  icp?: string;
}

export const DataService = {
  getSettings: async () => {
    try {
      const { data } = await api.get('/settings');
      return data;
    } catch (e) {
      console.error(e);
      return {};
    }
  },

  updateSettings: async (settings: any) => {
    const { data } = await api.post('/settings', settings);
    return data;
  },

  getNews: async () => {
    const { data } = await api.get('/news');
    return data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getProducts: async () => {
    const { data } = await api.get('/products');
    return data;
  },

  getProjectCases: async () => {
    const { data } = await api.get('/cases');
    return data;
  },

  getQualifications: async () => {
    const { data } = await api.get('/qualifications');
    return data;
  },
  
  getPartners: async () => {
    const { data } = await api.get('/partners');
    return data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  },
  
  getMessages: async () => {
    const { data } = await api.get('/messages');
    return data.sort((a: any, b: any) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
  },

  addItem: async (collectionName: string, item: any) => {
    // If the collectionName is cases, we need it to point to cases
    if (collectionName === 'projectCases') collectionName = 'cases';
    const { data } = await api.post(`/${collectionName}`, item);
    return data;
  },

  updateItem: async (collectionName: string, id: string, item: any) => {
    if (collectionName === 'projectCases') collectionName = 'cases';
    const { data } = await api.put(`/${collectionName}/${id}`, item);
    return data;
  },

  deleteItem: async (collectionName: string, id: string) => {
    if (collectionName === 'projectCases') collectionName = 'cases';
    await api.delete(`/${collectionName}/${id}`);
  }
};
