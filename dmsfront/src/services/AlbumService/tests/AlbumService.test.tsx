import { albumRepository } from "@/repositories/AlbumRepository/AlbumsRepository";
import { albumService } from "../AlbumService";
import { Album } from "@/interfaces/Album";

jest.mock("@/repositories/AlbumRepository/AlbumsRepository", () => ({
  albumRepository: {
    getById: jest.fn(),
    getUsersAlbumsByUserId: jest.fn(),
    getAll: jest.fn(),
  },
}));

const mockedAlbumRepository = albumRepository as jest.Mocked<
  typeof albumRepository
>;

describe("AlbumService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAlbum", () => {
    it("should fetch an album by user ID", async () => {
      const mockAlbums: Album[] = [
        { id: 1, title: "Album 1", userId: 1, photos: [] },
        { id: 2, title: "Album 2", userId: 1, photos: [] },
      ];

      mockedAlbumRepository.getById.mockResolvedValueOnce(mockAlbums);

      const result = await albumService.getAlbum(1);

      expect(mockedAlbumRepository.getById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockAlbums);
    });

    it("should throw an error if fetching an album fails", async () => {
      mockedAlbumRepository.getById.mockRejectedValueOnce(
        new Error("Repository Error")
      );

      await expect(albumService.getAlbum(1)).rejects.toThrow(
        "Repository Error"
      );
      expect(mockedAlbumRepository.getById).toHaveBeenCalledWith(1);
    });
  });

  describe("getUsersAlbumsByUserId", () => {
    it("should fetch albums for a user by user ID", async () => {
      const mockAlbums: Album[] = [
        { id: 3, title: "User Album 1", userId: 2, photos: [] },
        { id: 4, title: "User Album 2", userId: 2, photos: [] },
      ];

      mockedAlbumRepository.getUsersAlbumsByUserId.mockResolvedValueOnce(
        mockAlbums
      );

      const result = await albumService.getUsersAlbumsByUserId(2);

      expect(mockedAlbumRepository.getUsersAlbumsByUserId).toHaveBeenCalledWith(
        2
      );
      expect(result).toEqual(mockAlbums);
    });

    it("should throw an error if fetching user albums fails", async () => {
      mockedAlbumRepository.getUsersAlbumsByUserId.mockRejectedValueOnce(
        new Error("Repository Error")
      );

      await expect(albumService.getUsersAlbumsByUserId(2)).rejects.toThrow(
        "Repository Error"
      );
      expect(mockedAlbumRepository.getUsersAlbumsByUserId).toHaveBeenCalledWith(
        2
      );
    });
  });

  describe("getAllAlbums", () => {
    it("should fetch all albums", async () => {
      const mockAlbums: Album[] = [
        { id: 1, title: "Album 1", userId: 1, photos: [] },
        { id: 2, title: "Album 2", userId: 2, photos: [] },
      ];

      mockedAlbumRepository.getAll.mockResolvedValueOnce(mockAlbums);

      const result = await albumService.getAllAlbums();

      expect(mockedAlbumRepository.getAll).toHaveBeenCalled();
      expect(result).toEqual(mockAlbums);
    });

    it("should throw an error if fetching all albums fails", async () => {
      mockedAlbumRepository.getAll.mockRejectedValueOnce(
        new Error("Repository Error")
      );

      await expect(albumService.getAllAlbums()).rejects.toThrow(
        "Repository Error"
      );
      expect(mockedAlbumRepository.getAll).toHaveBeenCalled();
    });
  });
});
