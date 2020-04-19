import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { ObjectMapping } from './interfaces';
import { NpmHelper } from './utils';
import { AbstractCoreService } from './abstract-core.service';
import { AbstractMongooseService } from './abstract-mongoose.service';
import { AbstractTypeOrmService } from './abstract-typeorm.service';

@Global()
@Module({})
export class AbstractModule {
  static forRoot(
    objectMapping: ObjectMapping = ObjectMapping.Mongoose,
  ): DynamicModule {
    if (objectMapping === ObjectMapping.Mongoose) {
      if (!NpmHelper.isMongooseInstalled) {
        const errorMessage =
          'Missing Mongoose dependencies. Please install mongoose and @nestjs/mongoose.';
        Logger.error(errorMessage);
        throw new Error(errorMessage);
      }

      return {
        module: AbstractModule,
        providers: [
          { provide: AbstractCoreService, useClass: AbstractMongooseService },
        ],
      };
    } else if (objectMapping === ObjectMapping.TypeOrm) {
      if (!NpmHelper.isTypeOrmInstalled) {
        const errorMessage =
          'Missing TypeOrm dependencies. Please install typeorm and @nestjs/typeorm.';
        Logger.error(errorMessage);
        throw new Error(errorMessage);
      }

      return {
        module: AbstractModule,
        providers: [
          { provide: AbstractCoreService, useClass: AbstractTypeOrmService },
        ],
      };
    }
  }
}
