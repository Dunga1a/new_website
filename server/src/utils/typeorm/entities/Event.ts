import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date_start: Date;

  @Column({ nullable: true })
  date_end: Date;

  @Column()
  time: string;

  @Column()
  title: string;

  @Column()
  address: string;

  @Column()
  leader: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ nullable: true })
  file_pdf: string;

  @Column({ default: 0 })
  status: number;
}
