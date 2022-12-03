import { Logger, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../user/entities/user.entity';
import { GQLCurrentUser } from '../user/user.decorator';
import { GqlAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthResponse } from './entities/authResponse.entity';
import { GoogleLogin } from './entities/google.entity';

@Resolver('auth')
export class AuthResolver {
  private logger = new Logger(AuthResolver.name);

  constructor(private readonly authService: AuthService) {}

  @Query(() => Boolean)
  @UseGuards(GqlAuthGuard)
  isLogged(@Context() context: any) {
    this.logger.debug('Query: isLogged');
    const user = context?.req?.user;

    return this.authService.validate(user.email, user.id);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  rehydrate(@GQLCurrentUser() user: User) {
    this.logger.debug('Mutation: Rehydrate');
    return this.authService.rehydrate(user);
  }

  @Mutation(() => AuthResponse)
  async loginGoogle(@Args('user') user: GoogleLogin) {
    this.logger.debug('Mutation: LoginGoogle');
    const token = await this.authService.loginGoogle(user);
    return { token };
  }
}
