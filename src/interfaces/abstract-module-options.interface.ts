export enum ObjectMapping {
    Mongoose = 'mongoose',
    TypeOrm = 'typeorm'
}

export interface AbstractModuleOptions {
    objectMappingType: ObjectMapping;
    withSwagger?: boolean;
}
