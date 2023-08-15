import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TYPES } from 'src/application/constants';
import { CommentDataModel } from 'src/infrastructure/data_access/model/comment.entity';
import { Comment } from './comment';
import { ICommentService } from './interfaces/comment-service.interface';
import { CreateCommentInput } from './validation/create-comment.dto';

@Resolver(() => CommentDataModel)
export class CommentResolver {
  constructor(
    @Inject(TYPES.commentService)
    private readonly commentService: ICommentService,
  ) {}

  @Query(() => [CommentDataModel])
  async comments(): Promise<Comment[]> {
    return await this.commentService.getComments();
  }

  @Mutation(() => CommentDataModel)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    return await this.commentService.createComment(createCommentInput);
  }
}
