import { Album } from "@/interfaces/Album";

const API_BASE_URL = "http://localhost:3001/api";

export const albumRepository = {
  getById: async (id: number): Promise<Album[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/albums/${id}/photos`);
      return response.json();
    } catch (error) {
      throw new Error("Failed to fetch album");
    }
  },

  getUsersAlbumsByUserId: async (userId: number): Promise<Album[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/albums/users/${userId}`);
      return response.json();
    } catch (error) {
      throw new Error("Failed to fetch user albums");
    }
  },

  getAll: async (): Promise<Album[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/albums`);
      return response.json();
    } catch (error) {
      throw new Error("Failed to fetch albums");
    }
  },
};
