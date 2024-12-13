import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Album } from '@/interfaces/Album';

const mockAlbums: Album[] = [
  { id: 1, userId: 1, title: 'Vacation Photos 2023' },
  { id: 2, userId: 1, title: 'Work Events' },
  { id: 3, userId: 1, title: 'Family Gatherings' },
  { id: 4, userId: 2, title: 'Birthday Party' }
];

const UserAlbumsPage: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  // Garante que userId seja um número válido ou use 1 como padrão
  const currentUserId = userId ? parseInt(userId) : 1;

  console.log('userId from params:', userId);
  console.log('currentUserId:', currentUserId);
  console.log('mockAlbums:', mockAlbums);

  const userAlbums = mockAlbums.filter(album => album.userId === currentUserId);

  console.log('filtered albums:', userAlbums);

  return (
    <div className="albums-page">
      <h1>User Albums</h1>
      <h2>User ID: {currentUserId}</h2>
      <div className="albums-grid">
        {userAlbums.map(album => (
          <div 
            key={album.id}
            className="album-card"
            onClick={() => navigate(`/albums/${album.id}/photos`)}
          >
            <h3>{album.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAlbumsPage;