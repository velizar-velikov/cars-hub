import { Application } from 'express';
import { create } from 'express-handlebars';

export function hbsConfig(app: Application) {
    const hbs = create({
        extname: '.hbs',
    });
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');
}
