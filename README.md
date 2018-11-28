<h1 align="center">Nestjs Abstract</h1>

<p align="center">Abstraction component for NestJs.</p>

Fair warning: This package is still in early development stage. Please give me any feedbacks if you decide to try it out and find any problems/area-for-improvements. Thank you!

## Features
- Provides **Abstractions** for your `NestJS` **RESTfulAPI**.
- Includes: `AbstractModule`, `AbstractService`, and `AbstractControllerFactory` along with `AbstractModel` (`mongoose`) and `AbstractEntity` (`typeorm`).
- [ ] Supports `@nestjs/swagger`

## Motivations

I am a big fan of `TypeScript` and **abstraction** overall. One of the biggest motivations is to create a `BaseController` to work with `Swagger`'s decorators that `@nestjs/swagger` provides which is on the todo list. Main reason is I want to roll out a version of the package that will make it work with `non-swagger` applications first as this is my first attempt at an `npm` package.

## Installation
`npm i nest-abstract`

## Usage

1. Import `AbstractModule` in your `AppModule`
   ```typescript
    import { Module } from '@nestjs/common';
    import { AbstractModule } from 'nest-abstract';

    @Module({
        imports: [AbstractModule.forRoot()],
    })
    export class AppModule {}
   ```

   > By default, `AbstractModule` will use `Mongoose`. You can pass an object of type `AbstractModuleOptions` to the `forRoot()` method.

    ```typescript
    import { Module } from '@nestjs/common';
    import { AbstractModule, ObjectMapping } from 'nest-abstract';

    @Module({
        imports: [AbstractModule.forRoot({objectMapping: ObjectMapping.TypeOrm})],
    })
    export class AppModule {}
   ```
   
   > Note: `ObjectMapping.Mongoose` will require you to install `mongoose` and `@nestjs/mongoose` while `ObjectMapping.TypeOrm` will require you to install `typeorm` and `@nestjs/typeorm`.

    *Note: I will list the usage for Mongoose from step 2 on.*

2. Create your `MongooseSchema` and create an **interface** that will extend `AbstractModel`. `AbstractModel` is an **interface** that has: `createdAt`, `updatedAt` and `id`.
   
   ```typescript
   import { Schema } from 'mongoose';
   import { AbstractModel } from 'nest-abstract';
   
   const todoSchema = new Schema({
       content: {
           type: String
       }
   }, { timestamps: true });

   interface Todo extends AbstractModel {
       content: string;
   }
   ```

   > Use your `schema` to initialize your `Model` with `@nestjs/mongoose`.

3. Create your `Service` with `AbstractMongooseService`.
   ```typescript
   import { Injectable } from '@nestjs/common';
   import { InjectModel } from '@nestjs/mongoose';
   import { AbstractMongooseService } from 'nest-abstract';
   import { Model } from 'mongoose';

   @Injectable()
   export class TodoService extends AbstractMongooseService<Todo> {
       constructor(@InjectModel('todo') private readonly _todoModel: Model<Todo>) {
           super(_todoModel);
       }
   }
   ```
   > Use `@InjectModel()` from `@nestjs/mongoose` to inject your **MongooseModel** and pass that to the *abstract* constructor.

4. Create your `Controller` with `abstractControllerFactory`
    ```typescript
    import { Controller } from '@nestjs/common';
    import { abstractControllerFactory } from 'nest-abstract';
    import { Todo } from './todo.model';
    import { TodoService } from './todo.service';

    const BaseController = abstractControllerFactory<Todo>({
        model: TodoService.model,
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
    ```

5. Make sure you put your `Service` in `providers` array in `Module` and your `Controller` in `controllers` array in `Module`.
   
   > Now your `TodoController` should have 5 pre-defined route handlers: `find`, `findById`, `create`, `update` and `delete`

## Plans

- Might break `abstractControllerFactory` out to 3 separate factories: normal, swagger and withAuth
- Supports `Serialization` (https://docs.nestjs.com/techniques/serialization)?
- anything? 

## Credit
- @rcanessa89 and his/her repository: https://github.com/rcanessa89/nest-js-starter. rcanessa89 first raised an issue regarding a `BaseController` on my `nest-mean` repository and came up with his/her `BaseController`.
