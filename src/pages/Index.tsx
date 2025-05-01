import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Album } from "@/types";
import { AlbumCard } from "@/components/album-card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { GridSizeSelector } from "@/components/ui/view-selector";

const Index = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [columns, setColumns] = useState<number>(4);
  const navigate = useNavigate();

  // Функция для генерации уникального ID (замена uuid)
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  useEffect(() => {
    const savedAlbums = localStorage.getItem("photoAlbums");
    if (savedAlbums) {
      setAlbums(JSON.parse(savedAlbums));
    }
  }, []);

  useEffect(() => {
    if (albums.length > 0) {
      localStorage.setItem("photoAlbums", JSON.stringify(albums));
    }
  }, [albums]);

  const createAlbum = () => {
    const newAlbumId = generateId();
    const newAlbum: Album = {
      id: newAlbumId,
      name: `Альбом ${albums.length + 1}`,
      dateCreated: Date.now(),
      photos: [],
    };

    const updatedAlbums = [...albums, newAlbum];
    setAlbums(updatedAlbums);
    localStorage.setItem("photoAlbums", JSON.stringify(updatedAlbums));

    toast({
      title: "Альбом создан",
      description: `Альбом «${newAlbum.name}» успешно создан.`,
    });
  };

  const renameAlbum = (albumId: string, newName: string) => {
    const updatedAlbums = albums.map((album) =>
      album.id === albumId ? { ...album, name: newName } : album
    );
    setAlbums(updatedAlbums);
    localStorage.setItem("photoAlbums", JSON.stringify(updatedAlbums));
  };

  const deleteAlbum = (albumId: string) => {
    const updatedAlbums = albums.filter((album) => album.id !== albumId);
    setAlbums(updatedAlbums);
    localStorage.setItem("photoAlbums", JSON.stringify(updatedAlbums));

    toast({
      title: "Альбом удален",
      description: "Альбом успешно удален из коллекции.",
    });
  };

  const deleteAllAlbums = () => {
    setAlbums([]);
    localStorage.removeItem("photoAlbums");
    
    toast({
      title: "Все альбомы удалены",
      description: "Все альбомы успешно удалены из коллекции.",
    });
  };

  return (
    <div className="container py-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Мои фотоальбомы</h1>
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            {albums.length} {albums.length === 1 ? "альбом" : albums.length >= 2 && albums.length <= 4 ? "альбома" : "альбомов"}
          </p>
          <div className="flex gap-2 items-center">
            {albums.length > 0 && (
              <>
                <div className="mr-2">
                  <GridSizeSelector columns={columns} onChange={setColumns} />
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Удалить все
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Удалить все альбомы?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Это действие нельзя отменить. Все альбомы и фотографии будут безвозвратно удалены.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                      <AlertDialogAction onClick={deleteAllAlbums} className="bg-destructive text-destructive-foreground">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Удалить все
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
            <Button onClick={createAlbum}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Создать альбом
            </Button>
          </div>
        </div>
      </header>

      {albums.length > 0 ? (
        <div className={`album-grid cols-${columns}`}>
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onSelect={(albumId) => navigate(`/album/${albumId}`)}
              onRename={renameAlbum}
              onDelete={deleteAlbum}
            />
          ))}
          <div 
            className="border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center min-h-[250px] cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={createAlbum}
          >
            <div className="text-center">
              <PlusCircle className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground font-medium">Добавить альбом</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">
            У вас пока нет ни одного фотоальбома
          </p>
          <Button onClick={createAlbum} size="lg">
            <PlusCircle className="h-5 w-5 mr-2" />
            Создать первый альбом
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
