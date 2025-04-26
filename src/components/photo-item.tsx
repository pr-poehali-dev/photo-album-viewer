import React, { useState } from "react";
import { Pencil, Trash, Check, X } from "lucide-react";
import { Photo } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PhotoItemProps {
  photo: Photo;
  onRename: (photoId: string, newName: string) => void;
  onDelete: (photoId: string) => void;
}

export const PhotoItem: React.FC<PhotoItemProps> = ({
  photo,
  onRename,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(photo.name);

  const handleRename = () => {
    if (newName.trim()) {
      onRename(photo.id, newName);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewName(photo.name);
    setIsEditing(false);
  };

  return (
    <div className="photo-item group">
      <img
        src={photo.url}
        alt={photo.name}
        className="w-full h-full object-cover"
      />
      {!isEditing ? (
        <>
          <div className="photo-caption group-hover:opacity-100">
            <div className="flex justify-between items-center">
              <span className="truncate">{photo.name}</span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:text-white hover:bg-black/30"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:text-white hover:bg-black/30"
                  onClick={() => onDelete(photo.id)}
                >
                  <Trash className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-1 px-1 text-sm truncate">{photo.name}</div>
        </>
      ) : (
        <div className="absolute inset-0 bg-black/70 p-3 flex flex-col justify-center">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Введите название фото"
            className="mb-2"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="destructive"
              onClick={handleCancel}
            >
              <X className="mr-1 h-3 w-3" />
              Отмена
            </Button>
            <Button
              size="sm"
              onClick={handleRename}
            >
              <Check className="mr-1 h-3 w-3" />
              Сохранить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
