import { Comment } from 'src/comment/comment';
import { IGenericRepository } from './generic_repository.interface';
import { CommentDataModel } from '../../model/comment.entity';

export interface ICommentRepository
  extends IGenericRepository<Comment, CommentDataModel> {
  getComments(): Promise<Comment[]>;
  save(comment: Comment): Promise<CommentDataModel>;
}
