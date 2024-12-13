import { Album } from "@/interfaces/Album";
import { albumRepository } from "@/repositories/AlbumRepository.tsx/AlbumsRepository";

export const albumService = {
  createAlbum: async (albumData: Partial<Album>) => {
    try {
      return await albumRepository.create(albumData);
    } catch (error) {
      console.error('Error in album service - create:', error);
      throw error;
    }
  },

  updateAlbum: async (id: number, albumData: Partial<Album>) => {
    try {
      return await albumRepository.update(id, albumData);
    } catch (error) {
      console.error('Error in album service - update:', error);
      throw error;
    }
  },

  deleteAlbum: async (id: number) => {
    try {
      await albumRepository.delete(id);
    } catch (error) {
      console.error('Error in album service - delete:', error);
      throw error;
    }
  },

  getAlbum: async (id: number) => {
    try {
      return await albumRepository.getById(id);
    } catch (error) {
      console.error('Error in album service - get:', error);
      throw error;
    }
  },

  getAllAlbums: async () => {
    try {
      return await albumRepository.getAll();
    } catch (error) {
      console.error('Error in album service - getAll:', error);
      throw error;
    }
  },
};