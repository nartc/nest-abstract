import { ApiOperation } from '@nestjs/swagger';

export const ApiSwaggerOperation = (options: {
  title: string;
  description?: string;
  operationId?: string;
  deprecated?: boolean;
}): MethodDecorator => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    const controllerName = target.constructor.name;
    ApiOperation({
      ...options,
      operationId: `${controllerName.substr(
        0,
        controllerName.indexOf('Controller'),
      )}_${propertyKey}`,
    })(target, propertyKey, descriptor);
  };
};
