import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AbstractModule, ObjectMapping } from '../../../dist';

@Module({
  imports: [
    AbstractModule.forRoot({ objectMappingType: ObjectMapping.Mongoose }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
