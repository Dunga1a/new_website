import {
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Body,
  Post,
} from '@nestjs/common';
import { Routes, Services } from '../utils/constants';
import { IUserService } from './users';
import { User } from 'src/utils/typeorm';
import { editUser } from 'src/utils/types';

import { UserEmail } from './dtos/UserProfile.dto';

import { randomBytes } from 'crypto';
import { ChangeEmailDto } from './dtos/ChangeEmail.dto';
import { ConfirmEmailDto } from './dtos/ConfirmEmail.dto';
import { MailService } from 'src/mail/mail.service';
import { ChangePassword } from './dtos/ChangePassword.dto';
// Hàm tạo mã xác minh

@Controller(Routes.USERS)
export class UsersController {
  private verificationCode: string; // Biến lưu trữ mã xác minh
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
    private readonly mailService: MailService,
  ) {}

  @Post('getOneUser')
  async forgetPassword(@Body() email: UserEmail): Promise<User> {
    return this.userService.forgetPassword(email);
  }

  @Get(':username')
  async getUserByName(@Param('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }

  @Put('edit')
  async editUser(@Body() editUser: editUser): Promise<User> {
    return this.userService.editUser(editUser);
  }

  generateVerificationCode(): string {
    const characters = '0123456789';
    let verificationCode = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      verificationCode += characters[randomIndex];
    }
    return verificationCode;
  }

  @Post('change-email')
  async sendEmailConfirmation(@Body() changeEmailDto: ChangeEmailDto) {
    // Tạo mã xác minh
    const verificationCode = this.generateVerificationCode();

    // Gửi email xác nhận đổi email tới địa chỉ mới
    await this.mailService.sendEmailConfirmation(
      changeEmailDto.newEmail,
      verificationCode,
    );

    // Lưu mã xác minh vào biến lưu trữ
    this.verificationCode = verificationCode;

    // Trả về kết quả thành công
    return { message: 'Confirmation email sent successfully' };
  }

  @Post('/:userId/confirm-email')
  async confirmEmail(
    @Body() confirmEmailDto: ConfirmEmailDto,
    @Param('userId') userId: string,
  ) {
    const { verificationCode } = confirmEmailDto;
    const email = confirmEmailDto.email;
    console.log(email);

    if (verificationCode === this.verificationCode) {
      // Mã xác minh hợp lệ, xác nhận email mới
      // ...

      // Xóa mã xác minh đã sử dụng
      this.verificationCode = '';

      return (
        'Đã thay đổi thành công ' +
        (await this.userService.updateUserEmail(email, userId))
      );
    } else {
      // Mã xác minh không hợp lệ
      return { message: 'Invalid verification code' };
    }
  }

  @Post('/change-password/:id')
  async changePassword(
    @Body() confirmPassword: ChangePassword,
    @Param('id') id: string,
  ) {
    const password = confirmPassword.newPassword;
    //console.log(password);

    if (password) {
      return (
        'Thay đổi mật khẩu thành công' +
        (await this.userService.changePassword(password, id))
      );
    } else {
      return 'lỗi';
    }
  }

  // @Post('forgotPassword')
  // async forgotPassword(@Body() email: string) {
  //   //console.log(email);

  //   return await this.userService.forgotPassword(email);
  // }
}
