import { Field, ObjectType } from '@nestjs/graphql';
import { Location } from '../../geometry/entities/location.entity';

@ObjectType()
export class User {
  @Field({})
  id: string;

  @Field({})
  email: string;

  @Field({})
  name: string;

  @Field({})
  surname: string;

  @Field(() => Location, {})
  location: Location;

  @Field({})
  imageUrl: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field({})
  googleToken: string;

  @Field({ nullable: true })
  averageRating: number | null;

  @Field({})
  totalRatings: number;

  @Field({})
  distance: number;
}
