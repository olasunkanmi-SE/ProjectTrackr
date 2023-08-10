import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateIssueInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  status: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  priority: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  projectId: string;
}
