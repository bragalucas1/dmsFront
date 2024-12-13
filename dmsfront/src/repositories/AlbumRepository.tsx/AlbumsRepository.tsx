import { Album } from "@/interfaces/Album";

export const albumRepository = {
  create: async (albumData: Partial<Album>): Promise<Album> => {
    try {
      const response = await fetch('http://localhost:5000/api/albums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(albumData),
      });
      return response.json();
    } catch (error) {
      throw new Error('Failed to create album');
    }
  },

  update: async (id: number, albumData: Partial<Album>): Promise<Album> => {
    try {
      const response = await fetch(`http://localhost:5000/api/albums/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(albumData),
      });
      return response.json();
    } catch (error) {
      throw new Error('Failed to update album');
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await fetch(`http://localhost:5000/api/albums/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw new Error('Failed to delete album');
    }
  },

  getById: async (id: number): Promise<Album> => {
    try {
      const response = await fetch(`http://localhost:5000/api/albums/${id}`);
      return response.json();
    } catch (error) {
      throw new Error('Failed to fetch album');
    }
  },

  getAll: async (): Promise<Album[]> => {
    try {
      const response = await fetch('http://localhost:5000/api/albums');
      return response.json();
    } catch (error) {
      throw new Error('Failed to fetch albums');
    }
  },
};

