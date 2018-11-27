import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { AbstractModel } from '../../../dist';
import { Schema } from 'mongoose';

interface AppModel extends AbstractModel {
  test: string;
}

export const appSchema = new Schema(
  {
    test: {
      type: String,
    },
  },
  { timestamps: true },
);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }
}
