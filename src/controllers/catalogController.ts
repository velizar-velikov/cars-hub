import { Request, Response, Router } from 'express';
import carService from '../services/carService';

const catalogRouter: Router = Router();

function homeController(req: Request, res: Response) {
    res.render('home');
}

async function dashboardController(req: Request, res: Response) {
    const cars = await carService.getAll();
    res.render('dashboard', { title: 'Cars dashboard', cars });
}

function detailsController(req: Request, res: Response) {
    const { id } = req.params;
    res.render('details', { title: id });
}

catalogRouter.get('/', homeController);
catalogRouter.get('/cars', dashboardController);
catalogRouter.get('/cars/:id', detailsController);

export default catalogRouter;
