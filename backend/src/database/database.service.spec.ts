import { Test, TestingModule } from '@nestjs/testing';
import { DbModuleSpec } from './database.module.spec';
import { DatabaseService } from './database.service';

describe('DB Service', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbModuleSpec],
    }).compile();

    service = module.get(DatabaseService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
});
