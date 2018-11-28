import { Schema, Model } from 'mongoose';
import { AbstractModel } from 'nest-abstract';

export const todoSchema = new Schema({
  content: {
    type: String,
  },
}, { timestamps: true });

export interface Todo extends AbstractModel {
    content: string;
}
