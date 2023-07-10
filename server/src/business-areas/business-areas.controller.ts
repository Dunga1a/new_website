import {
  Controller,
  Get,
  Inject,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Put,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IBusinessAreasService } from './business-areas';

import { CreateBusinessAreaDto } from './dtos/business-areas.dto';

@Controller(Routes.BUSINESSAREAS)
export class BusinessAreasController {
  constructor(
    @Inject(Services.BUSINESSAREAS)
    private readonly businessAreasService: IBusinessAreasService,
  ) {}

  @Get('')
  async getAllBusinessAreas(@Query() queryParams: any) {
    const businessAreas = await this.businessAreasService.getAllBusinessAreas(
      queryParams,
    );
    return businessAreas;
  }

  @Get('getListBusinessArea')
  async getStaticBusinessAreas() {
    const businessAreaList =
      await this.businessAreasService.getStaticBusinessAreas();
    return businessAreaList;
  }

  @Get('getOneBusinessArea/:id')
  async getOneBusinessAreas(@Param('id', ParseIntPipe) id: number) {
    const businessArea = await this.businessAreasService.getOneBusinessAreas(
      id,
    );
    return businessArea;
  }

  @Post('')
  async createBusinessAreas(@Body() createBusinessDetails: any) {
    const createdBusinessArea =
      await this.businessAreasService.createBusinessAreas(
        createBusinessDetails,
      );
    return createdBusinessArea;
  }

  @Put('editOne')
  async editOneBusinessAreas(@Body() editBusinessDetails: any) {
    const updatedBusinessArea =
      await this.businessAreasService.editOneBusinessAreas(editBusinessDetails);
    return updatedBusinessArea;
  }

  @Put('updateStatusOn')
  async updateStatusOnManyBusinessArea(
    @Body() data: { ids: number[]; status: number },
  ) {
    const updatedBusinessAreaOnStatus =
      await this.businessAreasService.updateStatusOnManyBusinessArea(
        data.ids,
        data.status,
      );
    return updatedBusinessAreaOnStatus;
  }
}
