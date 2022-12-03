import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseService } from './database.service';

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        logging: false && configService.get('NODE_ENV') === 'development',
        define: {
          timestamps: true,
          paranoid: true,
        },
        autoLoadModels: true,
        synchronize: true,
        sync: { force: false && configService.get('NODE_ENV') === 'development' },
        ssl: configService.get('NODE_ENV') !== 'development',
        pool: {
          max: 20,
          min: 1,
          acquire: 30000,
          idle: 10000,
        },
        dialectOptions:
          configService.get('NODE_ENV') !== 'development'
            ? {
                ssl: {
                  require: true,
                  rejectUnauthorized: false,
                },
              }
            : undefined,
      }),
    }),
  ],
})
export class DatabaseModule {}
