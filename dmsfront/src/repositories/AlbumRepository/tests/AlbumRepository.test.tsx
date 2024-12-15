import { albumRepository } from "../AlbumsRepository";

global.fetch = jest.fn();

describe("albumRepository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getById", () => {
    it("should fetch album by id and return data", async () => {
      const mockAlbum = [{ id: 1, title: "Album 1" }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockAlbum),
      });

      const result = await albumRepository.getById(1);

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/albums/1/photos"
      );
      expect(result).toEqual(mockAlbum);
    });

    it("should throw an error if fetch fails", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(albumRepository.getById(1)).rejects.toThrow(
        "Failed to fetch album"
      );
    });
  });

  describe("getUsersAlbumsByUserId", () => {
    it("should fetch user albums by userId and return data", async () => {
      const mockUserAlbums = [{ id: 1, title: "User Album 1" }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockUserAlbums),
      });

      const result = await albumRepository.getUsersAlbumsByUserId(1);

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/albums/users/1"
      );
      expect(result).toEqual(mockUserAlbums);
    });

    it("should throw an error if fetch fails", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(albumRepository.getUsersAlbumsByUserId(1)).rejects.toThrow(
        "Failed to fetch user albums"
      );
    });
  });

  describe("getAll", () => {
    it("should fetch all albums and return data", async () => {
      const mockAlbums = [
        { id: 1, title: "Album 1" },
        { id: 2, title: "Album 2" },
      ];
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockAlbums),
      });

      const result = await albumRepository.getAll();

      expect(fetch).toHaveBeenCalledWith("http://localhost:3001/api/albums");
      expect(result).toEqual(mockAlbums);
    });

    it("should throw an error if fetch fails", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(albumRepository.getAll()).rejects.toThrow(
        "Failed to fetch albums"
      );
    });
  });
});
