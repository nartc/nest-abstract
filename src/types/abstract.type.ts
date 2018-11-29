import {DeepPartial, UpdateResult, DeleteResult} from 'typeorm';
import {AbstractEntity, AbstractModel} from 'src/models';

export type AbstractDocument<T> = T extends AbstractModel
    ? T
    : T extends AbstractEntity
        ? T & DeepPartial<T>
        : any;
export type IdType = string | number;
export type UpdateResultType<T> = T extends AbstractModel
    ? T
    : T extends AbstractEntity
        ? UpdateResult
        : any;

export type DeleteResultType<T> = T extends AbstractModel
    ? T
    : T extends AbstractEntity
        ? DeleteResult
        : any;
