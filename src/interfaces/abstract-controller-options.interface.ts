import {DefaultAuthObject} from './default-auth-object.interface';

export interface AbstractControllerOptions<T> {
    model: { new(doc?: any): T };
}

export interface AbstractControllerWithAuthOptions<T> extends AbstractControllerOptions<T> {
    auth: DefaultAuthObject | boolean;
}

export interface AbstractControllerWithSwaggerOptions<T, VM, C> extends AbstractControllerWithAuthOptions<T> {
    modelVm: { new(): VM };
    modelCreate: { new(): C };
}
