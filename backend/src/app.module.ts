import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { GeometryModule } from './geometry/geometry.module';
import { RatingModule } from './rating/rating.module';
import { TranslateModule } from './translate/translate.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      autoSchemaFile: './schema.gql',
      sortSchema: true,
      definitions: {
        path: join(process.cwd(), '../core/graphql.d.ts'),
        enumsAsTypes: true,
      },
      // errorFormatter: (execution) => {
      //   const [error] = execution.errors; // take first error
      //   const originalError = error?.originalError;

      //   if (originalError instanceof HttpException) {
      //     const statusCode = originalError.getStatus();
      //     return {
      //       statusCode: statusCode >= 400 && statusCode < 600 ? statusCode : 500,
      //       response: execution,
      //     };
      //   }

      //   return { statusCode: 500, response: execution };
      // },
    }),
    DatabaseModule,
    TranslateModule,
    AuthModule,
    UserModule,
    RatingModule,
    GeometryModule,
  ],
})
export class AppModule {}
