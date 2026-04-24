import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { DataService, NewsItem, ProductItem, ProjectCase, QualificationItem } from '../services/dataService';
import ImageUploader from '../components/admin/ImageUploader';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
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
  Image as ImageIcon,
  Pencil,
  Settings,
  MessageSquare,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { productData } from '../data/products';

type AdminTab = 'news' | 'products' | 'cases' | 'qualifications' | 'settings' | 'messages' | 'partners';

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
    let data: any = [];
    switch (activeTab) {
      case 'news': data = await DataService.getNews(); break;
      case 'products': 
        const remoteProducts = await DataService.getProducts();
        const staticProducts = productData.flatMap(cat => 
          cat.items.map((item, idx) => ({
            ...item,
            category: cat.id,
            isStatic: true,
            id: `static-${cat.id}-${item.title}-${idx}`
          }))
        );
        data = [...remoteProducts, ...staticProducts]; 
        break;
      case 'cases': data = await DataService.getProjectCases(); break;
      case 'qualifications': data = await DataService.getQualifications(); break;
      case 'partners': data = await DataService.getPartners(); break;
      case 'messages': data = await DataService.getMessages(); break;
      case 'settings': 
        const settings = await DataService.getSettings();
        setFormData(settings);
        data = [settings]; 
        break;
      default: data = [];
    }
    setItems(data.reverse ? data.reverse() : data);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === 'settings') {
        await DataService.updateSettings(formData);
        alert('网站设置保存成功！');
      } else {
        const col = activeTab === 'cases' ? 'projectCases' : activeTab;
        
        // If it's a static item, we treat it as a new item to be saved to DB
        if (isEditing && isEditing.toString().startsWith('static-')) {
          const { id, isStatic, ...saveData } = formData;
          // Ensure we use 'name' instead of 'title' for products in DB
          if (!saveData.name && saveData.title) saveData.name = saveData.title;
          await DataService.addItem(col, saveData);
          alert('已成功将内置模板保存至后台数据库！现在您可以随时修改它。');
        } else if (isEditing === 'new') {
          await DataService.addItem(col, formData);
          alert('新增成功！');
        } else if (isEditing) {
          await DataService.updateItem(col, isEditing, formData);
          alert('更新成功！');
        }
      }
      
      setIsEditing(null);
      setFormData({});
      loadData();
    } catch (err: any) {
      console.error('Save failed:', err);
      const errorMessage = err.response?.data?.error || err.message || '未知错误';
      alert(`保存失败: ${errorMessage}`);
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

  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = await login(password);
    if (!success) {
      setLoginError('密码错误，请重试');
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">加载中...</div>;

  if (!user && !isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-sm w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">管理后台</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">访问密码</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                placeholder="请输入管理密码"
                required
              />
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button 
              type="submit"
              className="bg-brand-blue text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              登录
            </button>
          </form>
        </div>
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

  const renderItemCard = (item: any) => (
    <motion.div 
      key={item.id}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        "bg-white rounded-2xl border p-4 shadow-sm group hover:shadow-md transition-all",
        (item.orientation === 'landscape' && activeTab !== 'qualifications') ? "md:col-span-2" : "col-span-1"
      )}
    >
      <div className={cn(
        "rounded-xl overflow-hidden mb-4 bg-slate-50 border relative",
        (item.orientation === 'landscape' && activeTab !== 'qualifications') ? "aspect-video" : (activeTab === 'qualifications' || activeTab === 'partners' ? "aspect-square" : "aspect-[3/4]")
      )}>
        {(item.imageUrl || item.logo) ? (
          <img src={item.imageUrl || item.logo} className={cn("w-full h-full", (activeTab === 'qualifications' || activeTab === 'partners') ? "object-contain p-4 bg-white" : "object-cover")} alt="" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <ImageIcon size={48} />
          </div>
        )}
      </div>
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col gap-1 pr-2">
            {item.isStatic && (
              <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-1.5 py-0.5 rounded w-fit">
                系统内置模板
              </span>
            )}
            <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{item.name || item.title}</h3>
          </div>
          <div className="flex gap-1 shrink-0">
          <button 
            onClick={() => { 
              const mappedItem = { ...item };
              if (item.isStatic) {
                if (!mappedItem.name && mappedItem.title) mappedItem.name = mappedItem.title;
                if (!mappedItem.imageUrl && item.image) mappedItem.imageUrl = item.image;
                if (!mappedItem.description) {
                  const descParts = [];
                  if (item.advantages) descParts.push(`优势特点：\n${Array.isArray(item.advantages) ? item.advantages.join('\n') : item.advantages}`);
                  if (item.applications) descParts.push(`应用范围：\n${item.applications}`);
                  mappedItem.description = descParts.join('\n\n');
                }
                if (!mappedItem.richHTML && item.richHTML) mappedItem.richHTML = item.richHTML;
                if (!mappedItem.detailImageUrl && item.detailImageUrl) mappedItem.detailImageUrl = item.detailImageUrl;
              }
              setFormData(mappedItem); 
              setIsEditing(item.id); 
            }} 
            className="p-2 text-slate-400 hover:text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-all"
            title="编辑"
          >
            <Pencil size={18} />
          </button>
          <button 
            onClick={() => handleDelete(item.id)} 
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            title="删除"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="text-xs text-slate-400 flex justify-between items-center uppercase tracking-widest mt-2 border-t pt-2">
        <span>{item.category === 'honors' ? '荣誉奖项' : item.category === 'qualifications' ? '资质证书' : item.category === 'patents' ? '专利技术' : (item.category || item.date || '无分类')}</span>
        <span>{item.year || ''}</span>
      </div>
    </motion.div>
  );

  const tabs: { id: AdminTab; label: string; icon: any }[] = [
    { id: 'news', label: '新闻管理', icon: Newspaper },
    { id: 'products', label: '产品管理', icon: Package },
    { id: 'cases', label: '案例管理', icon: Briefcase },
    { id: 'qualifications', label: '资质管理', icon: Award },
    { id: 'partners', label: '合作伙伴', icon: Users },
    { id: 'messages', label: '在线留言', icon: MessageSquare },
    { id: 'settings', label: '网站设置', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex pt-20">
      {/* Sidebar */}
      <div className="w-64 shrink-0 bg-white border-r flex flex-col">
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
          {!isEditing && activeTab !== 'settings' && activeTab !== 'messages' && (
            <button 
              onClick={() => { setIsEditing('new'); setFormData({}); }}
              className="flex items-center gap-2 bg-brand-blue text-white px-6 py-2.5 rounded-xl font-bold shadow-sm hover:shadow-md transition-all"
            >
              <Plus size={20} />
              添加项目
            </button>
          )}
        </div>

        {activeTab === 'settings' ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-8 border shadow-sm max-w-4xl">
            <h2 className="text-xl font-bold mb-8">网站全局配置</h2>
            <form onSubmit={handleSave} className="space-y-8">
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><LayoutDashboard className="text-brand-blue" /> 首页配置</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">主标题文字</label>
                    <input type="text" value={formData.heroTitle || ''} onChange={e => setFormData({...formData, heroTitle: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="支持HTML如 <br/> 或 <span>" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">副标题文字</label>
                    <textarea value={formData.heroSubtitle || ''} onChange={e => setFormData({...formData, heroSubtitle: e.target.value})} className="w-full px-4 py-2 border rounded-lg h-20" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">首页轮播图图片 (第一张)</label>
                    <div className="flex gap-4">
                      <input type="text" value={formData.heroBanners?.[0] || ''} onChange={e => { const newBanners = [...(formData.heroBanners||[])]; newBanners[0] = e.target.value; setFormData({...formData, heroBanners: newBanners}) }} className="flex-grow px-4 py-2 border rounded-lg text-sm" />
                    </div>
                    {formData.heroBanners?.[0] && <img src={formData.heroBanners[0]} className="h-32 object-cover rounded mt-2" alt="banner 1" />}
                    <ImageUploader onUpload={(url) => setFormData((prev: any) => { const newBanners = [...(prev.heroBanners||[])]; newBanners[0] = url; return {...prev, heroBanners: newBanners} })} folder="banners" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">首页轮播图图片 (第二张)</label>
                    <div className="flex gap-4">
                      <input type="text" value={formData.heroBanners?.[1] || ''} onChange={e => { const newBanners = [...(formData.heroBanners||[])]; newBanners[1] = e.target.value; setFormData({...formData, heroBanners: newBanners}) }} className="flex-grow px-4 py-2 border rounded-lg text-sm" />
                    </div>
                    {formData.heroBanners?.[1] && <img src={formData.heroBanners[1]} className="h-32 object-cover rounded mt-2" alt="banner 2" />}
                    <ImageUploader onUpload={(url) => setFormData((prev: any) => { const newBanners = [...(prev.heroBanners||[])]; newBanners[1] = url; return {...prev, heroBanners: newBanners} })} folder="banners" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><ImageIcon className="text-brand-blue" /> 子频道 Banner 配置</h3>
                <div className="space-y-6">
                  {(['products', 'cases', 'qualifications', 'news'] as const).map((page) => (
                    <div key={page}>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{page === 'products' ? '产品中心' : page === 'cases' ? '工程案例' : page === 'qualifications' ? '资质荣誉' : '新闻中心'} Banner</label>
                      <div className="flex gap-4">
                        <input type="text" value={formData.pageBanners?.[page] || ''} onChange={e => { setFormData({...formData, pageBanners: {...(formData.pageBanners || {}), [page]: e.target.value}}) }} className="flex-grow px-4 py-2 border rounded-lg text-sm" />
                      </div>
                      {formData.pageBanners?.[page] && <img src={formData.pageBanners[page]} className="h-20 object-cover rounded mt-2 w-full max-w-md" alt={`${page} banner`} />}
                      <ImageUploader 
                        onUpload={(url) => setFormData((prev: any) => ({
                          ...prev, 
                          pageBanners: { ...(prev.pageBanners || {}), [page]: url }
                        }))} 
                        folder="banners" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><LayoutDashboard className="text-brand-blue" /> 全局联系方式与底部信息</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">公司Logo</label>
                    <input type="text" value={formData.global?.logo || ''} onChange={e => setFormData({...formData, global: {...(formData.global || {}), logo: e.target.value}})} className="w-full px-4 py-2 border rounded-lg text-sm" />
                    {formData.global?.logo && <img src={formData.global.logo} className="h-16 object-contain rounded mt-2 bg-slate-800 p-2" alt="logo" />}
                    <ImageUploader onUpload={(url) => setFormData((prev: any) => ({...prev, global: {...(prev.global || {}), logo: url}}))} folder="global" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">服务热线</label>
                      <input type="text" value={formData.global?.phone || ''} onChange={e => setFormData({...formData, global: {...(formData.global || {}), phone: e.target.value}})} className="w-full px-4 py-2 border rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">联系邮箱</label>
                      <input type="text" value={formData.global?.email || ''} onChange={e => setFormData({...formData, global: {...(formData.global || {}), email: e.target.value}})} className="w-full px-4 py-2 border rounded-lg text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">联系地址</label>
                    <input type="text" value={formData.global?.address || ''} onChange={e => setFormData({...formData, global: {...(formData.global || {}), address: e.target.value}})} className="w-full px-4 py-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">备案号</label>
                    <input type="text" value={formData.global?.icp || ''} onChange={e => setFormData({...formData, global: {...(formData.global || {}), icp: e.target.value}})} className="w-full px-4 py-2 border rounded-lg text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">微信二维码</label>
                      <input type="text" value={formData.global?.qrCode1 || ''} onChange={e => setFormData({...formData, global: {...(formData.global || {}), qrCode1: e.target.value}})} className="w-full px-4 py-2 border rounded-lg text-sm" />
                      {formData.global?.qrCode1 && <img src={formData.global.qrCode1} className="h-20 object-contain rounded mt-2 border" alt="wechat qr" />}
                      <ImageUploader onUpload={(url) => setFormData((prev: any) => ({...prev, global: {...(prev.global || {}), qrCode1: url}}))} folder="global" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">抖音二维码</label>
                      <input type="text" value={formData.global?.qrCode2 || ''} onChange={e => setFormData({...formData, global: {...(formData.global || {}), qrCode2: e.target.value}})} className="w-full px-4 py-2 border rounded-lg text-sm" />
                      {formData.global?.qrCode2 && <img src={formData.global.qrCode2} className="h-20 object-contain rounded mt-2 border" alt="douyin qr" />}
                      <ImageUploader onUpload={(url) => setFormData((prev: any) => ({...prev, global: {...(prev.global || {}), qrCode2: url}}))} folder="global" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><LayoutDashboard className="text-brand-blue" /> 首页“关于我们”版块</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">标题</label>
                    <input type="text" value={formData.about?.title || ''} onChange={e => setFormData({...formData, about: {...(formData.about || {}), title: e.target.value}})} className="w-full px-4 py-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">段落 1</label>
                    <textarea value={formData.about?.content1 || ''} onChange={e => setFormData({...formData, about: {...(formData.about || {}), content1: e.target.value}})} className="w-full px-4 py-2 border rounded-lg h-24" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">段落 2</label>
                    <textarea value={formData.about?.content2 || ''} onChange={e => setFormData({...formData, about: {...(formData.about || {}), content2: e.target.value}})} className="w-full px-4 py-2 border rounded-lg h-24" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">配图</label>
                    <input type="text" value={formData.about?.image || ''} onChange={e => setFormData({...formData, about: {...(formData.about || {}), image: e.target.value}})} className="w-full px-4 py-2 border rounded-lg text-sm" />
                    {formData.about?.image && <img src={formData.about.image} className="h-32 object-cover rounded mt-2 border" alt="about img" />}
                    <ImageUploader onUpload={(url) => setFormData((prev: any) => ({...prev, about: {...(prev.about || {}), image: url}}))} folder="global" />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-brand-blue text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-brand-blue/30 transition-all"
              >
                <Save size={20} />
                保存网站设置
              </button>
            </form>
          </motion.div>
        ) : isEditing ? (
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
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">内容 (富文本编辑器)</label>
                    <div className="bg-white">
                      <ReactQuill 
                        theme="snow"
                        value={formData.content || formData.richHTML || ''}
                        onChange={(content) => setFormData({...formData, content: content, richHTML: content})}
                        className="h-[400px] mb-12"
                        modules={{
                          toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                            ['link', 'image', 'video'],
                            ['clean']
                          ],
                        }}
                      />
                    </div>
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
                    <label className="block text-sm font-bold text-slate-700 mb-2">主图 (产品展示用)</label>
                    <div className="flex gap-4">
                      <input type="text" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="flex-grow px-4 py-2 border rounded-lg text-sm bg-slate-50 relative z-10 font-mono text-slate-500" readOnly placeholder="上传后自动生成链接" />
                    </div>
                    {formData.imageUrl && <img src={formData.imageUrl} className="h-32 object-contain rounded mt-2 border" alt="产品主图" />}
                    <ImageUploader onUpload={(url) => setFormData({...formData, imageUrl: url})} folder="products" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">详情页长图/详情内容</label>
                    <div className="flex gap-4">
                      <input type="text" value={formData.detailImageUrl || ''} onChange={e => setFormData({...formData, detailImageUrl: e.target.value})} className="flex-grow px-4 py-2 border rounded-lg text-sm bg-slate-50 relative z-10 font-mono text-slate-500" readOnly placeholder="上传后自动生成链接" />
                    </div>
                    {formData.detailImageUrl && <img src={formData.detailImageUrl} className="h-48 object-cover object-top rounded mt-2 border" alt="详情图" />}
                    <ImageUploader onUpload={(url) => setFormData({...formData, detailImageUrl: url})} folder="products" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">描述 (简述)</label>
                    <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg h-32" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">富文本产品图文详情 (强烈推荐，所见即所得)</label>
                    <div className="bg-white">
                      <ReactQuill 
                        theme="snow"
                        value={formData.richHTML || ''}
                        onChange={(content) => setFormData({...formData, richHTML: content})}
                        className="h-[500px] mb-12"
                        modules={{
                          toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                            ['link', 'image', 'video'],
                            ['clean']
                          ],
                        }}
                      />
                    </div>
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
                    <label className="block text-sm font-bold text-slate-700 mb-2">分类</label>
                    <select value={formData.category || '市政案例'} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                      <option value="市政案例">市政案例</option>
                      <option value="农业案例">农业案例</option>
                      <option value="工业案例">工业案例</option>
                      <option value="矿山案例">矿山案例</option>
                    </select>
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
              
              {activeTab === 'partners' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">排序 (数字越小越靠前)</label>
                    <input type="number" value={formData.order || 0} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Logo</label>
                    <div className="flex gap-4">
                      <input type="text" value={formData.logo || ''} onChange={e => setFormData({...formData, logo: e.target.value})} className="flex-grow px-4 py-2 border rounded-lg text-sm" placeholder="上传后自动生成链接" />
                    </div>
                    {(formData.logo) && <img src={formData.logo} className="h-20 object-contain rounded mt-2 border bg-white p-2" alt="logo" />}
                    <ImageUploader onUpload={(url) => setFormData({...formData, logo: url})} folder="partners" />
                  </div>
                </>
              )}

              {activeTab !== 'partners' && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">图片 (上传或粘贴链接)</label>
                <div className="flex gap-4 mb-4">
                  <input 
                    type="text" 
                    placeholder="可在此直接粘贴图片 URL 链接" 
                    value={formData.imageUrl || ''} 
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                    className="flex-grow px-4 py-2 border rounded-lg text-sm"
                  />
                </div>
                {formData.imageUrl && (
                  <div className="mb-4 aspect-video rounded-lg overflow-hidden border bg-slate-50 relative group">
                    <img src={formData.imageUrl} className="w-full h-full object-cover" alt="preview" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Invalid+Image+URL'; }} />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <span className="text-white text-xs">当前预览</span>
                    </div>
                  </div>
                )}
                <ImageUploader 
                  onUpload={(url, orientation) => setFormData({...formData, imageUrl: url, orientation: orientation})} 
                  folder={activeTab} 
                />
                <div className="mt-4 flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, orientation: 'landscape'})}
                    className={cn(
                      "px-4 py-2 border rounded-lg text-xs font-bold transition-all",
                      formData.orientation === 'landscape' ? "bg-brand-blue text-white" : "bg-white text-slate-600"
                    )}
                  >
                    横版布局
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, orientation: 'portrait'})}
                    className={cn(
                      "px-4 py-2 border rounded-lg text-xs font-bold transition-all",
                      formData.orientation === 'portrait' ? "bg-brand-blue text-white" : "bg-white text-slate-600"
                    )}
                  >
                    竖版布局
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">提示：上传图片会自动检测版式，您也可以手动切换。</p>
              </div>
              )}

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-brand-blue text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-brand-blue/30 transition-all"
              >
                <Save size={20} />
                保存数据
              </button>
            </form>
          </motion.div>
        ) : activeTab === 'messages' ? (
          <div className="space-y-4">
            <AnimatePresence>
              {items.map(item => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl border p-6 shadow-sm relative overflow-hidden"
                >
                  {/* Decorative tag for type */}
                  <div className="absolute top-0 right-0 bg-brand-blue text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                    {item.type === 'purchase' ? '产品购买咨询' :
                     item.type === 'cooperation' ? '工程项目合作' :
                     item.type === 'technical' ? '技术支持服务' :
                     item.type === 'complaint' ? '投诉与建议' : '其他问题'}
                  </div>

                  <div className="flex justify-between items-start mb-4 pr-32">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-1">{item.name} <span className="text-sm font-normal text-slate-500 ml-2">{item.company || '个人客户'}</span></h3>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                        <span className="flex items-center gap-1.5"><span className="text-slate-400">电话:</span> {item.phone}</span>
                        {item.email && <span className="flex items-center gap-1.5"><span className="text-slate-400">邮箱:</span> {item.email}</span>}
                        {item.address && <span className="flex items-center gap-1.5"><span className="text-slate-400">地址:</span> {item.address}</span>}
                      </div>
                    </div>
                  </div>
                  
                  {item.productName && (
                     <div className="mb-4 text-sm font-medium text-brand-blue bg-brand-blue/5 p-3 rounded-xl border border-brand-blue/10 inline-block w-full">
                       意向产品: {item.productName}
                     </div>
                  )}

                  <div className="bg-slate-50 p-4 rounded-xl border text-sm text-slate-700 whitespace-pre-wrap">
                    {item.message || item.content}
                  </div>

                  <div className="mt-4 flex justify-between items-center text-xs text-slate-400">
                    <span>留言时间: {item.date ? new Date(item.date).toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '刚刚'}</span>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center gap-1.5 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors font-medium"
                    >
                      <Trash2 size={14} /> 删除留言
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {items.length === 0 && (
              <div className="py-20 text-center text-slate-400 border-2 border-dashed rounded-3xl">
                暂无任何在线留言。
              </div>
            )}
          </div>
        ) : activeTab === 'qualifications' ? (
          <div className="space-y-12 pb-12">
            {[
              { id: 'honors', label: '荣誉奖项' },
              { id: 'qualifications', label: '资质证书' },
              { id: 'patents', label: '专利技术' },
            ].map(cat => {
              const catItems = items.filter(item => item.category === cat.id || (!item.category && cat.id === 'honors'));
              return (
                <div key={cat.id} className="bg-white rounded-2xl border p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-brand-blue rounded-full"></span>
                    {cat.label} 
                    <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">共 {catItems.length} 项</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    <AnimatePresence>
                      {catItems.map(item => renderItemCard(item))}
                    </AnimatePresence>
                    {catItems.length === 0 && (
                      <div className="col-span-full py-10 text-center text-slate-400 border-2 border-dashed rounded-xl bg-slate-50">
                        此分类下还没有数据
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {items.map(item => renderItemCard(item))}
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
