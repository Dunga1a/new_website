import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangeEmailDto {
  currentEmail?: string;

  @IsNotEmpty()
  @IsEmail()
  newEmail: string;
}
