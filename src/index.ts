import dotenv from 'dotenv';
dotenv.config();
import { config } from './config/config';
import express, { Application } from 'express';
import { expressConfig } from './config/expressConfig';
import { hbsConfig } from './config/hbsConfig';
import { routesConfig } from './config/routesConfig';

function start() {
    const app: Application = express();
    const PORT = config.port;

    expressConfig(app);
    hbsConfig(app);
    routesConfig(app);

    app.listen(PORT, () => console.log(`Server is listening at: http://localhost:${PORT}`));
}

start();
