import { fetchUsers, fetchAlbumPhotos, fetchUserAlbums } from '../../services/UserService/UserService';

export const getUsers = async () => {
  try {
    const users = await fetchUsers();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserAlbums = async (userId: string) => {
  try {
    const albums = await fetchUserAlbums(userId);
    return albums;
  } catch (error) {
    console.error('Error fetching user albums:', error);
    throw error;
  }
};

export const getAlbumPhotos = async (albumId: string) => {
  try {
    const photos = await fetchAlbumPhotos(albumId);
    return photos;
  } catch (error) {
    console.error('Error fetching album photos:', error);
    throw error;
  }
};
