import { albumService } from "@/services/AlbumService/AlbumService";
import { useState } from "react";

// src/components/AlbumCard/index.tsx
interface AlbumCardProps {
  album: {
    id: number;
    title: string;
    userId: number;
  };
  isOwner: boolean;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, isOwner }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(album.title);

  const handleDelete = async () => {
    try {
      await albumService.deleteAlbum(album.id);
      // Atualizar estado local ou disparar refresh
    } catch (error) {
      console.error('Failed to delete album:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await albumService.updateAlbum(album.id, { title });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update album:', error);
    }
  };

  return (
    <div className="album-card">
      {isEditing ? (
        <div className="album-edit">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="album-info">
          <h3>{album.title}</h3>
          {isOwner && (
            <div className="album-actions">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
