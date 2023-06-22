import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender, StatusAccount } from 'src/utils/types';

export class CreateUserDto {
  @MinLength(2)
  @MaxLength(32)
  lastname?: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  firstname: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsEnum(Gender, { message: 'Invalid gender selection' })
  gender: Gender;

  // @IsDate()
  birthday: Date;

  @MinLength(2)
  @MaxLength(32)
  signature?: string;

  @IsEnum(StatusAccount, { message: 'Invalid statusaccount selection' })
  status: StatusAccount;
}
