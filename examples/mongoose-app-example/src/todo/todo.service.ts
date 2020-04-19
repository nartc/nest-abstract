import { Todo } from './todo.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractMongooseService } from 'nest-abstract';

@Injectable()
export class TodoService extends AbstractMongooseService<Todo> {
  constructor(@InjectModel('todo') private readonly _todoModel: Model<Todo>) {
    super(_todoModel);
  }
}
