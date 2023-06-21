import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { NewsPost } from './NewsPost';
import { User } from './User';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => NewsPost)
  post: NewsPost;

  @ManyToOne(() => User)
  user: User;

  @Column()
  father_id: number;

  @Column()
  content: string;

  @Column()
  created_at: Date;

  @Column()
  status: number;
}
