import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class EditRoleDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
