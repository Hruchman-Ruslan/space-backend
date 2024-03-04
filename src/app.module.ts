import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from 'dotenv';

import { UserModule } from './users';

dotenv.config();

const { DB_HOST } = process.env;

@Module({
  imports: [MongooseModule.forRoot(DB_HOST), UserModule],
})
export class AppModule {}
