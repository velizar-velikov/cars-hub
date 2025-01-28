import { Application } from 'express';
import authRouter from '../controllers/authController';

export function routesConfig(app: Application) {
    app.use(authRouter);
}
