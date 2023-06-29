import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from './Role';
import { Member } from './Members';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  roles: Role[];

  @ManyToOne(() => Member)
  member: Member;

  // Other columns in the User table
  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  gender: number;

  @Column({ nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  signature: string;

  @Column({ nullable: true })
  question: string;

  @Column({ nullable: true })
  answer: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true })
  log_out: Date;

  @Column({ nullable: true })
  accuracy: boolean;

  @Column({ nullable: true })
  safe: boolean;

  @Column({ default: 1 })
  status: number;
}
