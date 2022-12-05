import { HttpException, HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { FindOptions, WhereAttributeHashValue } from 'sequelize/types';
import { Location } from '../geometry/entities/location.entity';
// import { GeometryService } from '../geometry/geometry.service';
import { PaginatorInput } from '../shared/dto/paginator.input';
import { TranslateService } from '../translate/translate.service';
import { UpdateUser } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserModel } from './user.model';

const { where, col, fn } = Sequelize;

@Injectable()
export class UserService implements OnModuleInit {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    private readonly translateService: TranslateService, // private readonly geometryService: GeometryService,
  ) {}

  async onModuleInit() {
    this.logger.debug('Init');
    try {
      const coordinates = [51.5074, 0.1278];
      const user = await this.userModel.createDefault({
        id: '791d4e16-fd2b-4411-a5c5-5928cd04b4dd', // ! IMPORTANT - This is the user ID that will be used in the tests (not the one generated by the database)
        email: 'miguelmoyaortega@gmail.com',
        name: 'Miguel',
        surname: 'Moya Ortega',
        imageUrl: 'https://lh3.googleusercontent.com/a/ALm5wu0k7Yujdl-FMfB5HuUEIMUo1JDWKmWLpkoIZX1Vwg=s96-c',
        googleToken:
          'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY0NTEzNDVmYWQwODEwMWJmYjM0NWNmNjQyYTJkYTkyNjdiOWViZWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjQ3NDc3MDE5MTg4LTluaDNkcm9saHBxZm50b2Jlb3NnZDQxdmdvZjN1dXU2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjQ3NDc3MDE5MTg4LTluaDNkcm9saHBxZm50b2Jlb3NnZDQxdmdvZjN1dXU2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyMDMyMDM4ODE4NDI4MjQyMjM5IiwiZW1haWwiOiJtaWd1ZWxtb3lhb3J0ZWdhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiVWUwV1kxaXZOUGZ0RDJoZ1U2bVhBZyIsIm5hbWUiOiJNaWd1ZWwgTW95YSBPcnRlZ2EiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUxtNXd1MGs3WXVqZGwtRk1mQjVIdVVFSU1VbzFKRFdLbVdMcGtvSVpYMVZ3Zz1zOTYtYyIsImdpdmVuX25hbWUiOiJNaWd1ZWwiLCJmYW1pbHlfbmFtZSI6Ik1veWEgT3J0ZWdhIiwibG9jYWxlIjoiZXMiLCJpYXQiOjE2NjgxMTkwODAsImV4cCI6MTY2ODEyMjY4MCwianRpIjoiYzNlMzQzZmFiOTIyMjVjYTdhNDEwNzU0ZDQ0YWY5MGNlZTU5YjFjYiJ9.bEofwxhEDFb9T3G3xG0_wELGtt20TjTCMnTIlJ08A-RLD-N6MCg7U5t0reZefgRPoX3GWSa2x_lkDKab_JH6zd3Ff7BKbpLGK1nlH7wgAHBD-aTpZ-3rCXE90s8z3RQgGV9__piJgIFha8DmGtPzKxNkneMAxoSZz2lgbxuQ4GqQ7nLSsGA_fqg4IjEBwOgwx-BpVPjfCfBGVnLzZgNuu_jimMnuw4yS9DRflnbSKrjqh9WWMl3vFPucaodnC37ojF5o-DC1IoiUvD7LfdSmC0hLFXl1flDoS58Jmq-friS1PZhR3zXhk3LKi5B_pxyp8tCe29D520BjOV7x1VzKnw',
      } as any);

      await user.updateLocation({ coordinates });

      for (let i = 0; i < 40; i++) {
        const userI = await this.userModel.createDefault({
          email: ` ${i + 1}-${user.email}`,
          name: ` ${i + 1}-${user.name}`,
          surname: ` ${i + 1}-${user.surname}`,
          imageUrl: user.imageUrl,
          googleToken: user.googleToken,
          nickname: ` ${i + 1}-nickname`,
        } as any);

        userI.updateLocation({
          coordinates: [coordinates[0] + 0.001 * i, coordinates[1] + 0.001 * i],
        });
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAll(paginator: PaginatorInput, userID: User['id']) {
    const currentUser = await this.userModel.findByPk(userID);

    if (!currentUser) {
      throw new HttpException(this.translateService.current.userNotFound, HttpStatus.NOT_FOUND);
    }

    return this.userModel.findAll({
      ...this.getInclude(currentUser.location),
      ...paginator,
      where: {
        id: { [Op.ne]: userID },
      },
    });
  }

  async findOne(id: User['id'], userID: User['id']) {
    const currentUser = await this.userModel.findByPk(userID);

    if (!currentUser) {
      this.logger.verbose(`User with id ${userID} not found (current)`);
      // throw new HttpException(this.translateService.current.userNotFound, HttpStatus.NOT_FOUND);
    }

    const user = await this.userModel.findByPk(id, {
      ...this.getInclude(currentUser.location),
    });

    if (!user) {
      this.logger.verbose(`User with id ${id} not found`);
      // throw new HttpException(this.translateService.current.userNotFound, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async isUniqueNickname(nickname: User['nickname']) {
    const total = await this.userModel.count({
      where: {
        nickname: where(fn('TRIM', fn('LOWER', col('nickname'))), nickname.toLowerCase().trim()) as WhereAttributeHashValue<string>,
      },
    });

    return total === 0;
  }

  async update(id: User['id'], updateUser: UpdateUser) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      // throw new HttpException(this.translateService.current.userNotFound, HttpStatus.NOT_FOUND);
    }

    const { location, ...userToUpdate } = updateUser;

    if (location) {
      await user.updateLocation(location);
    }

    await user.update({ ...userToUpdate });

    return true;
  }

  private getInclude(location: Location) {
    const include: FindOptions<UserModel> = {
      // attributes: {
      // include: [[this.geometryService.getDistance(location), 'distance']],
      // },

      // order: [this.geometryService.getDistance(location)],
      raw: true,
    };

    return include;
  }
}
