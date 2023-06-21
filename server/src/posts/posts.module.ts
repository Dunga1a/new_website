import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member, NewsCategory, NewsPost, User } from 'src/utils/typeorm';
import { Services } from 'src/utils/constants';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsPost, User, Member, NewsCategory]),
    UsersModule,
  ],
  providers: [
    {
      provide: Services.NEWPOST,
      useClass: PostsService,
    },
  ],
  exports: [
    {
      provide: Services.NEWPOST,
      useClass: PostsService,
    },
  ],
  controllers: [PostsController],
})
export class PostsModule {}
