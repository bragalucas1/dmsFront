import axios from "axios";
import { Photo } from "@/interfaces/Photo";

const API_URL = "http://localhost:3001/api";

export const photoRepository = {
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