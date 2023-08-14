import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Member } from './Members';
import { NewsCategory } from './NewsCategory';
import { User } from './User';

@Entity()
export class NewsPost {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => NewsCategory)
  newsCategory: NewsCategory;

  @ManyToOne(() => Member, { eager: true })
  member: Member;

  @ManyToOne(() => User, { eager: true })
  user: User;

  // Other columns in the NewsPost table
  @Column()
  title: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: false })
  status: boolean;

  @Column({ type: 'longtext' })
  subcontent: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ nullable: true, type: 'longtext' })
  image: string;

  @Column({ default: 0 })
  view: number;

  @Column({ default: 0 })
  rating: number;

  @Column()
  slug: string;

  @Column({ type: 'datetime', nullable: true }) // Kiểu dữ liệu DATETIME trong MySQL
  lastViewedAt: Date;
}
