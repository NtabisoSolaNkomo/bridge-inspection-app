
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Image as ImageIcon, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface PhotoCaptureProps {
  onCapture: (file: File) => void;
}

export function PhotoCapture({ onCapture }: PhotoCaptureProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [tempFile, setTempFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
      setTempFile(file);
    };
    fileReader.readAsDataURL(file);
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancelPreview = () => {
    setPreviewUrl(null);
    setTempFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirmImage = () => {
    if (tempFile) {
      onCapture(tempFile);
      setPreviewUrl(null);
      setTempFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      toast.success('Photo added to report');
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        ref={fileInputRef}
        className="hidden"
      />
      
      {!previewUrl ? (
        <Button 
          variant="outline" 
          className="w-full h-40 border-dashed flex flex-col gap-2 rounded-lg" 
          onClick={handleCameraClick}
        >
          <Camera className="h-6 w-6" />
          <span>Capture Photo</span>
        </Button>
      ) : (
        <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden animate-fade-in">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-x-0 bottom-0 p-3 flex justify-center space-x-3 bg-black/30 backdrop-blur-sm">
            <Button 
              size="icon" 
              variant="outline"
              className="bg-white/20 hover:bg-white/40 border-0"
              onClick={handleCancelPreview}
            >
              <X className="h-5 w-5" />
            </Button>
            <Button 
              size="icon"
              className="bg-primary/80 hover:bg-primary"
              onClick={handleConfirmImage}
            >
              <Check className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
