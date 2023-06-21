import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrganizeMembershipTitle } from './OrganizeMembershipTitle';
import { BusinessAreas } from './BusinessAreas';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrganizeMembershipTitle)
  id_role_associations: OrganizeMembershipTitle;

  @ManyToOne(() => BusinessAreas)
  id_business_areas: BusinessAreas;

  // Other columns in the Members table
  @Column()
  name_company: string;

  @Column()
  role_name: string;

  @Column()
  representative: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  code_company: string;

  @Column({ nullable: true })
  image_person: string;

  @Column({ nullable: true })
  image_company: string;

  @Column({ nullable: true })
  website: string;

  @Column()
  address: string;

  @Column()
  intro: string;

  @Column()
  slug: string;

  @Column({ default: 0 })
  status: number;
}
