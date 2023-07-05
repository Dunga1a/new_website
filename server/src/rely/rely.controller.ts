import { Controller, Inject, Body, Post } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IRelyService } from './rely';
import { ReplyDto } from './dtos/Rely.dtos';
import { Reply } from 'src/utils/typeorm';
@Controller(Routes.RELY)
export class RelyController {
  constructor(
    @Inject(Services.RELY) private readonly relyService: IRelyService,
  ) {}

  @Post()
  createRely(@Body() relyDto: ReplyDto): Promise<Reply> {
    //console.log(relyDto);

    return this.relyService.createRely(relyDto);
  }
}
