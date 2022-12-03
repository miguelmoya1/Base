import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({})
export class Translate {
  @Field({ nullable: true })
  ambition: string;

  @Field({ nullable: true })
  courage: string;

  @Field({ nullable: true })
  determination: string;

  @Field({ nullable: true })
  general: string;

  @Field({ nullable: true })
  geolocationButton: string;

  @Field({ nullable: true })
  geolocationDescription: string;

  @Field({ nullable: true })
  geolocationTitle: string;

  @Field({ nullable: true })
  honesty: string;

  @Field({ nullable: true })
  imagination: string;

  @Field({ nullable: true })
  independence: string;

  @Field({ nullable: true })
  invalidToken: string;

  @Field({ nullable: true })
  login: string;

  @Field({ nullable: true })
  loyalty: string;

  @Field({ nullable: true })
  maturity: string;

  @Field({ nullable: true })
  nickname: string;

  @Field({ nullable: true })
  nicknameMaxLength: string;

  @Field({ nullable: true })
  nicknameMinLength: string;

  @Field({ nullable: true })
  nicknameRequired: string;

  @Field({ nullable: true })
  nicknameUnique: string;

  @Field({ nullable: true })
  selfControl: string;

  @Field({ nullable: true })
  straightforwardness: string;

  @Field({ nullable: true })
  userNotFound: string;

  @Field({ nullable: true })
  userSetUpButton: string;

  @Field({ nullable: true })
  userSetUpDescription: string;

  @Field({ nullable: true })
  userSetUpTitle: string;
}
