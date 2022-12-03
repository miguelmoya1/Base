import {
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DECIMAL,
  UUID,
  UUIDV4,
} from 'sequelize';
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { UserModel } from '../../user/models/user.model';
import { CreateRating } from '../dto/create-rating.input';
import { Rating } from '../entities/rating.entity';

@Table({
  tableName: 'ratings',
})
export class RatingModel extends Model<Rating, CreateRating> {
  @Column({
    allowNull: false,
    unique: true,
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  })
  id: string;

  @Column({
    type: DECIMAL,
  })
  rating: number;

  @Column({
    type: DECIMAL,
  })
  honesty: number;

  @Column({
    type: DECIMAL,
  })
  straightforwardness: number;

  @Column({
    type: DECIMAL,
  })
  determination: number;

  @Column({
    type: DECIMAL,
  })
  imagination: number;

  @Column({
    type: DECIMAL,
  })
  ambition: number;

  @Column({
    type: DECIMAL,
  })
  courage: number;

  @Column({
    type: DECIMAL,
  })
  maturity: number;

  @Column({
    type: DECIMAL,
  })
  loyalty: number;

  @Column({
    type: DECIMAL,
  })
  selfControl: number;

  @Column({
    type: DECIMAL,
  })
  independence: number;

  @BelongsTo(() => UserModel, {
    foreignKey: 'raterID',
    as: 'Raters',
  })
  /**
   * @description Get the rater of the rating
   */
  Rater: UserModel;
  raterID: string;
  getRater: BelongsToGetAssociationMixin<UserModel>;
  setRater: BelongsToSetAssociationMixin<UserModel, string>;
  createRater: BelongsToCreateAssociationMixin<UserModel>;

  @BelongsTo(() => UserModel, {
    foreignKey: 'ratedID',
    as: 'Ratings',
  })
  /**
   * @description Get the rated of the rating
   */
  Rating: UserModel;
  ratedID: string;
  getRated: BelongsToGetAssociationMixin<UserModel>;
  setRated: BelongsToSetAssociationMixin<UserModel, string>;
  createRated: BelongsToCreateAssociationMixin<UserModel>;
}
