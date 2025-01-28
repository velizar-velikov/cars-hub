import { Application } from 'express';
import authRouter from '../controllers/authController';
import catalogRouter from '../controllers/catalogController';

export function routesConfig(app: Application) {
    app.use(catalogRouter);
    app.use(authRouter);
}
