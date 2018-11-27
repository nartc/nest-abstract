import { DefaultAuthObject } from './default-auth-object.interface';

export interface AbstractControllerOptions<T> {
  model: { new (doc?: any): T };
  auth?: DefaultAuthObject | boolean;
}
