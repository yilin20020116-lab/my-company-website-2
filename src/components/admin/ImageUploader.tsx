import React, { useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ImageUploaderProps {
  onUpload: (url: string, orientation: 'landscape' | 'portrait') => void;
  folder?: string;
}

export default function ImageUploader({ onUpload, folder = 'general' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getImageOrientation = (file: File): Promise<'landscape' | 'portrait'> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const orientation = img.naturalWidth >= img.naturalHeight ? 'landscape' : 'portrait';
        resolve(orientation);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setDone(false);
    setProgress(0);
    setError(null);

    try {
      // 0. Detect orientation
      const orientation = await getImageOrientation(file);

      // 1. 压缩图片 (最大 1MB)
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };
      const compressedFile = await imageCompression(file, options);

      // 2. 使用我们的后端接口上传
      const formData = new FormData();
      formData.append('image', compressedFile);

      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const p = Math.round((progressEvent.loaded * 100) / (progressEvent.total || progressEvent.loaded));
          setProgress(p);
        }
      });

      onUpload(res.data.url, orientation);
      setDone(true);
    } catch (err) {
      console.error('Upload failed:', err);
      setError('上传失败，请确保 Cloudflare 环境变量已配置');
      alert('上传出错，请检查后台环境变量配置。');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <label className={cn(
        "flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-all",
        uploading ? "bg-slate-50 border-brand-blue/30" : "hover:bg-slate-50 border-slate-300",
        error ? "border-red-300 bg-red-50/30" : ""
      )}>
        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
          {uploading ? (
            <div className="w-full flex flex-col items-center">
              <div className="relative w-16 h-16 mb-3">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="transparent"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-brand-blue transition-all duration-300"
                    strokeWidth="3"
                    strokeDasharray={`${progress}, 100`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-brand-blue">
                  {progress}%
                </div>
              </div>
              <p className="text-sm font-medium text-slate-600">正在极速上传...</p>
            </div>
          ) : done ? (
            <>
              <CheckCircle2 className="w-10 h-10 text-green-500 mb-2" />
              <p className="text-sm font-medium text-green-600">上传成功!</p>
            </>
          ) : error ? (
            <>
              <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
              <p className="text-sm font-medium text-red-600">{error}</p>
            </>
          ) : (
            <>
              <Upload className="w-10 h-10 text-slate-300 mb-2" />
              <p className="text-sm font-medium text-slate-600">点击或拖拽上传图片</p>
              <p className="text-xs text-slate-400 mt-1">自动进行高清无损压缩</p>
            </>
          )}
        </div>
        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" disabled={uploading} />
      </label>
    </div>
  );
}
