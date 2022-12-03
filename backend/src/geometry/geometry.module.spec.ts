import { Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { GeometryService } from './geometry.service';

@Module({
  providers: [GeometryService],
  exports: [GeometryService],
})
export class GeometryModuleSpec {}

describe('Geometry Module', () => {
  let module: Test;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [GeometryModuleSpec],
    }).compile();
  });

  it('Module should be defined', () => {
    expect(module).toBeDefined();
  });
});
