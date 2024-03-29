import {TagModel} from "./TagModel";

export interface ImageModel {
  id: number | null;
  imageData: string | null;
  imageThumbnail: string | null;
  name: string | null;
  description: string | null;
  uploadDate: any;
  tags: TagModel[];
}
