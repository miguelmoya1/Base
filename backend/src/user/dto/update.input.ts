import { Field, InputType } from '@nestjs/graphql';
import { LocationInput } from '../../geometry/dto/location.input';

@InputType()
export class UpdateUser {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  surname?: string;

  @Field(() => LocationInput, { nullable: true })
  location?: LocationInput;

  @Field({ nullable: true })
  nickname?: string;
}
