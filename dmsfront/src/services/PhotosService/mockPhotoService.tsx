export const mockPhotoService = {
  photos: [
    {
      id: 1,
      title: "Photo 1",
      url: "https://via.placeholder.com/150",
      albumId: 1,
    },
    {
      id: 2,
      title: "Photo 2",
      url: "https://via.placeholder.com/150",
      albumId: 1,
    },
  ],

  albums: [
    {
      id: 1,
      title: "Album 1",
      userId: 1,
    },
    {
      id: 2,
      title: "Album 2",
      userId: 1,
    },
  ],

  async getPhotos() {
    return this.photos;
  },

  async getAlbums() {
    return this.albums;
  },

  async updatePhoto(id: number, data: { title: string }) {
    const photoIndex = this.photos.findIndex((photo) => photo.id === id);
    if (photoIndex !== -1) {
      this.photos[photoIndex] = { ...this.photos[photoIndex], ...data };
      return this.photos[photoIndex];
    }
    throw new Error("Photo not found");
  },

  async deletePhoto(id: number) {
    const photoIndex = this.photos.findIndex((photo) => photo.id === id);
    if (photoIndex !== -1) {
      this.photos.splice(photoIndex, 1);
      return true;
    }
    throw new Error("Photo not found");
  },

  async createPhoto(data: FormData) {
    const newPhoto = {
      id: this.photos.length + 1,
      title: data.get("title") as string,
      url: "https://via.placeholder.com/150",
      albumId: Number(data.get("albumId")) || 1,
    };
    this.photos.push(newPhoto);
    return newPhoto;
  },
};
