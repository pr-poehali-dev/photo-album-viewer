import React, { useState } from "react";
import { Pencil, Trash, Check, X } from "lucide-react";
import { Album } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AlbumCardProps {
  album: Album;
  onSelect: (albumId: string) => void;
  onRename: (albumId: string, newName: string) => void;
  onDelete: (albumId: string) => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({
  album,
  onSelect,
  onRename,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(album.name);

  const handleRename = () => {
    if (newName.trim()) {
      onRename(album.id, newName);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewName(album.name);
    setIsEditing(false);
  };

  const coverImage = album.photos[0]?.url || "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=400&auto=format&fit=crop";

  return (
    <div className="album-card border shadow-sm bg-card">
      <div
        className="w-full h-full relative"
        onClick={() => !isEditing && onSelect(album.id)}
      >
        <img
          src={coverImage}
          alt={album.name}
          className="w-full h-full object-cover"
        />
        {!isEditing ? (
          <div className="album-title">
            <div className="flex justify-between items-center">
              <h3 className="font-medium truncate">{album.name}</h3>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white hover:text-white hover:bg-black/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white hover:text-white hover:bg-black/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(album.id);
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs opacity-75">{album.photos.length} фото</p>
          </div>
        ) : (
          <div className="absolute inset-0 bg-black/70 p-4 flex flex-col justify-center">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Введите название альбома"
              className="mb-2"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel();
                }}
              >
                <X className="mr-1 h-4 w-4" />
                Отмена
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRename();
                }}
              >
                <Check className="mr-1 h-4 w-4" />
                Сохранить
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const AddAlbumCard: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
  return (
    <div
      className="add-album-card album-card"
      onClick={onAdd}
    >
      <div className="text-4xl text-primary">+</div>
      <p className="mt-2 text-sm text-muted-foreground">Добавить альбом</p>
    </div>
  );
};
