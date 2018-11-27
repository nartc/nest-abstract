import { AbstractModuleOptions, ObjectMapping } from './interfaces';

export const PACKAGES = {
  Mongoose: 'mongoose',
  TypeOrm: 'typeorm',
  Passport: 'passport',
  Swagger: '@nestjs/swagger',
};

export const defaultModuleOptions: AbstractModuleOptions = {
  objectMappingType: ObjectMapping.Mongoose,
  withSwagger: false,
};

export const AUTH_GUARD_TYPE = 'jwt';
