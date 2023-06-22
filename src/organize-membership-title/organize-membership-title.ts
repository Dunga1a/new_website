import { OrganizeMembershipTitle } from 'src/utils/typeorm';
import { OrganizationDetails } from 'src/utils/types';

export interface IOrganizeMembershipTitleService {
  getAllOrganizations(queryParams: any): Promise<OrganizeMembershipTitle[]>;
  createOrganizations(createOrganizationsDetails: OrganizationDetails);
  editOrganizations(editOrganizationDetails: OrganizationDetails);
  deleteManyOrganize(ids: number[]);
  updateStatusOnManyOrganize(ids: number[], status: number);
}
