import { getUsers, getUserAlbums, getAlbumPhotos, createUser } from "../UserService";
import { UserRepository } from "@/repositories/UserRepository/UserRepository";

jest.mock("@/repositories/UserRepository/UserRepository");

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    it("should fetch and return users", async () => {
      const mockUsers = [{ id: 1, name: "John Doe" }];
      (UserRepository.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

      const users = await getUsers();

      expect(users).toEqual(mockUsers);
      expect(UserRepository.fetchUsers).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if fetching users fails", async () => {
      const mockError = new Error("Failed to fetch users");
      (UserRepository.fetchUsers as jest.Mock).mockRejectedValue(mockError);

      await expect(getUsers()).rejects.toThrow(mockError);
      expect(UserRepository.fetchUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe("getUserAlbums", () => {
    it("should fetch and return user albums", async () => {
      const mockAlbums = [{ id: 1, title: "Album 1" }];
      (UserRepository.fetchUserAlbums as jest.Mock).mockResolvedValue(mockAlbums);

      const albums = await getUserAlbums("1");

      expect(albums).toEqual(mockAlbums);
      expect(UserRepository.fetchUserAlbums).toHaveBeenCalledTimes(1);
      expect(UserRepository.fetchUserAlbums).toHaveBeenCalledWith("1");
    });

    it("should throw an error if fetching user albums fails", async () => {
      const mockError = new Error("Failed to fetch user albums");
      (UserRepository.fetchUserAlbums as jest.Mock).mockRejectedValue(mockError);

      await expect(getUserAlbums("1")).rejects.toThrow(mockError);
      expect(UserRepository.fetchUserAlbums).toHaveBeenCalledTimes(1);
      expect(UserRepository.fetchUserAlbums).toHaveBeenCalledWith("1");
    });
  });

  describe("getAlbumPhotos", () => {
    it("should fetch and return album photos", async () => {
      const mockPhotos = [{ id: 1, url: "photo1.jpg" }];
      (UserRepository.fetchAlbumPhotos as jest.Mock).mockResolvedValue(mockPhotos);

      const photos = await getAlbumPhotos("1");

      expect(photos).toEqual(mockPhotos);
      expect(UserRepository.fetchAlbumPhotos).toHaveBeenCalledTimes(1);
      expect(UserRepository.fetchAlbumPhotos).toHaveBeenCalledWith("1");
    });

    it("should throw an error if fetching album photos fails", async () => {
      const mockError = new Error("Failed to fetch album photos");
      (UserRepository.fetchAlbumPhotos as jest.Mock).mockRejectedValue(mockError);

      await expect(getAlbumPhotos("1")).rejects.toThrow(mockError);
      expect(UserRepository.fetchAlbumPhotos).toHaveBeenCalledTimes(1);
      expect(UserRepository.fetchAlbumPhotos).toHaveBeenCalledWith("1");
    });
  });
});