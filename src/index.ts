import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { expressConfig } from './config/expressConfig';
import { hbsConfig } from './config/hbsConfig';

dotenv.config();

function start() {
    const app: Application = express();
    const PORT = process.env.PORT || '3000';

    expressConfig(app);
    hbsConfig(app);

    app.get('/', (req, res) => {
        res.render('login');
    });

    app.listen(PORT, () => console.log(`Server is listening at: http://localhost:${PORT}`));
}

start();
