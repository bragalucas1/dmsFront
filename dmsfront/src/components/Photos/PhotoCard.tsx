import { photoService } from "@/services/PhotosService/PhotosService";
import { useState } from "react";

// src/components/PhotoCard/index.tsx
interface PhotoCardProps {
  photo: {
    id: number;
    title: string;
    url: string;
    albumId: number;
  };
  isOwner: boolean;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, isOwner }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(photo.title);

  const handleDelete = async () => {
    try {
      await photoService.deletePhoto(photo.id);
      // Atualizar estado local ou disparar refresh
    } catch (error) {
      console.error('Failed to delete photo:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await photoService.updatePhoto(photo.id, { title });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update photo:', error);
    }
  };

  return (
    <div className="photo-card">
      <img src={photo.url} alt={photo.title} />
      {isEditing ? (
        <div className="photo-edit">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="photo-info">
          <h3>{photo.title}</h3>
          {isOwner && (
            <div className="photo-actions">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
