import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class PaginatorInput {
  @Field(() => Int)
  @Min(0)
  offset: number;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  limit: number;
}
