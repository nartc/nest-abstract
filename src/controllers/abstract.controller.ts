import { AbstractControllerOptions } from '../interfaces';
import { AbstractCoreService } from '../abstract-core.service';
import {
  Body,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AbstractDocument, DeleteResultType, UpdateResultType } from '../types';

export function abstractControllerFactory<T>(
  options: AbstractControllerOptions<T>,
): any {
  const model = options.model;

  abstract class AbstractController {
    protected readonly _service: AbstractCoreService<T>;

    protected constructor(service: AbstractCoreService<T>) {
      this._service = service;
    }

    @Get()
    public async find(@Query('filter') filter: string): Promise<T[]> {
      const findFilter = filter ? JSON.parse(filter) : {};

      try {
        return this._service.find(findFilter);
      } catch (e) {
        throw new InternalServerErrorException(e);
      }
    }

    @Get(':id')
    public async findById(@Param('id') id: string): Promise<T> {
      try {
        return this._service.findById(id);
      } catch (e) {
        throw new InternalServerErrorException(e);
      }
    }

    @Post()
    public async create(@Body() doc: Partial<T>): Promise<T> {
      try {
        const newObject = new model(doc);
        return this._service.create(newObject as AbstractDocument<T>);
      } catch (e) {
        throw new InternalServerErrorException(e);
      }
    }

    @Put(':id')
    public async update(
      @Param('id') id: string,
      @Body() doc: Partial<T>,
    ): Promise<UpdateResultType<T>> {
      try {
        const existed = await this._service.findById(id);
        const updatedDoc = { ...(existed as any), ...(doc as any) } as any;
        return this._service.update(id, updatedDoc);
      } catch (e) {
        throw new InternalServerErrorException(e);
      }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<DeleteResultType<T>> {
      try {
        return this._service.delete(id);
      } catch (e) {
        throw new InternalServerErrorException(e);
      }
    }
  }

  return AbstractController;
}
