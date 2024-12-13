
import { Photo } from "@/interfaces/Photo";

export const photoRepository = {
  create: async (formData: FormData): Promise<Photo> => {
    try {
      const response = await fetch('http://localhost:5000/api/photos', {
        method: 'POST',
        body: formData
      });
      return response.json();
    } catch (error) {
      throw new Error('Failed to create photo');
    }
  },

  update: async (id: number, data: Partial<Photo>): Promise<Photo> => {
    try {
      const response = await fetch(`http://localhost:5000/api/photos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error) {
      throw new Error('Failed to update photo. Error: ' + error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await fetch(`http://localhost:5000/api/photos/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      throw new Error('Failed to delete photo');
    }
  },

  getById: async (id: number): Promise<Photo> => {
    try {
      const response = await fetch(`http://localhost:5000/api/photos/${id}`);
      return response.json();
    } catch (error) {
      throw new Error('Failed to fetch photo');
    }
  },

  getCurrentUserAlbums: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/albums');
      return response.json();
    } catch (error) {
      throw new Error('Failed to fetch albums');
    }
  }
};
