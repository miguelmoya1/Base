import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RatingModel } from '../rating/models/rating.model';
import { UserModel } from './models/user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, RatingModel])],
  providers: [UserResolver, UserService],
})
export class UserModule {}
