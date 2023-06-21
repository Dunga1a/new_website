import {
  Controller,
  Get,
  Inject,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IOrganizeMembershipTitleService } from './organize-membership-title';
import {
  CreateOrganizationsDto,
  editOrganizationsDto,
} from './dtos/organize-membership-title.dto';

@Controller(Routes.ORGANIZE)
export class OrganizeMembershipTitleController {
  constructor(
    @Inject(Services.ORGANIZE)
    private readonly organizeMemberService: IOrganizeMembershipTitleService,
  ) {}

  @Get('')
  async getAllOrganizations(@Query() queryParams: any) {
    const organizations = await this.organizeMemberService.getAllOrganizations(
      queryParams,
    );
    return organizations;
  }

  @Post('')
  async createOrganizations(
    @Body() createOrganizationsDetails: CreateOrganizationsDto,
  ) {
    const createdOrganizations =
      await this.organizeMemberService.createOrganizations(
        createOrganizationsDetails,
      );
    return createdOrganizations;
  }

  @Put('editOne')
  async editOrganizations(
    @Body() editOrganizationsDetails: editOrganizationsDto,
  ) {
    const updatedOrganization =
      await this.organizeMemberService.editOrganizations(
        editOrganizationsDetails,
      );
    return updatedOrganization;
  }

  @Put('updateStatusOn')
  async updateStatusOnManyOrganize(
    @Body() data: { ids: number[]; status: number },
  ) {
    const updateStatusOnOrganize =
      await this.organizeMemberService.updateStatusOnManyOrganize(
        data.ids,
        data.status,
      );
    return updateStatusOnOrganize;
  }

  @Delete('deletedManyOrganize')
  async deleteManyNewsCategory(@Body() ids: number[]) {
    const result = await this.organizeMemberService.deleteManyOrganize(ids);
    return result;
  }
}
