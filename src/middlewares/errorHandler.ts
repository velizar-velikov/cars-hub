import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/appError';
import { MongooseError } from 'mongoose';

type Errors = {
    [key: string]: string;
};

export function errorHandler() {
    return function (err: AppError & { errors?: Array<any>; data?: object }, req: Request, res: Response, next: NextFunction) {
        const errors: Errors = {};

        if (Array.isArray(err.errors)) {
            // express-validator error
            err.errors?.forEach(({ path, msg }) => (errors[path] = msg));
        } else if (err instanceof MongooseError) {
            // mongoose error
            errors.message = err.message;
        } else if (err.message) {
            // general error thrown by the programmer
            errors.message = err.message;
        }

        res.render(err.view, { errors, data: err.data });
    };
}
