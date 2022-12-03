import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field()
  type: string;

  @Field(() => [Float], {})
  coordinates: number[];
}
