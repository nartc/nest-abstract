import { AbstractCoreService, AbstractMongooseService } from 'nest-abstract';
import { Todo } from './todo.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodoService extends AbstractMongooseService<Todo> {
    static todoModel: Model<Todo>;

    constructor(@InjectModel('todo') private readonly _todoModel: Model<Todo>) {
        super();
        this._model = _todoModel;
        TodoService.todoModel = _todoModel;
    }
}
