import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from 'dotenv';

dotenv.config();

const { DB_HOST } = process.env;

@Module({
  imports: [MongooseModule.forRoot(DB_HOST)],
  controllers: [],
  providers: [],
})
export class AppModule {}
