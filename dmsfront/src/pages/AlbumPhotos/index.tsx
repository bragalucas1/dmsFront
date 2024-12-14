import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Photo } from "@/interfaces/Photo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

const AlbumPhotosPage: React.FC = () => {
  const { albumId } = useParams();
  const location = useLocation();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isOwner, setIsOwner] = useState(false); // Identifica se o usuário é o dono do álbum

  const generatePlaceholderUrl = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return {
      url: `https://via.placeholder.com/600/${randomColor}`,
      thumbnailUrl: `https://via.placeholder.com/150/${randomColor}`,
    };
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      if (location.state && location.state.albums) {
        const albums = location.state.albums;

        const albumPhotos = albums
          .filter((album: any) => album.albumId === Number(albumId))
          .map((album: any) => ({
            id: album.id,
            title: album.title,
            url: album.url,
            thumbnailUrl: album.thumbnailUrl,
            albumId: album.albumId,
          }));

        setPhotos(albumPhotos);
        return;
      }

      try {
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          const owner = users.find((user: any) => user.isOwner);
          const albumOwner =
            owner && owner.albums?.find((a: any) => a.id === Number(albumId));

          if (albumOwner) {
            setPhotos(albumOwner.photos);
            setIsOwner(true); // Define que o usuário atual é o owner
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching photos from localStorage:", error);
      }

      setIsOwner(false); // Caso não seja o dono, remove permissões
      console.warn("No photos found.");
    };

    fetchPhotos();
  }, [albumId, location.state]);

  const handleEditPhoto = () => {
    if (!selectedPhoto) return;

    const { url, thumbnailUrl } = generatePlaceholderUrl();
    const updatedPhotos = photos.map((photo) =>
      photo.id === selectedPhoto.id ? { ...photo, url, thumbnailUrl } : photo
    );
    setPhotos(updatedPhotos);

    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const owner = users.find((user: any) => user.isOwner);

      if (owner && owner.albums) {
        const album = owner.albums.find(
          (album: any) => album.id === Number(albumId)
        );
        if (album) {
          album.photos = updatedPhotos;
          localStorage.setItem("users", JSON.stringify(users));
          toast.success("Photo updated successfully!");
        }
      }
    }

    setSelectedPhoto(null);
    setFile(null);
    setIsEditModalOpen(false);
  };

  const handleDeletePhoto = (photoId: number) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== photoId);
    setPhotos(updatedPhotos);

    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const owner = users.find((user: any) => user.isOwner);

      if (owner && owner.albums) {
        const album = owner.albums.find(
          (album: any) => album.id === Number(albumId)
        );
        if (album) {
          album.photos = updatedPhotos;
          localStorage.setItem("users", JSON.stringify(users));
          toast.success("Photo deleted successfully!");
        }
      }
    }
  };

  return (
    <div className="photos-page">
      <h1>Album Photos</h1>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="photos-grid">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id} className="photo-card">
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <h3>{photo.title}</h3>
              {isOwner && (
                <div className="photo-actions">
                  <button
                    className="edit-button"
                    onClick={() => {
                      setSelectedPhoto(photo);
                      setIsEditModalOpen(true);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeletePhoto(photo.id)}
                  >
                    ❌
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No photos found for this album.</p>
        )}
      </div>

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Photo</h2>
            <div className="form-group">
              <label htmlFor="photo-file">Upload a new photo:</label>
              <input
                type="file"
                id="photo-file"
                className="photo-upload-input"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
            <p>Click "Save" to persist the changes.</p>
            <div className="modal-actions">
              <button onClick={handleEditPhoto}>Save</button>
              <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumPhotosPage;
