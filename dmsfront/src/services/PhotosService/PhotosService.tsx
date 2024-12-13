// src/services/PhotoService.ts

import { Photo } from "@/interfaces/Photo";
import { photoRepository } from "repositories/PhotosRepository.jsx/PhotosRepository";


export const photoService = {
  createPhoto: async (formData: FormData) => {
    try {
      return await photoRepository.create(formData);
    } catch (error) {
      console.error('Error in photo service - create:', error);
      throw error;
    }
  },

  updatePhoto: async (id: number, data: Partial<Photo>) => {
    try {
      return await photoRepository.update(id, data);
    } catch (error) {
      console.error('Error in photo service - update:', error);
      throw error;
    }
  },

  deletePhoto: async (id: number) => {
    try {
      await photoRepository.delete(id);
    } catch (error) {
      console.error('Error in photo service - delete:', error);
      throw error;
    }
  },

  getPhoto: async (id: number) => {
    try {
      return await photoRepository.getById(id);
    } catch (error) {
      console.error('Error in photo service - get:', error);
      throw error;
    }
  },
  getCurrentUserAlbums: async () => {
    try {
      return await photoRepository.getCurrentUserAlbums();
    } catch (error) {
      console.error('Error in photo service - getCurrentUserAlbums:', error);
      throw error;
    }
  },
};
