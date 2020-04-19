import { AbstractEntity } from './models';
import { AbstractCoreService } from './abstract-core.service';
import { BadRequestException } from '@nestjs/common';
import { Repository, FindManyOptions, FindConditions } from 'typeorm';
import {
  IdType,
  AbstractDocument,
  UpdateResultType,
  DeleteResultType,
} from './types';

export class AbstractTypeOrmService<
  T extends AbstractEntity
> extends AbstractCoreService<T> {
  protected _model: Repository<T>;

  constructor(model: Repository<T>) {
    super();
    this._model = model;
  }

  public async find(
    filter: FindManyOptions<T> & FindConditions<T> = {},
  ): Promise<T[]> {
    return this._model.find(filter);
  }

  public async findById(id: IdType): Promise<T> {
    return this._model.findOne(this.getId(id));
  }

  public async findOne(filter: FindConditions<T> = {}): Promise<T> {
    return this._model.findOne(filter);
  }

  public async create(doc: AbstractDocument<T>): Promise<T> {
    return this._model.save(doc as any);
  }

  public async update(
    id: IdType,
    updatedDoc: AbstractDocument<T>,
  ): Promise<UpdateResultType<T>> {
    return (await this._model.update(
      this.getId(id),
      updatedDoc as any,
    )) as UpdateResultType<T>;
  }

  public async delete(id: IdType): Promise<DeleteResultType<T>> {
    return (await this._model.delete(this.getId(id))) as DeleteResultType<T>;
  }

  private getId(id: IdType): number {
    const parseId = Number(id);

    if (isNaN(parseId)) {
      throw new BadRequestException('Invalid Id');
    }

    return parseId;
  }
}
