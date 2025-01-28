import dotenv from 'dotenv';
import express, { Application } from 'express';
import { expressConfig } from './config/expressConfig';
import { hbsConfig } from './config/hbsConfig';
import { routesConfig } from './config/routesConfig';

dotenv.config();

function start() {
    const app: Application = express();
    const PORT = process.env.PORT || '3000';

    expressConfig(app);
    hbsConfig(app);
    routesConfig(app);

    app.listen(PORT, () => console.log(`Server is listening at: http://localhost:${PORT}`));
}

start();
