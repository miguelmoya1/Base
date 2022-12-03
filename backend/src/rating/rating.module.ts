import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RatingModel } from './models/rating.model';
import { RatingService } from './rating.service';

@Module({
  imports: [SequelizeModule.forFeature([RatingModel])],
  providers: [RatingService],
})
export class RatingModule {}
