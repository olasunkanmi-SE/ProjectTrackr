import { Comment } from '../comment';
import { CreateCommentInput } from '../validation/create-comment.dto';

export interface ICommentService {
  getComments(): Promise<Comment[]>;
  createComment(req: CreateCommentInput): Promise<Comment>;
}
