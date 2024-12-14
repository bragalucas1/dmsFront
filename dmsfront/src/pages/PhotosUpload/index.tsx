import { Album } from "@/interfaces/Album";
import { Photo } from "@/interfaces/Photo";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PhotoUpload: React.FC = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string>("");
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [isCreatingNewAlbum, setIsCreatingNewAlbum] = useState(false);

  const generatePlaceholderUrl = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return {
      url: `https://via.placeholder.com/600/${randomColor}`,
      thumbnailUrl: `https://via.placeholder.com/150/${randomColor}`,
    };
  };

  const fetchAlbums = () => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const owner = users.find((user: any) => user.isOwner);
      if (owner && owner.albums) {
        setAlbums(owner.albums);
      }
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("photo", file);

    try {
      const storedUsers = localStorage.getItem("users");
      if (!storedUsers) throw new Error("No users found in localStorage");

      const users = JSON.parse(storedUsers);
      const owner = users.find((user: any) => user.isOwner);
      if (!owner) throw new Error("Owner not found");

      let albumId = selectedAlbum;

      if (isCreatingNewAlbum) {
        albumId = (albums.length + 1).toString();
        const newAlbum: Album = {
          id: parseInt(albumId),
          title: newAlbumTitle,
          userId: owner.id,
          photos: [],
        };

        owner.albums = owner.albums ? [...owner.albums, newAlbum] : [newAlbum];
        setAlbums([...albums, newAlbum]);
      }

      const { url, thumbnailUrl } = generatePlaceholderUrl();

      const newPhoto: Photo = {
        albumId: parseInt(albumId),
        id: Date.now(),
        title,
        url,
        thumbnailUrl,
      };

      const albumIndex = owner.albums.findIndex(
        (album: Album) => album.id === parseInt(albumId)
      );
      owner.albums[albumIndex].photos.push(newPhoto);
      localStorage.setItem("users", JSON.stringify(users));

      toast.success("Photo uploaded successfully!");

      setTitle("");
      setFile(null);
      setSelectedAlbum("");
      setNewAlbumTitle("");
      setIsCreatingNewAlbum(false);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload photo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload New Photo</h1>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
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
          {isLoading ? "Uploading..." : "Upload Photo"}
        </button>
      </form>
    </div>
  );
};

export default PhotoUpload;
