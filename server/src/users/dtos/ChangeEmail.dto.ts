import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangeEmailDto {
  @IsNotEmpty()
  @IsEmail()
  currentEmail: string;

  @IsNotEmpty()
  @IsEmail()
  newEmail: string;
}
