import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OrganizeMembershipTitle {
  @PrimaryGeneratedColumn()
  id_organize_membership: number;

  @Column()
  name: string;

  @Column()
  status: boolean;
}
