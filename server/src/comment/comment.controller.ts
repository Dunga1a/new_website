import {
  Controller,
  Inject,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { ICommentService } from './comment';
import { CreateCommentDto } from './dtos/comment.dto';

@Controller(Routes.COMMENT)
export class CommentController {
  constructor(
    @Inject(Services.COMMENT) private readonly commentService: ICommentService,
  ) {}

  @Post('createComment')
  async createComment(@Body() commentDetails: CreateCommentDto) {
    const savedComment = await this.commentService.createComment(
      commentDetails,
    );
    return savedComment;
  }

  @Get('getCommentByPost/:idPost')
  async getCommentByPost(@Param('idPost', ParseIntPipe) idPost: number) {
    const commentList = await this.commentService.getCommentByIdPost(idPost);
    return commentList;
  }
}
