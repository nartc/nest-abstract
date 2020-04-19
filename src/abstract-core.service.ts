import {
  FindManyFilter,
  FindOneFilter,
  IdType,
  AbstractDocument,
  UpdateResultType,
  DeleteResultType,
} from './types';

export abstract class AbstractCoreService<T> {
  public abstract async find(filter: FindManyFilter<T>): Promise<T[]>;

  public abstract async findOne(filter: FindOneFilter<T>): Promise<T>;

  public abstract async findById(id: IdType): Promise<T>;

  public abstract async create(doc: AbstractDocument<T>): Promise<T>;

  public abstract async update(
    id: IdType,
    updatedDoc: AbstractDocument<T>,
  ): Promise<UpdateResultType<T>>;

  public abstract async delete(id: IdType): Promise<DeleteResultType<T>>;
}
