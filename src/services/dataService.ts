import axios from 'axios';

// Interfaces remain same for compatibility
export interface NewsItem { id: string; title: string; content: string; date: string; category: string; imageUrl?: string; summary?: string; orientation?: 'landscape' | 'portrait'; }
export interface ProductItem { id: string; name: string; category: string; description: string; specifications?: string; imageUrl?: string; features?: string[]; orientation?: 'landscape' | 'portrait'; }
export interface ProjectCase { id: string; title: string; location?: string; date?: string; description?: string; imageUrl: string; category?: string; orientation?: 'landscape' | 'portrait'; }
export interface QualificationItem { id: string; title: string; category: string; year: string; imageUrl: string; orientation?: 'landscape' | 'portrait'; }

export const DataService = {
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
  async addItem(col: string, data: any) {
    const collection = col === 'projectCases' ? 'cases' : col;
    const res = await axios.post(`/api/data/${collection}`, data);
    return res.data;
  },
  async updateItem(col: string, id: string, data: any) {
    const collection = col === 'projectCases' ? 'cases' : col;
    return axios.put(`/api/data/${collection}/${id}`, data); 
  },
  async deleteItem(col: string, id: string) {
    const collection = col === 'projectCases' ? 'cases' : col;
    return axios.delete(`/api/data/${collection}/${id}`);
  }
};
