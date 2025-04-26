import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AlbumCard, AddAlbumCard } from "@/components/album-card";
import { Button } from "@/components/ui/button";
import { Album } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const [albums, setAlbums] = useState<Album[]>(() => {
    const savedAlbums = localStorage.getItem("photoAlbums");
    return savedAlbums ? JSON.parse(savedAlbums) : [];
  });

  useEffect(() => {
    localStorage.setItem("photoAlbums", JSON.stringify(albums));
  }, [albums]);

  const createAlbum = () => {
    const newAlbumId = uuidv4();
    const newAlbum: Album = {
      id: newAlbumId,
      name: `Альбом ${albums.length + 1}`,
      photos: [],
      dateCreated: Date.now(),
    };

    setAlbums([...albums, newAlbum]);
    toast({
      title: "Альбом создан",
      description: `Альбом "${newAlbum.name}" успешно создан.`,
    });
  };

  const renameAlbum = (albumId: string, newName: string) => {
    setAlbums(
      albums.map((album) =>
        album.id === albumId ? { ...album, name: newName } : album
      )
    );
    toast({
      title: "Альбом переименован",
      description: `Альбом успешно переименован в "${newName}".`,
    });
  };

  const deleteAlbum = (albumId: string) => {
    setAlbums(albums.filter((album) => album.id !== albumId));
    toast({
      title: "Альбом удален",
      description: "Альбом успешно удален.",
    });
  };

  return (
    <div className="container py-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Мои альбомы</h1>
        <p className="text-muted-foreground">
          Здесь вы можете просматривать и управлять своими фотоальбомами
        </p>
      </header>

      <div className="album-grid">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            onSelect={(albumId) => window.location.href = `/album/${albumId}`}
            onRename={renameAlbum}
            onDelete={deleteAlbum}
          />
        ))}
        <AddAlbumCard onAdd={createAlbum} />
      </div>

      {albums.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            У вас пока нет альбомов. Создайте свой первый альбом!
          </p>
          <Button onClick={createAlbum}>Создать альбом</Button>
        </div>
      )}
    </div>
  );
};

export default Index;
