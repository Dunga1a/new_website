import { IsNotEmpty, IsString } from 'class-validator';

export class OrganizeMembershipTitleDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateOrganizationsDto extends OrganizeMembershipTitleDto {
  @IsNotEmpty()
  status: boolean;
}

export class editOrganizationsDto extends OrganizeMembershipTitleDto {
  @IsNotEmpty()
  id_organize_membership: number;
}
