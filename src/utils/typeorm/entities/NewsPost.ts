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

  @ManyToOne(() => Member)
  member: Member;

  @ManyToOne(() => User)
  user: User;

  // Other columns in the NewsPost table
  @Column()
  title: string;

  @Column()
  created_at: Date;

  @Column()
  status: number;

  @Column()
  subcontent: string;

  @Column()
  content: string;

  @Column('simple-array')
  image: string[];

  @Column()
  view: number;

  @Column()
  rating: number;

  @Column()
  slug: string;
}
