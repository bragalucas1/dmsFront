import { photoService } from "../PhotosService";
import { photoRepository } from "@/repositories/PhotosRepository/PhotosRepository";

jest.mock("@/repositories/PhotosRepository/PhotosRepository");

describe("photoService", () => {
  describe("getPhotos", () => {
    it("should return photos when repository call is successful", async () => {
      const mockPhotos = [{ id: 1, title: "Photo 1" }];
      (photoRepository.getById as jest.Mock).mockResolvedValue(mockPhotos);

      const result = await photoService.getPhotos(1);

      expect(result).toEqual(mockPhotos);
      expect(photoRepository.getById).toHaveBeenCalledWith(1);
    });

    it("should throw an error when repository call fails", async () => {
      const mockError = new Error("Repository error");
      (photoRepository.getById as jest.Mock).mockRejectedValue(mockError);

      await expect(photoService.getPhotos(1)).rejects.toThrow("Repository error");
      expect(photoRepository.getById).toHaveBeenCalledWith(1);
    });
  });

  describe("getCurrentUserAlbums", () => {
    it("should return albums when repository call is successful", async () => {
      const mockAlbums = [{ id: 1, title: "Album 1" }];
      (photoRepository.getCurrentUserAlbums as jest.Mock).mockResolvedValue(mockAlbums);

      const result = await photoService.getCurrentUserAlbums();

      expect(result).toEqual(mockAlbums);
      expect(photoRepository.getCurrentUserAlbums).toHaveBeenCalled();
    });

    it("should throw an error when repository call fails", async () => {
      const mockError = new Error("Repository error");
      (photoRepository.getCurrentUserAlbums as jest.Mock).mockRejectedValue(mockError);

      await expect(photoService.getCurrentUserAlbums()).rejects.toThrow("Repository error");
      expect(photoRepository.getCurrentUserAlbums).toHaveBeenCalled();
    });
  });
});