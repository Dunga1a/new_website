import { Module } from '@nestjs/common';
import { NewsCategoryController } from './newscategory.controller';
import { NewsCategoryService } from './newscategory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategory, NewsPost } from 'src/utils/typeorm';
import { Services } from 'src/utils/constants';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([NewsCategory, NewsPost]), PostsModule],
  controllers: [NewsCategoryController],
  providers: [
    {
      provide: Services.NEWSCATEGORY,
      useClass: NewsCategoryService,
    },
  ],
})
export class NewscategoryModule {}
