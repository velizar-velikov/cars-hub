import { NextFunction, Request, Response } from 'express';
import { config } from '../config/config';
import tokenService from '../services/tokenService';

type RequestWithUser = Request & { user?: unknown };

export function session() {
    return function (req: RequestWithUser, res: Response, next: NextFunction) {
        const token = req.cookies[config.cookie_name];

        if (token) {
            try {
                const payload = tokenService.verify(token);
                req.user = payload;
                res.locals.hasUser = payload;
            } catch (error) {
                res.clearCookie(config.cookie_name);
            }
        }
        req as Request;
        next();
    };
}
