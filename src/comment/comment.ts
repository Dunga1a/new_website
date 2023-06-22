import { Comment } from 'src/utils/typeorm';

export interface ICommentService {
  createComment(commentDetails: Partial<Comment>);
  getCommentByIdPost(id: number);
}
