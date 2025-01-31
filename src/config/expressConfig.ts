import { Application, urlencoded, static as static_ } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { session } from '../middlewares/session';

export function expressConfig(app: Application) {
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(session());
    app.use('/static', static_('static'));
    app.use(urlencoded({ extended: true }));
}
