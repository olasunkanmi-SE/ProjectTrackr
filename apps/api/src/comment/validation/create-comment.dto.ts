import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  content: string;

  @IsUUID()
  @IsNotEmpty()
  @Field()
  issueId: string;
}
