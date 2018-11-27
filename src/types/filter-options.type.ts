import { AbstractEntity } from 'src/models';
import { FindManyOptions, FindConditions } from 'typeorm';

export type FindManyFilter<T> = T extends AbstractEntity
  ? FindManyOptions<T> & FindConditions<T>
  : any;
export type FindOneFilter<T> = T extends AbstractEntity
  ? FindConditions<T>
  : any;
