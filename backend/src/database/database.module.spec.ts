import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseService } from './database.service';

const sequelizeMock = {};

@Module({
  providers: [
    DatabaseService,
    {
      provide: Sequelize,
      useValue: sequelizeMock,
    },
  ],
  imports: [ConfigModule],
})
export class DbModuleSpec {}

describe('Database Module', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DbModuleSpec],
    }).compile();
  });

  it('Should be defined', () => {
    expect(module).toBeDefined();
  });
});
