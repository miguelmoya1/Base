import { Module } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test } from '@nestjs/testing';
import { ModelMock } from '../shared/testing/model.mock';
import { RatingModel } from './models/rating.model';
import { RatingService } from './rating.service';

const RatingMock = {
  provide: getModelToken(RatingModel),
  useFactory: () => new ModelMock([{ id: '1', name: 'Test' }]),
};

@Module({
  providers: [RatingMock, RatingService],
  exports: [RatingMock],
})
export class RatingModuleSpec {}

describe('Rating Module', () => {
  let module: Test;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [RatingModuleSpec],
    }).compile();
  });

  it('Module should be defined', () => {
    expect(module).toBeDefined();
  });
});
