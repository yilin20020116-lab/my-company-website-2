import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  imageUrl?: string;
  summary?: string;
  createdAt?: any;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications?: string;
  imageUrl?: string;
  features?: string[];
}

export interface ProjectCase {
  id: string;
  title: string;
  location?: string;
  date?: string;
  description?: string;
  imageUrl: string;
  category?: string;
}

export interface QualificationItem {
  id: string;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
}

export interface BannerConfig {
  id: string;
  pageId: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  alignment: 'top' | 'center' | 'bottom';
}

// Generic fetcher
async function fetchCollection<T>(collectionName: string): Promise<T[]> {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
}

export const DataService = {
  // News
  async getNews(): Promise<NewsItem[]> {
    const q = query(collection(db, 'news'), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as NewsItem[];
  },

  // Products
  async getProducts(): Promise<ProductItem[]> {
    return fetchCollection<ProductItem>('products');
  },

  // Project Cases
  async getProjectCases(): Promise<ProjectCase[]> {
    return fetchCollection<ProjectCase>('projectCases');
  },

  // Qualifications
  async getQualifications(): Promise<QualificationItem[]> {
    return fetchCollection<QualificationItem>('qualifications');
  },

  // Banners
  async getBanner(pageId: string): Promise<BannerConfig | null> {
    const q = query(collection(db, 'banners'), where('pageId', '==', pageId));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as BannerConfig;
  },

  // Admin Write Operations (Self-explanatory)
  async addItem(col: string, data: any) {
    return addDoc(collection(db, col), { ...data, createdAt: Timestamp.now() });
  },
  
  async updateItem(col: string, id: string, data: any) {
    const docRef = doc(db, col, id);
    return updateDoc(docRef, data);
  },
  
  async deleteItem(col: string, id: string) {
    const docRef = doc(db, col, id);
    return deleteDoc(docRef);
  }
};
