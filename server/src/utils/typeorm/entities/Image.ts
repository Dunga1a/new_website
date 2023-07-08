import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  filename: string;
}
