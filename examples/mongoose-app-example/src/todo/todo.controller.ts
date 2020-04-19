import { Controller } from '@nestjs/common';
import { abstractControllerWithSwagger } from 'nest-abstract';
import { Todo, TodoVm } from './todo.model';
import { TodoService } from './todo.service';

const BaseController = abstractControllerWithSwagger<Todo>({
  model: TodoService.model,
  modelVm: TodoVm,
  modelCreate: TodoVm,
  auth: {
    find: true,
  },
});

@Controller('todo')
export class TodoController extends BaseController {
  constructor(private readonly _todoService: TodoService) {
    super(_todoService);
  }
}
