import { Document } from 'mongoose';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface AbstractModel extends Document {
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
}

@Entity()
export class AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updatedAt?: string;

  static get modelName(): string {
    return this.name;
  }
}
