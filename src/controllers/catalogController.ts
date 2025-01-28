import { Request, Response, Router } from 'express';

const catalogRouter: Router = Router();

function homeController(req: Request, res: Response) {
    res.render('home');
}

function dashboardController(req: Request, res: Response) {
    res.render('dashboard', { title: 'Cars dashboard' });
}

catalogRouter.get('/', homeController);
catalogRouter.get('/cars', dashboardController);

export default catalogRouter;
