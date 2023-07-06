import { Services } from 'src/utils/constants';
import { Module } from '@nestjs/common';
import { Image } from 'src/utils/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],

  controllers: [ImageController],
  providers: [
    {
      provide: Services.IMAGE,
      useClass: ImageService,
    },
  ],
  exports: [
    {
      provide: Services.IMAGE,
      useClass: ImageService,
    },
  ],
})
export class ImageModule {}
