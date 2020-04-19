import { Schema, Model } from 'mongoose';
import { AbstractModel } from 'nest-abstract';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';

export const todoSchema = new Schema(
  {
    content: {
      type: String,
    },
  },
  { timestamps: true },
);

export interface Todo extends AbstractModel {
  content: string;
}

export class TodoVm {
  @ApiModelPropertyOptional({ type: String, format: 'date-time' })
  createdAt?: Date;

  @ApiModelPropertyOptional({ type: String, format: 'date-time' })
  updatedAt?: Date;

  @ApiModelPropertyOptional() id?: string;
  @ApiModelProperty()
  content: string;
}
