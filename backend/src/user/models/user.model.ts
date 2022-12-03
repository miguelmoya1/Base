import {
  GEOGRAPHY,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  STRING,
  TEXT,
  UUID,
  UUIDV4,
} from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { LocationInput } from '../../geometry/dto/location.input';
import { RatingModel } from '../../rating/models/rating.model';
import { CreateUser } from '../dto/create-user.input';
import { User } from '../entities/user.entity';

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

  @HasMany(() => RatingModel, {
    foreignKey: 'ratedID',
    as: 'Ratings',
  })
  /**
   * @description This is me rating other users
   */
  Ratings: RatingModel[];
  getRatings: HasManyGetAssociationsMixin<RatingModel>;
  countRatings: HasManyCountAssociationsMixin;
  createRating: HasManyCreateAssociationMixin<RatingModel>;
  hasRating: HasManyHasAssociationMixin<RatingModel, string>;
  hasRatings: HasManyHasAssociationsMixin<RatingModel, string>;
  setRatings: HasManySetAssociationsMixin<RatingModel, string>;
  addRating: HasManyAddAssociationMixin<RatingModel, string>;
  addRatings: HasManyAddAssociationsMixin<RatingModel, string>;
  removeRating: HasManyRemoveAssociationMixin<RatingModel, string>;
  removeRatings: HasManyRemoveAssociationsMixin<RatingModel, string>;

  @HasMany(() => RatingModel, {
    foreignKey: 'raterID',
    as: 'Raters',
  })
  /**
   * @description This is other users rating me
   */
  Raters: RatingModel[];
  getRaters: HasManyGetAssociationsMixin<RatingModel>;
  countRaters: HasManyCountAssociationsMixin;
  createRater: HasManyCreateAssociationMixin<RatingModel>;
  hasRater: HasManyHasAssociationMixin<RatingModel, string>;
  hasRaters: HasManyHasAssociationsMixin<RatingModel, string>;
  setRaters: HasManySetAssociationsMixin<RatingModel, string>;
  addRater: HasManyAddAssociationMixin<RatingModel, string>;
  addRaters: HasManyAddAssociationsMixin<RatingModel, string>;
  removeRater: HasManyRemoveAssociationMixin<RatingModel, string>;
  removeRaters: HasManyRemoveAssociationsMixin<RatingModel, string>;

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
