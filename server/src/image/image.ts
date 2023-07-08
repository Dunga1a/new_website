import { Image } from '../utils/typeorm';

export interface IImageService {
  saveImage(file: Express.Multer.File): Promise<Image>;
}
