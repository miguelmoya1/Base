import { Test, TestingModule } from '@nestjs/testing';
import { GeometryService } from './geometry.service';

describe('GeometryService', () => {
  let service: GeometryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeometryService],
    }).compile();

    service = module.get<GeometryService>(GeometryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDistance', () => {
    it('should return a sequelize function', () => {
      const location = {
        coordinates: [1, 2],
        type: 'POINT',
      };
      const column = 'location';
      const result = service.getDistance(location, column);

      expect(result).toEqual({
        fn: 'ST_Distance',
        args: [{ col: 'location' }, { val: "ST_GeomFromText('POINT(1 2)')" }],
      });
    });
  });
});
