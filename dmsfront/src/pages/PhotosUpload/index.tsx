// src/pages/PhotosUpload/index.tsx
import React, { useState, useEffect } from 'react';
import { photoService } from 'services/PhotosService/PhotosService';
import { mockPhotoService } from 'services/PhotosService/mockPhotoService';

interface Album {
  id: number;
  title: string;
  userId: number;
}

const PhotoUpload: React.FC = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string>('');
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [isCreatingNewAlbum, setIsCreatingNewAlbum] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const userAlbums = await photoService.getCurrentUserAlbums();
        setAlbums(userAlbums);
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('photo', file);
    
    if (isCreatingNewAlbum) {
      formData.append('albumTitle', newAlbumTitle);
    } else {
      formData.append('albumId', selectedAlbum);
    }

    try {
      await photoService.createPhoto(formData);
      setTitle('');
      setFile(null);
      setSelectedAlbum('');
      setNewAlbumTitle('');
      setIsCreatingNewAlbum(false);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload New Photo</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="photo-title">Photo Title:</label>
          <input
            id="photo-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo-file">Select Photo:</label>
          <input
            id="photo-file"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isCreatingNewAlbum}
              onChange={(e) => setIsCreatingNewAlbum(e.target.checked)}
              disabled={isLoading}
            />
            Create New Album
          </label>
        </div>

        {isCreatingNewAlbum ? (
          <div className="form-group">
            <label htmlFor="new-album">New Album Title:</label>
            <input
              id="new-album"
              type="text"
              value={newAlbumTitle}
              onChange={(e) => setNewAlbumTitle(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="album-select">Select Album:</label>
            <select
              id="album-select"
              value={selectedAlbum}
              onChange={(e) => setSelectedAlbum(e.target.value)}
              disabled={isLoading}
              required
            >
              <option value="">Select an album</option>
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <button 
          type="submit" 
          className="upload-button"
          disabled={
            isLoading || 
            !title.trim() || 
            !file || 
            (isCreatingNewAlbum ? !newAlbumTitle.trim() : !selectedAlbum)
          }
        >
          {isLoading ? 'Uploading...' : 'Upload Photo'}
        </button>
      </form>
    </div>
  );
};

export default PhotoUpload;
