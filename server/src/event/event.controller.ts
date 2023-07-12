import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IEventService } from './event';
import { CreateEventDto } from './dtos/event.dto';
import { EditEventDetails } from 'src/utils/types';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller(Routes.EVENT)
export class EventController {
  constructor(
    @Inject(Services.EVENT) private readonly eventService: IEventService,
  ) {}

  @Post('pdfs')
  @UseInterceptors(
    FilesInterceptor('pdfs', null, {
      storage: diskStorage({
        destination: '../client/public/uploads/pdf', // Đường dẫn thư mục lưu trữ file
        filename: (req, file, callback) => {
          const randomName = Date.now();
          const originalName = file.originalname;
          // const extension = extname(originalName);
          const fileName = randomName + '-' + originalName;
          // const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, fileName); // Tên file được lưu
        },
      }),
      limits: {
        fileSize: 100 * 1024 * 1024,
        fieldSize: 100 * 1024 * 1024,
      },
    }),
  )
  async uploadPDFs(@UploadedFiles() files: Express.Multer.File[]) {
    const pdfList = await files.map((file) => {
      return file.filename;
    });
    return pdfList;
  }

  @Post('createEvent')
  async createEvent(@Body() eventDetails: CreateEventDto) {
    const savedEvent = await this.eventService.createNewEvent(eventDetails);
    return savedEvent;
  }

  @Get('getAllEvent')
  async getAllEvent(@Query() queryParams: any) {
    const eventList = await this.eventService.getAllEvent(queryParams);
    return eventList;
  }

  @Get(':idEvent')
  async getOneEvent(@Param('idEvent', ParseIntPipe) idEvent: number) {
    const eventOne = await this.eventService.getOneEvent(idEvent);
    return eventOne;
  }

  @Get('latestEvent')
  async getLatestEvent() {
    return this.eventService.getLastestEvent();
  }

  @Post('editEvent')
  async editEvent(@Body() editEventDetails: EditEventDetails) {
    const result = await this.eventService.editEvent(editEventDetails);
    return result;
  }

  @Delete('deletedManyEvent')
  async deletedManyEvent(@Body() deletedManyEvent: number[]) {
    const result = await this.eventService.deletedManyEvent(deletedManyEvent);
    return result;
  }

  @Delete(':id')
  async deletedEvent(@Param('id', ParseIntPipe) idEvent: number) {
    const result = await this.eventService.deletedEvent(idEvent);
    return result;
  }
}
