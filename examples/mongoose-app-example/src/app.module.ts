import { Module } from '@nestjs/common';
import { AbstractModule, ObjectMapping } from 'nest-abstract';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AbstractModule.forRoot({objectMappingType: ObjectMapping.Mongoose})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
