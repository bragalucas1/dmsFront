import { Photo } from "./Photo";

export interface Album {
  id: number;
  title: string;
  userId: number;
  albumId?: number;
  photos: Photo[];
}
