import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Album, Photo } from "@/types";
import { PhotoItem } from "@/components/photo-item";
import { PhotoUpload } from "@/components/photo-upload";
import { ViewSelector, ViewMode } from "@/components/ui/view-selector";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { ArrowLeft, AlignJustify, AlignHorizontalJustifyCenter } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const AlbumView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [album, setAlbum] = useState<Album | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical");
  const [albums, setAlbums] = useState<Album[]>([]);

  // Функция для генерации уникального ID (замена uuid)
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  useEffect(() => {
    const savedAlbums = localStorage.getItem("photoAlbums");
    if (savedAlbums) {
      const parsedAlbums = JSON.parse(savedAlbums);
      setAlbums(parsedAlbums);
      
      const currentAlbum = parsedAlbums.find((a: Album) => a.id === id);
      if (currentAlbum) {
        setAlbum(currentAlbum);
      } else {
        navigate("/");
        toast({
          title: "Альбом не найден",
          description: "Запрашиваемый альбом не существует.",
          variant: "destructive",
        });
      }
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  useEffect(() => {
    if (albums.length > 0) {
      localStorage.setItem("photoAlbums", JSON.stringify(albums));
    }
  }, [albums]);

  const updateAlbumInStorage = (updatedAlbum: Album) => {
    const updatedAlbums = albums.map((a) =>
      a.id === updatedAlbum.id ? updatedAlbum : a
    );
    setAlbums(updatedAlbums);
    setAlbum(updatedAlbum);
  };

  const handlePhotoUpload = (albumId: string, files: File[]) => {
    if (!album) return;

    const newPhotos: Photo[] = [];
    
    const readAndCreatePhotos = async () => {
      for (const file of files) {
        const photoId = generateId();
        const photoName = file.name.split(".")[0] || `Фото ${album.photos.length + newPhotos.length + 1}`;
        
        // Создаем URL для изображения
        const url = URL.createObjectURL(file);
        
        // Определяем ориентацию фото
        const img = new Image();
        img.src = url;
        
        await new Promise<void>((resolve) => {
          img.onload = () => {
            const orientation = 
              img.width > img.height ? "landscape" : 
              img.width < img.height ? "portrait" : "square";
            
            newPhotos.push({
              id: photoId,
              name: photoName,
              url,
              orientation,
              dateAdded: Date.now(),
            });
            resolve();
          };
        });
      }

      const updatedAlbum = {
        ...album,
        photos: [...album.photos, ...newPhotos],
      };
      
      updateAlbumInStorage(updatedAlbum);
      
      toast({
        title: "Фото загружены",
        description: `Добавлено ${newPhotos.length} новых фото в альбом.`,
      });
    };
    
    readAndCreatePhotos();
  };

  const renamePhoto = (photoId: string, newName: string) => {
    if (!album) return;

    const updatedPhotos = album.photos.map((photo) =>
      photo.id === photoId ? { ...photo, name: newName } : photo
    );

    const updatedAlbum = { ...album, photos: updatedPhotos };
    updateAlbumInStorage(updatedAlbum);
  };

  const deletePhoto = (photoId: string) => {
    if (!album) return;

    const updatedPhotos = album.photos.filter((photo) => photo.id !== photoId);
    const updatedAlbum = { ...album, photos: updatedPhotos };
    updateAlbumInStorage(updatedAlbum);

    toast({
      title: "Фото удалено",
      description: "Фотография успешно удалена из альбома.",
    });
  };

  if (!album) {
    return <div className="container py-8">Загрузка...</div>;
  }

  return (
    <div className="container py-8 max-w-7xl">
      <header className="mb-8">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">{album.name}</h1>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <p className="text-muted-foreground">
            {album.photos.length} фотографий
          </p>
          <div className="flex items-center gap-4">
            <ToggleGroup type="single" value={orientation} onValueChange={(value) => value && setOrientation(value as "vertical" | "horizontal")}>
              <ToggleGroupItem value="vertical" aria-label="Вертикальная ориентация">
                <AlignJustify className="h-4 w-4 mr-1" />
                10×15
              </ToggleGroupItem>
              <ToggleGroupItem value="horizontal" aria-label="Горизонтальная ориентация">
                <AlignHorizontalJustifyCenter className="h-4 w-4 mr-1" />
                15×10
              </ToggleGroupItem>
            </ToggleGroup>
            <ViewSelector viewMode={viewMode} onChange={setViewMode} />
            <PhotoUpload albumId={album.id} onUpload={handlePhotoUpload} />
          </div>
        </div>
      </header>

      {album.photos.length > 0 ? (
        <div className={`photo-grid photo-grid-${viewMode} ${orientation === 'vertical' ? 'vertical-grid' : 'horizontal-grid'}`}>
          {album.photos.map((photo) => (
            <PhotoItem
              key={photo.id}
              photo={photo}
              onRename={renamePhoto}
              onDelete={deletePhoto}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">
            В этом альбоме пока нет фотографий
          </p>
          <PhotoUpload albumId={album.id} onUpload={handlePhotoUpload} />
        </div>
      )}
    </div>
  );
};

export default AlbumView;
