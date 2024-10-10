import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (imageData: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        onImageUpload(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-secondary bg-gray-800' : 'border-gray-600 hover:border-gray-500'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-secondary" />
      <p className="mt-2 text-sm text-gray-300">
        Drag and drop your sketch here, or click to select a file
      </p>
      <p className="mt-1 text-xs text-gray-400">
        Supported formats: PNG, JPG, GIF (max 5MB)
      </p>
    </div>
  );
};

export default ImageUploader;