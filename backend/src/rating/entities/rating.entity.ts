import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Rating {
  @Field()
  id: string;

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

  @Field(() => User)
  Rater: User;

  @Field(() => User)
  Rating: User;
}
