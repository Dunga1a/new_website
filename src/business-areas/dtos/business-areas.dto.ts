import { IsNotEmpty, IsString } from 'class-validator';

export class BusinessAreasDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateBusinessAreaDto extends BusinessAreasDto {
  @IsNotEmpty()
  id_business_areas?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  intro: string;
}
