
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (base64: string, mimeType: string) => void;
  icon?: React.ReactNode;
  label?: string;
  isCompact?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, icon, label, isCompact = false }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        if (!isCompact) {
            setPreview(reader.result as string);
        }
        onImageUpload(base64String, file.type);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload, isCompact]);

  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const heightClass = isCompact ? 'h-32' : 'h-64';

  return (
    <div>
      <label
        onDragEnter={onDragEnter}
        onDragOver={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative flex flex-col items-center justify-center w-full ${heightClass} border border-dashed rounded-none cursor-pointer ${isDragging ? 'border-lime-400 bg-lime-900/50' : 'border-neutral-600 bg-neutral-800 hover:bg-neutral-700'}`}
      >
        {preview && !isCompact ? (
          <img src={preview} alt="Upload preview" className="object-cover w-full h-full rounded-none" />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-2">
            {icon || <UploadIcon className="w-10 h-10 mb-3 text-stone-400"/>}
            {label && <p className="mb-2 text-sm text-stone-400 uppercase tracking-widest">{label}</p>}
            <p className="text-xs text-stone-500">Click or Drag & Drop</p>
          </div>
        )}
        <input 
            id={`dropzone-file-${label}`} 
            type="file" 
            className="hidden" 
            accept="image/png, image/jpeg, image/webp"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        />
      </label>
    </div>
  );
};