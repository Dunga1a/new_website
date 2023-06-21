import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  //@IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  subcontent: string;

  @IsString()
  content: string;

  //@IsString()
  image: string;

  @IsString()
  slug: string;

  @IsNotEmpty()
  //@IsNumber()
  categoryId?: number;

  status: boolean;
}
