import { OrganizeMembershipTitle } from './OrganizeMembershipTitle';
import { BusinessAreas } from './BusinessAreas';
export declare class Member {
    id: number;
    id_role_associations: OrganizeMembershipTitle;
    id_business_areas: BusinessAreas;
    name_company: string;
    role_name: string;
    representative: string;
    phone: string;
    email: string;
    code_company: string;
    image_person: string;
    image_company: string;
    website: string;
    address: string;
    intro: string;
    slug: string;
    status: number;
}
