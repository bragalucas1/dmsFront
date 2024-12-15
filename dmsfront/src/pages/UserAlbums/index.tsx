import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Album } from "@/interfaces/Album";
import { albumService } from "services/AlbumService/AlbumService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

const UserAlbumsPage: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userAlbums, setUserAlbums] = useState<Album[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [isOwner, setIsOwner] = useState(false); // Identifica se o usuário é o dono

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        if (!userId) return;

        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          const owner = users.find((user: any) => user.isOwner);
          console.log(owner);

          if (owner && owner.id === Number(userId)) {
            const user = users.find((user: any) => user.id === Number(userId));
            if (user && user.albums) {
              setUserAlbums(user.albums);
              setCurrentUserId(Number(userId));
              setIsOwner(true); // Define que o usuário atual é o owner
              return;
            }
          }
        }

        // Caso não seja o owner, busca os álbuns normalmente
        const albums = await albumService.getUsersAlbumsByUserId(
          Number(userId)
        );
        setUserAlbums(albums);
        setCurrentUserId(Number(userId));
        setIsOwner(false); // Define que o usuário atual não é o owner
      } catch (error) {
        console.error("Failed to fetch user albums:", error);
      }
    };

    fetchAlbums();
  }, [userId]);

  const handleDeleteAlbum = () => {
    if (!selectedAlbum) return;

    const updatedAlbums = userAlbums.filter(
      (album) => album.id !== selectedAlbum.id
    );
    setUserAlbums(updatedAlbums);

    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const owner = users.find((user: any) => user.isOwner);

      if (owner && owner.id === Number(userId)) {
        owner.albums = updatedAlbums;
        localStorage.setItem("users", JSON.stringify(users));
      }
    }

    toast.success("Album deleted successfully!");
    setIsDeleteModalOpen(false);
    setSelectedAlbum(null);
  };

  const handleRenameAlbum = () => {
    if (!selectedAlbum || !newAlbumName.trim()) return;

    const updatedAlbums = userAlbums.map((album) =>
      album.id === selectedAlbum.id ? { ...album, title: newAlbumName } : album
    );
    setUserAlbums(updatedAlbums);

    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const owner = users.find((user: any) => user.isOwner);

      if (owner && owner.id === Number(userId)) {
        owner.albums = updatedAlbums;
        localStorage.setItem("users", JSON.stringify(users));
      }
    }

    toast.success("Album renamed successfully!");
    setIsEditModalOpen(false);
    setSelectedAlbum(null);
    setNewAlbumName("");
  };

  const handleAlbumClick = async (albumId: number) => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const owner = users.find((user: any) => user.isOwner);
      console.log(owner);

      if (owner && owner.id === Number(userId)) {
        const album = owner.albums.find((album: any) => album.id === albumId);

        if (album) {
          navigate(`/albums/${album.id}/photos`, { state: { album } });
          return;
        }
      }
    }

    try {
      const albums = await albumService.getAlbum(Number(albumId));

      if (albums) {
        navigate(`/albums/${albums[0]?.albumId}/photos`, { state: { albums } });
      } else {
        console.error("Album not found");
      }
    } catch (error) {
      console.error("Failed to fetch album from API:", error);
    }
  };

  return (
    <div className="albums-page">
      <h1>User Albums</h1>
      <h2>User ID: {currentUserId}</h2>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="albums-grid">
        {userAlbums.length > 0 ? (
          userAlbums.map((album) => (
            <div
              key={album.id}
              className="album-card"
              onClick={() => handleAlbumClick(album.id)}
            >
              <div className="album-header">
                <h3>{album.title}</h3>
                {isOwner && (
                  <div className="album-actions">
                    <button
                      className="rename-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAlbum(album);
                        setNewAlbumName(album.title);
                        setIsEditModalOpen(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAlbum(album);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      ❌
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No albums found for this user.</p>
        )}
      </div>

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Album Name</h2>
            <input
              type="text"
              value={newAlbumName}
              onChange={(e) => setNewAlbumName(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleRenameAlbum}>Save</button>
              <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Are you sure?</h2>
            <div className="modal-actions">
              <button onClick={handleDeleteAlbum}>Yes, Delete</button>
              <button onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAlbumsPage;
