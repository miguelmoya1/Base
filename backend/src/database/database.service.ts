import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { runMigrations } from 'sequelize-do-migrations';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private logger = new Logger(DatabaseService.name);
  constructor(private sequelize: Sequelize, private configService: ConfigService) {}

  async onModuleInit() {
    this.logger.debug('Init');
    await this.createExtensions();
    await this.runMigrations();
    await this.createDefaultValues();
  }

  public getTransaction() {
    return this.sequelize.transaction();
  }

  private async runMigrations() {
    await runMigrations(this.sequelize, {
      logger: this.logger.verbose.bind(this.logger),
      verbose: this.configService.get('NODE_ENV') === 'development',
    });
  }

  private async createDefaultValues() {
    this.logger.debug('Creating default values');
  }

  private async createExtensions() {
    this.logger.debug('Creating extensions');
    await this.sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis;');
  }
}
