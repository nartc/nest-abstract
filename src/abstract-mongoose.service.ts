import { Model, Types } from 'mongoose';
import { AbstractCoreService } from './abstract-core.service';
import {
  IdType,
  AbstractDocument,
  UpdateResultType,
  DeleteResultType,
} from './types';
import { AbstractModel } from './models';

export class AbstractMongooseService<
  T extends AbstractModel
> extends AbstractCoreService<T> {
  protected _model: Model<T>;
  static model: any;

  constructor(model: Model<T>) {
    super();
    this._model = model;
    AbstractMongooseService.model = model;
  }

  public async find(filter: any = {}): Promise<T[]> {
    return this._model.find(filter).exec();
  }

  public async findById(id: IdType): Promise<T> {
    return this._model.findById(this.toObjectId(id)).exec();
  }

  public async findOne(filter: any = {}): Promise<T> {
    return this._model.findOne(filter).exec();
  }

  public async create(doc: T): Promise<T> {
    return this._model.create(doc);
  }

  public async update(
    id: IdType,
    updatedDoc: AbstractDocument<T>,
  ): Promise<UpdateResultType<T>> {
    return this._model
      .findByIdAndUpdate(this.toObjectId(id), updatedDoc)
      .exec() as UpdateResultType<T>;
  }

  public async delete(id: IdType): Promise<DeleteResultType<T>> {
    return this._model
      .findByIdAndDelete(this.toObjectId(id))
      .exec() as DeleteResultType<T>;
  }

  private toObjectId(id: string | number): Types.ObjectId {
    return Types.ObjectId(id);
  }
}
