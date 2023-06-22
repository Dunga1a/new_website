import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { ICommentService } from './comment';

@Injectable()
export class CommentService implements ICommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createComment(commentDetails: Partial<Comment>) {
    const createComment = await this.commentRepository.create(commentDetails);
    const savedComment = await this.commentRepository.save(createComment);
    return savedComment;
  }

  async getCommentByIdPost(id: number) {
    const getComment = await this.commentRepository.find({
      where: { post: id },
      relations: ['user'],
    });

    return getComment;
  }
}
