import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePassword {
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
