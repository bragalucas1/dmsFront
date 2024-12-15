import { UserRepository } from "../UserRepository";
import axios from "axios";
import { User } from "@/interfaces/User";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UserRepository", () => {
  describe("fetchUsers", () => {
    it("should fetch users successfully", async () => {
      const users: User[] = [
        { id: 1, name: "John Doe", email: "john.doe@example.com" },
      ];
      mockedAxios.get.mockResolvedValue({
        data: users,
        status: 200,
        statusText: "OK",
        headers: {},
        config: { url: "http://localhost:3001/api/users" },
      });

      const result = await UserRepository.fetchUsers();
      expect(result).toEqual(users);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:3001/api/users"
      );
    });

    it("should handle fetch users error", async () => {
      mockedAxios.get.mockRejectedValue(new Error("Network Error"));

      await expect(UserRepository.fetchUsers()).rejects.toThrow(
        "Network Error"
      );
    });
  });

  describe("fetchUserAlbums", () => {
    it("should fetch user albums successfully", async () => {
      const albums = [{ id: "1", title: "Album 1" }];
      mockedAxios.get.mockResolvedValue({
        data: albums,
        status: 200,
        statusText: "OK",
        headers: {},
        config: { url: "http://localhost:3001/api/users/1/albums" },
      });

      const result = await UserRepository.fetchUserAlbums("1");
      expect(result).toEqual(albums);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:3001/api/users/1/albums"
      );
    });
    it("should handle fetch user albums error", async () => {
      mockedAxios.get.mockRejectedValue(new Error("Network Error"));

      await expect(UserRepository.fetchUserAlbums("1")).rejects.toThrow(
        "Network Error"
      );
    });
  });

  describe("fetchAlbumPhotos", () => {
    it("should fetch album photos successfully", async () => {
      const photos = [{ id: "1", url: "http://example.com/photo1.jpg" }];
      mockedAxios.get.mockResolvedValue({
        data: photos,
        status: 200,
        statusText: "OK",
        headers: {},
        config: { url: "http://localhost:3001/api/albums/1/photos" },
      });

      const result = await UserRepository.fetchAlbumPhotos("1");
      expect(result).toEqual(photos);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:3001/api/albums/1/photos"
      );
    });

    it("should handle fetch album photos error", async () => {
      mockedAxios.get.mockRejectedValue(new Error("Network Error"));

      await expect(UserRepository.fetchAlbumPhotos("1")).rejects.toThrow(
        "Network Error"
      );
    });
  });
});
