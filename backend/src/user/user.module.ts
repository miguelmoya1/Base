import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [UserResolver, UserService],
})
export class UserModule {}
