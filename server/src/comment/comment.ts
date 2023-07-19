import { Comment } from 'src/utils/typeorm';

export interface ICommentService {
  createComment(commentDetails: Partial<Comment>);
  getCommentByIdPost(id: number);
  editComment(commentEditDetails: any);
  getOneCommentById(id: number);
  getCommentsById(id: number);
  getUniqueCommentById(id: number);
  getChildComments(parentId: number);
  deleteManyComments(commentDeleteId: number[]);
}
