import dotenv from 'dotenv';
dotenv.config();
import { config } from './config/config';
import express, { Application } from 'express';
import { expressConfig } from './config/expressConfig';
import { hbsConfig } from './config/hbsConfig';
import { routesConfig } from './config/routesConfig';
import { databaseConfig } from './config/databaseConfig';
import { errorHandler } from './middlewares/errorHandler';

async function start() {
    const app: Application = express();
    const PORT = config.port;

    await databaseConfig();

    expressConfig(app);
    hbsConfig(app);
    routesConfig(app);
    app.use(errorHandler());

    app.listen(PORT, () => console.log(`Server is listening at: http://localhost:${PORT}`));
}

start();
