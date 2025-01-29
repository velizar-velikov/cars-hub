import { NextFunction, Request, Response } from 'express';

type RequestWithUser = Request & { user?: unknown };

export function isUser() {
    return function (req: RequestWithUser, res: Response, next: NextFunction) {
        if (!req.user) {
            res.redirect('/login');
        } else {
            next();
        }
    };
}

export function isGuest() {
    return function (req: RequestWithUser, res: Response, next: NextFunction) {
        if (req.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
}
