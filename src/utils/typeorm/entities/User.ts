import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from './Role';
import { Member } from './Members';
import { Gender } from 'src/utils/types';
import { Image } from './Image';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

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
  @Exclude()
  password: string;

  @Column({ nullable: true })
  gender: Gender;

  @Column({ nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  signature: string;

  @OneToOne(() => Image)
  @JoinColumn()
  image: Image;

  @Column({ nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  log_out: Date;

  @Column({ nullable: true })
  accuracy: boolean;

  @Column({ nullable: true })
  status: number;
}
