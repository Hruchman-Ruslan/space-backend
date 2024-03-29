import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from 'dotenv';

import { UserModule } from './users';
import { AuthMiddleware } from './users/middlewares';

dotenv.config();

const { DB_HOST } = process.env;

@Module({
  imports: [MongooseModule.forRoot(DB_HOST), UserModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
