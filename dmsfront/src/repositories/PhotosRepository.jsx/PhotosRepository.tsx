import axios from "axios";
import { Photo } from "@/interfaces/Photo";

const API_URL = "http://localhost:3001/api";

export const photoRepository = {
  create: async (formData: FormData): Promise<Photo> => {
    try {
      const response = await axios.post(`${API_URL}/photos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data as Photo;
    } catch (error: any) {
      throw new Error(`Failed to create photo: ${error.message}`);
    }
  },

  update: async (id: number, data: Partial<Photo>): Promise<Photo> => {
    try {
      const response = await axios.put(`${API_URL}/photos/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data as Photo;
    } catch (error: any) {
      throw new Error(`Failed to update photo. Error: ${error.message}`);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/photos/${id}`);
    } catch (error: any) {
      throw new Error(`Failed to delete photo: ${error.message}`);
    }
  },

  getById: async (id: number): Promise<Photo[]> => {
    try {
      const response = await axios.get(`${API_URL}/photos/albums/${id}/photos`);
      return response.data as Photo[];
    } catch (error: any) {
      throw new Error(`Failed to fetch photo: ${error.message}`);
    }
  },

  getCurrentUserAlbums: async () => {
    try {
      const response = await axios.get(`${API_URL}/albums`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch albums: ${error.message}`);
    }
  },
};
