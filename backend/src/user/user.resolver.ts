import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/auth.guard';
import { CreateRating } from '../rating/dto/create-rating.input';
import { PaginatorInput } from '../shared/dto/paginator.input';
import { UpdateUser } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { GQLCurrentUser } from './user.decorator';
import { UserService } from './user.service';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  findAll(@GQLCurrentUser() user: User, @Args() paginator: PaginatorInput) {
    return this.userService.findAll(paginator, user.id);
  }

  @Query(() => User, { name: 'user' })
  findOne(@GQLCurrentUser() user: User, @Args('id', { type: () => String }) id: User['id']) {
    return this.userService.findOne(id, user.id);
  }

  @Query(() => User, { name: 'loggedUser' })
  getLoggedUser(@GQLCurrentUser() user: User) {
    return this.userService.findOne(user.id, user.id);
  }

  @Query(() => Boolean)
  isUniqueNickname(@Args('nickname') nickname: string) {
    return this.userService.isUniqueNickname(nickname);
  }

  @Mutation(() => Boolean)
  updateUser(@Args('user') user: UpdateUser, @GQLCurrentUser() currentUser: User) {
    return this.userService.update(currentUser.id, user);
  }

  @Mutation(() => Boolean)
  rateUser(@GQLCurrentUser() user: User, @Args('rating', { type: () => CreateRating }) rating: CreateRating) {
    return this.userService.rate(user.id, rating);
  }
}
