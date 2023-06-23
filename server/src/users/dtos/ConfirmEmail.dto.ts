import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmEmailDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  verificationCode: string;
}
