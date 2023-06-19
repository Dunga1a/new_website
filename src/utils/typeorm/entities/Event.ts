import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date_start: Date;

  @Column()
  date_end: Date;

  @Column()
  time: string;

  @Column()
  title: string;

  @Column()
  address: string;

  @Column()
  leader: string;

  @Column()
  content: string;

  @Column()
  file_pdf: string;

  @Column()
  status: number;
}
