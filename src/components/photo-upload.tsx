import React, { useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface PhotoUploadProps {
  albumId: string;
  onUpload: (albumId: string, files: File[]) => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ albumId, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length === 0) return;
    
    // Проверка, что файлы - изображения
    const imageFiles = files.filter(file => file.type.startsWith("image/"));
    
    if (imageFiles.length !== files.length) {
      toast({
        title: "Ошибка загрузки",
        description: "Пожалуйста, выбирайте только изображения.",
        variant: "destructive"
      });
      return;
    }
    
    onUpload(albumId, imageFiles);
    
    // Сбросить input, чтобы можно было загрузить те же файлы снова
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <Button 
        variant="outline" 
        onClick={handleClick}
        className="gap-2"
      >
        <Upload className="h-4 w-4" />
        Загрузить фото
      </Button>
    </>
  );
};
