import { GEOGRAPHY, STRING, TEXT, UUID, UUIDV4 } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';
import { LocationInput } from '../geometry/dto/location.input';
import { CreateUser } from './dto/create.input';
import { User } from './entities/user.entity';

@Table({
  tableName: 'Users',
})
export class UserModel extends Model<User> {
  @Column({
    allowNull: false,
    unique: true,
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  })
  id: string;

  @Column({
    allowNull: false,
    unique: true,
    type: STRING,
  })
  email: string;

  @Column({
    type: GEOGRAPHY('POINT', 4326),
    defaultValue: { type: 'Point', coordinates: [0, 0] },
  })
  location: { type: 'POINT'; coordinates: number[] };

  @Column({
    type: STRING,
  })
  name: string;

  @Column({
    type: TEXT,
  })
  imageUrl: string;

  @Column({
    type: STRING,
  })
  surname: string;

  @Column({
    type: STRING,
  })
  nickname: string;

  @Column({
    allowNull: true,
    type: TEXT,
  })
  googleToken: string;

  /**
   *  @description Use this method to create a user, it will create the location
   */
  static async createDefault(user: CreateUser) {
    const userToReturn = await this.create({
      ...user,
      location: {
        type: 'POINT',
        coordinates: [0, 0],
      },
    });

    return userToReturn;
  }

  /**
   * @description Use this method to update a user, it will update the location and save the user
   */
  async updateLocation(location: LocationInput) {
    const locationToAdd = {
      type: 'POINT' as const,
      coordinates: [...location.coordinates],
    };

    if (location) {
      this.location = locationToAdd;
    }

    await this.save();

    return this;
  }
}
