import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import UsersPage from '../pages/MyUsers/index';
import UserAlbumsPage from '../pages/UserAlbums/index';
import AlbumPhotosPage from '../pages/AlbumPhotos/index';
import UploadPhotoPage from '../pages/PhotosUpload/index';
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<UsersPage />} />
        <Route path="users/:userId/albums" element={<UserAlbumsPage />} />
        <Route path="albums/:albumId/photos" element={<AlbumPhotosPage />} />
        <Route path="upload" element={<UploadPhotoPage />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
