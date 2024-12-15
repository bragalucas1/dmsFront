import { User } from "@/interfaces/User";
import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const UserRepository = {
  fetchUsers: async (): Promise<User[]> => {
    const response = await axios.get<User[]>(`${API_URL}/users`);
    return response.data;
  },

  fetchUserAlbums: async (userId: string) => {
    const response = await axios.get(`${API_URL}/users/${userId}/albums`);
    return response.data;
  },

  fetchAlbumPhotos: async (albumId: string) => {
    const response = await axios.get(`${API_URL}/albums/${albumId}/photos`);
    return response.data;
  },
};
