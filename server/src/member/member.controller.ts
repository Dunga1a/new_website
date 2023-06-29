import {
  Controller,
  Param,
  Inject,
  Body,
  Post,
  Get,
  Put,
  ParseIntPipe,
  Query,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IMemberService } from './member';
import { CreateMemberDto } from './dtos/member.dto';
import { EmailService } from './email.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller(Routes.MEMBER)
export class MemberController {
  constructor(
    @Inject(Services.MEMBER) private readonly memberService: IMemberService,
    @Inject(EmailService) private readonly emailService: EmailService,
  ) {}

  @Post('createMember')
  async createMember(@Body() memberDetails: any) {
    const savedMember = await this.memberService.createMember(memberDetails);
    return savedMember;
  }

  @Post('uploadFileImage')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: '../client/public/uploads',
        filename: (req, file, callback) => {
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 4).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { imageUrl: file.filename };
  }

  @Post('uploadMultipleImages')
  @UseInterceptors(
    FilesInterceptor('images', null, {
      storage: diskStorage({
        destination: '../client/public/uploads',
        filename: (req, file, callback) => {
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 4).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadMultipleImages(@UploadedFiles() files: Express.Multer.File[]) {
    const imageUrls = await files.map((file) => {
      return { imageUrl: file.filename };
    });
    return imageUrls;
  }

  @Get()
  async getAllMembers(@Query() queryParams: any) {
    const memberList = await this.memberService.getAllMembers(queryParams);
    return memberList;
  }

  @Get('getMemberByRole')
  async getMemberByRole(@Query() queryParams: any) {
    const memberList = await this.memberService.getMemberByRole(queryParams);
    return memberList;
  }

  @Post('sendEmail')
  async sendEmail(@Body() sendEmailDetail: any) {
    await this.emailService.sendEmail(sendEmailDetail);
    return 'Email sent.';
  }

  @Get(':idMember')
  async getOneEvent(@Param('idMember', ParseIntPipe) idMember: number) {
    const eventOne = await this.memberService.getOneMember(idMember);
    return eventOne;
  }

  @Post('createUserFromMember')
  async confirmOneMember(@Body() userMemberDetails: any) {
    const result = await this.memberService.confirmOneMember(userMemberDetails);

    return result;
  }
  @Put('updateMember')
  async editMember(@Body() memberEditDetails: CreateMemberDto) {
    const updatedMember = await this.memberService.editMember(
      memberEditDetails,
    );

    return updatedMember;
  }
  @Put(':idMember')
  async setStatusMember(@Param('idMember', ParseIntPipe) idMember: number) {
    const result = await this.memberService.setStatusMember(idMember);
    return result;
  }

  @Delete('deleteManyMember')
  async deleteManyMember(@Body() deletedManyMember: number[]) {
    const result = await this.memberService.deleteManyMember(deletedManyMember);
    return result;
  }

  @Delete(':idMember')
  async deleteOneMember(@Param('idMember', ParseIntPipe) idMember: number) {
    const deletedMember = await this.memberService.deleteOneMember(idMember);
    return deletedMember;
  }

  @Post('checkError')
  async checkError(@Body() errorDetails: any) {
    const result = await this.memberService.checkError(errorDetails);
    return result;
  }
}
