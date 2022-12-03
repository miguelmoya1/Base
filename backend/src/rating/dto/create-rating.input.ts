import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRating {
  @Field()
  honesty: number;

  @Field()
  straightforwardness: number;

  @Field()
  determination: number;

  @Field()
  imagination: number;

  @Field()
  ambition: number;

  @Field()
  courage: number;

  @Field()
  maturity: number;

  @Field()
  loyalty: number;

  @Field()
  selfControl: number;

  @Field()
  independence: number;
}
