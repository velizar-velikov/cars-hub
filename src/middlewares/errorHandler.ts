import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/appError';

type Errors = {
    [key: string]: string;
};

export function errorHandler() {
    return function (err: AppError & { errors?: Array<any>; data?: object }, req: Request, res: Response, next: NextFunction) {
        const errors: Errors = {};

        if (err.errors) {
            err.errors.forEach(({ path, msg }) => (errors[path] = msg));
        } else if (err.message) {
            errors.message = err.message;
        }

        res.render(err.view, { errors, data: err.data });
    };
}
