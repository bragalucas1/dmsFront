import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Photo } from '@/interfaces/Photo';

const mockPhotos: Photo[] = [
  {
    id: 1,
    albumId: 1,
    title: 'Beach Sunset',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952'
  },
  {
    id: 2,
    albumId: 1,
    title: 'Mountain View',
    url: 'https://via.placeholder.com/600/771796',
    thumbnailUrl: 'https://via.placeholder.com/150/771796'
  },
  {
    id: 3,
    albumId: 1,
    title: 'City Lights',
    url: 'https://via.placeholder.com/600/24f355',
    thumbnailUrl: 'https://via.placeholder.com/150/24f355'
  },
  {
    id: 4,
    albumId: 2,
    title: 'Office Meeting',
    url: 'https://via.placeholder.com/600/d32776',
    thumbnailUrl: 'https://via.placeholder.com/150/d32776'
  }
];

const AlbumPhotosPage: React.FC = () => {
  const { albumId } = useParams();

  const albumPhotos = mockPhotos.filter(
    photo => photo.albumId === Number(albumId)
  );

  return (
    <div className="photos-page">
      <h1>Album Photos</h1>
      <div className="photos-grid">
        {albumPhotos.map(photo => (
          <div key={photo.id} className="photo-card">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <h3>{photo.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumPhotosPage;
