/*
https://docs.nestjs.com/providers#services
*/
import { Injectable } from '@nestjs/common';
import { IImageService } from './image';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from 'src/utils/typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImageService implements IImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}
  async saveImage(file: Express.Multer.File): Promise<Image> {
    const { originalname, buffer } = file;

    const filename = `${uuidv4()}_${originalname}`;
    const filePath = path.join(__dirname, '../../uploads', filename);

    fs.writeFileSync(filePath, buffer);

    const image = new Image();
    image.filename = filename;
    const saveImage = await this.imageRepository.save(image);
    return saveImage;
  }
}
