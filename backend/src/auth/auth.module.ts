import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../user/user.model';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Global()
@Module({
  providers: [AuthService, AuthResolver, JwtStrategy],
  imports: [
    SequelizeModule.forFeature([UserModel]),
    JwtModule.registerAsync({
      useFactory: (configModule: ConfigService) => ({
        secret: configModule.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '90d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
