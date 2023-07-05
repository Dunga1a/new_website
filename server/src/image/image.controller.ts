/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Res, Inject } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { Response } from 'express';
import { IImageService } from './image';
import * as path from 'path';

@Controller(Routes.IMAGE)
export class ImageController {
  constructor(
    @Inject(Services.IMAGE) private readonly imageService: IImageService,
  ) {}

  @Get('/:filename')
  getImage(@Param('filename') filename: string, @Res() res: Response) {
    const imagePath = path.join(__dirname, '../../uploads', filename);
    res.sendFile(imagePath);
  }
}
