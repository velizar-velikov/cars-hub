import { Application } from 'express';
import authRouter from '../controllers/authController';
import catalogRouter from '../controllers/catalogController';
import { notFoundController } from '../controllers/notFoundController';

export function routesConfig(app: Application) {
    app.use(catalogRouter);
    app.use(authRouter);
    app.get('*', notFoundController);
}
