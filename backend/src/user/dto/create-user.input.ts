import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUser {
  @Field({})
  name: string;

  @Field({})
  surname: string;

  @Field({})
  imageUrl: string;

  @Field({})
  email: string;

  @Field({})
  googleToken: string;
}
