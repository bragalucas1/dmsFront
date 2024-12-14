import {
  fetchAlbumPhotos,
  fetchUserAlbums,
  fetchUsers,
} from "repositories/UserRepository/UserRepository";

import { User } from "@/interfaces/User";

export const getUsers = async () => {
  try {
    const users = await fetchUsers();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserAlbums = async (userId: string) => {
  try {
    const albums = await fetchUserAlbums(userId);
    return albums;
  } catch (error) {
    console.error("Error fetching user albums:", error);
    throw error;
  }
};

export const getAlbumPhotos = async (albumId: string) => {
  try {
    const photos = await fetchAlbumPhotos(albumId);
    return photos;
  } catch (error) {
    console.error("Error fetching album photos:", error);
    throw error;
  }
};

export const createUser = async () => {
  try {
    const user: User = await createUser();
    return user;
  } catch (error) {
    console.error("Error while attempting to create user:", error);
    throw error;
  }
};
