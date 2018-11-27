import { Module, Global, DynamicModule, Logger } from '@nestjs/common';
import { AbstractModuleOptions, ObjectMapping } from './interfaces';
import { defaultModuleOptions } from './constants';
import { NpmHelper } from './utils';
import { AbstractCoreService } from './abstract-core.service';
import { AbstractMongooseService } from './abstract-mongoose.service';
import { AbstractTypeOrmService } from './abstract-typeorm.service';

@Global()
@Module({})
export class AbstractModule {
  static forRoot(options: AbstractModuleOptions): DynamicModule {
    const moduleOptions = { ...defaultModuleOptions, ...options };
    const { objectMappingType, withSwagger } = moduleOptions;

    if (objectMappingType === ObjectMapping.Mongoose) {
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
    } else if (objectMappingType === ObjectMapping.TypeOrm) {
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
