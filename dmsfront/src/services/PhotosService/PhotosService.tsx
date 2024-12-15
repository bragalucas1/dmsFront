// src/services/PhotoService.ts

import { Photo } from "@/interfaces/Photo";
import { photoRepository } from "@/repositories/PhotosRepository/PhotosRepository";

export const photoService = {
  getPhotos: async (id: number): Promise<Photo[]> => {
    try {
      return await photoRepository.getById(id);
    } catch (error) {
      console.error("Error in photo service - get:", error);
      throw error;
    }
  },

  getCurrentUserAlbums: async () => {
    try {
      return await photoRepository.getCurrentUserAlbums();
    } catch (error) {
      console.error("Error in photo service - getCurrentUserAlbums:", error);
      throw error;
    }
  },
};
