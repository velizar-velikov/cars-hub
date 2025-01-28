import { Request, Response, Router } from 'express';

const catalogRouter: Router = Router();

function homeController(req: Request, res: Response) {
    res.render('home');
}

function dashboardController(req: Request, res: Response) {
    res.render('dashboard', { title: 'Cars dashboard' });
}

function detailsController(req: Request, res: Response) {
    const { id } = req.params;
    res.render('details', { title: id });
}

catalogRouter.get('/', homeController);
catalogRouter.get('/cars', dashboardController);
catalogRouter.get('/cars/:id', detailsController);

export default catalogRouter;
