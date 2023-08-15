import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comment/comment';
import { Repository } from 'typeorm';
import { CommentMapper } from '../../../comment/comment.mapper';
import { CommentDataModel } from '../model/comment.entity';
import { GenericSqlRepository } from './generic_repository';
import { ICommentRepository } from './interfaces/comment_repository.interface';

export class CommentRepository
  extends GenericSqlRepository<Comment, CommentDataModel>
  implements ICommentRepository
{
  commentMapper: CommentMapper;
  constructor(
    @InjectRepository(CommentDataModel)
    repository: Repository<CommentDataModel>,
    commentMapper: CommentMapper,
  ) {
    super(repository, commentMapper);
    this.commentMapper = commentMapper;
  }

  async getComments(): Promise<Comment[]> {
    const query = await this.repository
      .createQueryBuilder('comments')
      .leftJoinAndSelect('comments.issue', 'issue')
      .getMany();
    return query.length
      ? query.map((comment) => this.commentMapper.toDomain(comment))
      : [];
  }

  async save(comment: Comment): Promise<CommentDataModel> {
    return await this.repository.save(
      this.commentMapper.toPersistence(comment),
    );
  }
}
