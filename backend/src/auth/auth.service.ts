import { HttpException, HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { OAuth2Client } from 'google-auth-library';
import { TranslateService } from '../translate/translate.service';
import { User } from '../user/entities/user.entity';
import { UserModel } from '../user/user.model';
import { GoogleLogin } from './entities/google.entity';

@Injectable()
export class AuthService implements OnModuleInit {
  private logger = new Logger(AuthService.name);
  client: OAuth2Client;

  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    private readonly translateService: TranslateService,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    this.logger.debug('Init');
    this.client = new OAuth2Client({ clientId: process.env.GOOGLE_CLIENT_ID });
  }

  public decode(token: string) {
    try {
      const decode = this.jwtService.decode(token);
      return decode as User;
    } catch (e) {
      this.logger.error(`func decode: ${e}`);
      throw new HttpException(this.translateService.current.invalidToken, HttpStatus.UNAUTHORIZED);
    }
  }

  public async loginGoogle(user: GoogleLogin) {
    const userDB = await this.userModel.findOne({ where: { email: user.email } });
    const { email, givenName: name, familyName: surname, idToken, imageUrl } = user;

    await this.client.verifyIdToken({
      idToken,
    });

    if (!userDB) {
      const userToReturn = await this.userModel.createDefault({
        surname,
        name,
        email,
        googleToken: idToken,
        imageUrl,
      });

      return this.sign(userToReturn);
    } else {
      const userToReturn = await this.userModel.findOne({ where: { email } });

      if (!userToReturn.googleToken) {
        userToReturn.googleToken = idToken;
        await userToReturn.save();
      }

      if (!userToReturn) {
        throw new HttpException(this.translateService.current.invalidToken, HttpStatus.UNAUTHORIZED);
      }

      return this.sign(userToReturn);
    }
  }

  public sign(user: Pick<User, 'id' | 'email'>) {
    const { id, email } = user;
    return this.jwtService.sign({ id, email });
  }

  async rehydrate(user: Pick<User, 'id' | 'email'>) {
    return this.sign(user);
  }

  async validate(email: string, id: string) {
    const dbUser = await this.userModel.findOne({ where: { email, id } });
    this.logger.debug(`validate: ${dbUser}`);

    return !!dbUser;
  }
}
