import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Location } from './entities/location.entity';

@Injectable()
export class GeometryService {
  /**
   * @example attributes: [[this.geometryService.getDistance(pos), 'distance']],
              order: [this.geometryService.getDistance(pos)],
   */
  public getDistance(location: Location, column = 'location') {
    return Sequelize.fn(
      'ST_Distance',
      Sequelize.col(column),
      Sequelize.literal(`ST_GeomFromText('POINT(${location.coordinates[0]} ${location.coordinates[1]})')`),
    );
  }
}
