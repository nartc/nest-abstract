import { Module } from '@nestjs/common';
import { AbstractModule, ObjectMapping } from 'nest-abstract';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mongoose-app-test'),
    AbstractModule.forRoot({ objectMappingType: ObjectMapping.Mongoose }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
