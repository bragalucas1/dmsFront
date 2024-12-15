import { Album } from "@/interfaces/Album";
import { albumRepository } from "repositories/AlbumRepository/AlbumsRepository";

export const albumService = {
  async getAlbum(userId: number): Promise<Album[]> {
    try {
      return await albumRepository.getById(userId);
    } catch (error) {
      console.error("Error in album service - get:", error);
      throw error;
    }
  },

  async getUsersAlbumsByUserId(userId: number): Promise<Album[]> {
    try {
      return await albumRepository.getUsersAlbumsByUserId(userId);
    } catch (error) {
      console.error("Error in album service - getUsersAlbumsByUserId:", error);
      throw error;
    }
  },

  getAllAlbums: async () => {
    try {
      return await albumRepository.getAll();
    } catch (error) {
      console.error("Error in album service - getAll:", error);
      throw error;
    }
  },
};
