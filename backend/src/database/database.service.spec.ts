import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseService } from './database.service';

describe('DB Service', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseService,
        {
          provide: Sequelize,
          useValue: {
            query: jest.fn(),
            transaction: jest.fn().mockImplementation(() => ({ commit: jest.fn(), rollback: jest.fn() })),
          },
        },
      ],
      imports: [ConfigModule],
    }).compile();

    service = module.get(DatabaseService);

    service['runMigrations'] = jest.fn();

    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should be defined', () => {
      expect(service.onModuleInit).toBeDefined();
    });

    it('should call createExtensions', async () => {
      const spy = jest.spyOn(service as any, 'createExtensions');
      await service.onModuleInit();
      expect(spy).toHaveBeenCalled();
    });

    it('should call runMigrations', async () => {
      const spy = jest.spyOn(service as any, 'runMigrations');
      await service.onModuleInit();
      expect(spy).toHaveBeenCalled();
    });

    it('should call createDefaultValues', async () => {
      const spy = jest.spyOn(service as any, 'createDefaultValues');
      await service.onModuleInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getTransaction', () => {
    it('should be defined', () => {
      expect(service.getTransaction).toBeDefined();
    });

    it('should return a transaction', async () => {
      const transaction = await service.getTransaction();
      expect(transaction).toBeDefined();
      expect(transaction.commit).toBeDefined();
      expect(transaction.rollback).toBeDefined();
    });
  });

  describe('runMigrations', () => {
    it('should be defined', () => {
      expect(service['runMigrations']).toBeDefined();
    });
  });

  describe('createDefaultValues', () => {
    it('should be defined', () => {
      expect(service['createDefaultValues']).toBeDefined();
    });
  });

  describe('createExtensions', () => {
    it('should be defined', () => {
      expect(service['createExtensions']).toBeDefined();
    });

    it('should call sequelize.query', async () => {
      const spy = jest.spyOn(service['sequelize'], 'query');
      await service['createExtensions']();
      expect(spy).toHaveBeenCalled();
    });
  });
});
