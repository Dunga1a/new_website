import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BusinessAreas {
  @PrimaryGeneratedColumn()
  id_business_areas: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true, type: 'longtext' })
  intro: string;

  @Column()
  status: number;
}
