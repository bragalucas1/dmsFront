import { User } from "@/interfaces/User";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const UserRepository = {
  fetchUsers: async (): Promise<User[]> => {
    const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
    return response.data;
  },

  fetchUserAlbums: async (userId: string) => {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/albums`);
    return response.data;
  },

  fetchAlbumPhotos: async (albumId: string) => {
    const response = await axios.get(
      `${API_BASE_URL}/albums/${albumId}/photos`
    );
    return response.data;
  },
};
