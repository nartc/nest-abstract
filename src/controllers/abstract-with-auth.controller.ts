import {
    Body,
    Delete,
    Get,
    InternalServerErrorException,
    Logger,
    Param,
    Post,
    Put,
    Query,
    UseGuards
} from "@nestjs/common";
import {AuthGuard} from '@nestjs/passport';
import {AbstractControllerWithAuthOptions} from "../interfaces";
import {getAuthObj, NpmHelper} from "../utils";
import {AbstractCoreService} from "../abstract-core.service";
import {Authenticate} from "../decorators";
import {AUTH_GUARD_TYPE} from "../constants";
import {AbstractDocument, DeleteResultType, UpdateResultType} from "../types";

export function abstractControllerWithAuth<T>(options: AbstractControllerWithAuthOptions<T>): any {
    const model = options.model;
    const auth = getAuthObj(options.auth);

    if (auth && !NpmHelper.isPassportInstalled) {
        const errorMessage =
            'Missing Passport dependencies. Please install passport and @nestjs/passport';
        Logger.error(errorMessage);
        throw new Error(errorMessage);
    }

    abstract class AbstractController {
        protected readonly _service: AbstractCoreService<T>;

        protected constructor(service: AbstractCoreService<T>) {
            this._service = service;
        }

        @Get()
        @Authenticate(!!auth && auth.find, UseGuards(AuthGuard(AUTH_GUARD_TYPE)))
        public async find(@Query('filter') filter: string): Promise<T[]> {
            const findFilter = filter ? JSON.parse(filter) : {};

            try {
                return this._service.find(findFilter);
            } catch (e) {
                throw new InternalServerErrorException(e);
            }
        }

        @Get(':id')
        @Authenticate(
            !!auth && auth.findById,
            UseGuards(AuthGuard(AUTH_GUARD_TYPE)),
        )
        public async findById(@Param('id') id: string): Promise<T> {
            try {
                return this._service.findById(id);
            } catch (e) {
                throw new InternalServerErrorException(e);
            }
        }

        @Post()
        @Authenticate(!!auth && auth.create, UseGuards(AuthGuard(AUTH_GUARD_TYPE)))
        public async create(@Body() doc: Partial<T>): Promise<T> {
            try {
                const newObject = new model(doc);
                return this._service.create(
                    newObject as AbstractDocument<T>,
                );
            } catch (e) {
                throw new InternalServerErrorException(e);
            }
        }

        @Put(':id')
        @Authenticate(!!auth && auth.update, UseGuards(AuthGuard(AUTH_GUARD_TYPE)))
        public async update(
            @Param('id') id: string,
            @Body() doc: Partial<T>,
        ): Promise<UpdateResultType<T>> {
            try {
                const existed = await this._service.findById(id);
                const updatedDoc = {...(existed as any), ...(doc as any)} as any;
                return this._service.update(id, updatedDoc);
            } catch (e) {
                throw new InternalServerErrorException(e);
            }
        }

        @Delete(':id')
        @Authenticate(!!auth && auth.delete, UseGuards(AuthGuard(AUTH_GUARD_TYPE)))
        public async delete(@Param('id') id: string): Promise<DeleteResultType<T>> {
            try {
                return this._service.delete(id);
            } catch (e) {
                throw new InternalServerErrorException(e);
            }
        }
    }

    return AbstractController;
}
