import { Controller } from '@nestjs/common';
import { abstractControllerFactory } from 'nest-abstract';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

const BaseController = abstractControllerFactory<Todo>({
  model: TodoService.todoModel,
  auth: {
    find: false,
  },
});

@Controller('todo')
export class TodoController extends BaseController {
  constructor(private readonly _todoService: TodoService) {
    super(_todoService);
  }
}
