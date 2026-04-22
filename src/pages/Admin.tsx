import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { DataService, NewsItem, ProductItem, ProjectCase, QualificationItem } from '../services/dataService';
import ImageUploader from '../components/admin/ImageUploader';
import { 
  LayoutDashboard, 
  Newspaper, 
  Package, 
  Briefcase, 
  Award, 
  LogOut, 
  Plus, 
  Trash2, 
  Save, 
  Image as ImageIcon 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type AdminTab = 'news' | 'products' | 'cases' | 'qualifications' | 'banners';

export default function AdminPage() {
  const { user, isAdmin, loading, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('news');
  const [items, setItems] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null); // ID of item being edited
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [activeTab, isAdmin]);

  const loadData = async () => {
    let data = [];
    switch (activeTab) {
      case 'news': data = await DataService.getNews(); break;
      case 'products': data = await DataService.getProducts(); break;
      case 'cases': data = await DataService.getProjectCases(); break;
      case 'qualifications': data = await DataService.getQualifications(); break;
      default: data = [];
    }
    setItems(data);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing === 'new') {
        const col = activeTab === 'cases' ? 'projectCases' : activeTab;
        await DataService.addItem(col, formData);
      } else if (isEditing) {
        const col = activeTab === 'cases' ? 'projectCases' : activeTab;
        await DataService.updateItem(col, isEditing, formData);
      }
      setIsEditing(null);
      setFormData({});
      loadData();
    } catch (err) {
      alert('保存失败');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('确定要删除吗？')) return;
    try {
      const col = activeTab === 'cases' ? 'projectCases' : activeTab;
      await DataService.deleteItem(col, id);
      loadData();
    } catch (err) {
      alert('删除失败');
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">加载中...</div>;

  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center pt-20">
        <h1 className="text-2xl font-bold mb-6">管理后台登录</h1>
        <button 
          onClick={login}
          className="bg-white border flex items-center gap-3 px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="google" />
          使用 Google 账号登录
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4 text-xl">您没有管理员权限 ({user.email})</p>
        <button onClick={logout} className="text-blue-500 underline">登出</button>
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: any }[] = [
    { id: 'news', label: '新闻管理', icon: Newspaper },
    { id: 'products', label: '产品管理', icon: Package },
    { id: 'cases', label: '案例管理', icon: Briefcase },
    { id: 'qualifications', label: '资质管理', icon: Award },
    // { id: 'banners', label: 'Banner管理', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex pt-20">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-6">
          <h2 className="text-lg font-bold text-slate-900">内容管理系统</h2>
          <p className="text-xs text-slate-400 mt-1">{user.email}</p>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setIsEditing(null); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                activeTab === tab.id ? "bg-brand-blue text-white shadow-md" : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all">
            <LogOut size={20} />
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8 overflow-y-auto h-[calc(100vh-80px)]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">{tabs.find(t => t.id === activeTab)?.label}</h1>
          {!isEditing && (
            <button 
              onClick={() => { setIsEditing('new'); setFormData({}); }}
              className="flex items-center gap-2 bg-brand-blue text-white px-6 py-2.5 rounded-xl font-bold shadow-sm hover:shadow-md transition-all"
            >
              <Plus size={20} />
              添加项目
            </button>
          )}
        </div>

        {isEditing ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-8 border shadow-sm max-w-2xl">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-xl font-bold">{isEditing === 'new' ? '新建项目' : '编辑项目'}</h2>
              <button onClick={() => setIsEditing(null)} className="text-slate-400 hover:text-slate-600">取消</button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6">
              {activeTab === 'news' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">标题</label>
                    <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">发布日期</label>
                    <input type="date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">分类</label>
                    <select value={formData.category || '公司新闻'} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                      <option value="公司新闻">公司新闻</option>
                      <option value="行业动态">行业动态</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">简述</label>
                    <textarea value={formData.summary || ''} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full px-4 py-2 border rounded-lg h-24" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">内容</label>
                    <textarea value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 border rounded-lg h-48" required placeholder="支持 Markdown 或 纯文本" />
                  </div>
                </>
              )}

              {activeTab === 'products' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">产品名称</label>
                    <input type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">分类</label>
                    <select value={formData.category || 'water'} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                      <option value="water">供水产品</option>
                      <option value="drainage">排水产品</option>
                      <option value="accessories">连接件/管件</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">描述</label>
                    <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg h-32" />
                  </div>
                </>
              )}

              {activeTab === 'cases' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">项目标题</label>
                    <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">项目地点</label>
                    <input type="text" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">描述</label>
                    <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg h-32" />
                  </div>
                </>
              )}

              {activeTab === 'qualifications' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">证书/荣誉名称</label>
                    <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">分类</label>
                    <select value={formData.category || 'honors'} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                      <option value="honors">荣誉奖项</option>
                      <option value="qualifications">资质证书</option>
                      <option value="patents">专利技术</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">年份</label>
                    <input type="text" value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">图片</label>
                {formData.imageUrl && (
                  <div className="mb-4 aspect-video rounded-lg overflow-hidden border">
                    <img src={formData.imageUrl} className="w-full h-full object-cover" alt="preview" />
                  </div>
                )}
                <ImageUploader onUpload={(url) => setFormData({...formData, imageUrl: url})} folder={activeTab} />
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-brand-blue text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-brand-blue/30 transition-all"
              >
                <Save size={20} />
                保存数据
              </button>
            </form>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {items.map(item => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-2xl border p-4 shadow-sm group hover:shadow-md transition-all"
                >
                  <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-slate-50 border relative">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ImageIcon size={48} />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{item.title || item.name}</h3>
                    <div className="flex gap-2">
                      <button onClick={() => { setIsEditing(item.id); setFormData(item); }} className="p-2 text-slate-400 hover:text-brand-blue transition-colors">
                        <ImageIcon size={18} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 flex justify-between items-center uppercase tracking-widest">
                    <span>{item.category || item.date || '无分类'}</span>
                    <span>{item.year || ''}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {items.length === 0 && (
              <div className="col-span-full py-20 text-center text-slate-400 border-2 border-dashed rounded-3xl">
                还没有任何数据，点击“添加项目”开始。
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
