import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { Upload, Loader2, CheckCircle2 } from 'lucide-react';

// Need to export storage from firebase.ts first
// I'll update firebase.ts in the next step or do it now
interface ImageUploaderProps {
  onUpload: (url: string) => void;
  folder?: string;
}

export default function ImageUploader({ onUpload, folder = 'general' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setDone(false);

    try {
      const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      onUpload(url);
      setDone(true);
    } catch (error) {
      console.error('Upload failed', error);
      alert('上传失败，请检查网络或 Firebase 配置');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {uploading ? (
            <Loader2 className="w-8 h-8 text-brand-blue animate-spin mb-2" />
          ) : done ? (
            <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
          ) : (
            <Upload className="w-8 h-8 text-slate-400 mb-2" />
          )}
          <p className="text-sm text-slate-500">
            {uploading ? '正在上传...' : done ? '上传成功' : '点击或拖拽上传图片'}
          </p>
        </div>
        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" disabled={uploading} />
      </label>
    </div>
  );
}
