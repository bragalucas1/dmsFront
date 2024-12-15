import axios from "axios";
import { Photo } from "@/interfaces/Photo";
import { photoRepository } from "../PhotosRepository";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("photoRepository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getById", () => {
    it("should fetch photos by album ID and return data", async () => {
      const mockPhotos: Photo[] = [
        {
          id: 1,
          albumId: 1,
          title: "Photo 1",
          url: "http://example.com/1",
          thumbnailUrl: "http://example.com/thumb1",
        },
      ];
      mockedAxios.get.mockResolvedValueOnce({
        data: mockPhotos,
        status: 200,
        statusText: "OK",
        headers: {},
        config: { url: "http://localhost:3001/api/photos/albums/1/photos" },
      });

      const result = await photoRepository.getById(1);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:3001/api/photos/albums/1/photos"
      );
      expect(result).toEqual(mockPhotos);
    });

    it("should throw an error if fetching fails", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

      await expect(photoRepository.getById(1)).rejects.toThrow(
        "Failed to fetch photo: Network error"
      );
    });
  });

  describe("getCurrentUserAlbums", () => {
    it("should fetch albums of the current user and return data", async () => {
      const mockAlbums = [
        { id: 1, title: "Album 1" },
        { id: 2, title: "Album 2" },
      ];
      mockedAxios.get.mockResolvedValueOnce({
        data: mockAlbums,
        status: 200,
        statusText: "OK",
        headers: {},
        config: { url: "http://localhost:3001/api/albums" },
      });

      const result = await photoRepository.getCurrentUserAlbums();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:3001/api/albums"
      );
      expect(result).toEqual(mockAlbums);
    });

    it("should throw an error if fetching albums fails", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

      await expect(photoRepository.getCurrentUserAlbums()).rejects.toThrow(
        "Failed to fetch albums: Network error"
      );
    });
  });
});
