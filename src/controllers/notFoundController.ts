import { Request, Response } from 'express';

export function notFoundController(req: Request, res: Response) {
    res.render('404');
}
