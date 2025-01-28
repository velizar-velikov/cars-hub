import { Application, urlencoded, static as static_ } from 'express';

export function expressConfig(app: Application) {
    app.use('/static', static_('static'));
    app.use(urlencoded({ extended: true }));
}
