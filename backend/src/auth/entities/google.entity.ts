import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GoogleLogin {
  @Field({})
  id: string;

  @Field({})
  email: string;

  @Field({})
  givenName: string;

  @Field({})
  familyName: string;

  @Field({})
  imageUrl: string;

  @Field({})
  accessToken: string;

  @Field({})
  idToken: string;
}
