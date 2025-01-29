import { Application, urlencoded, static as static_ } from 'express';
import cookieParser from 'cookie-parser';
import { session } from '../middlewares/session';

export function expressConfig(app: Application) {
    app.use(cookieParser());
    app.use(session());
    app.use('/static', static_('static'));
    app.use(urlencoded({ extended: true }));
}
