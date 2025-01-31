import { Request, Response, Router } from 'express';
import carService from '../services/carService';

const catalogRouter: Router = Router();

async function homeController(req: Request, res: Response) {
    const latestCar = (await carService.getLatestOne())[0];
    res.render('home', { car: latestCar });
}

async function dashboardController(req: Request, res: Response) {
    const cars = await carService.getAll();
    res.render('dashboard', { title: 'Cars dashboard', cars });
}

async function detailsController(req: Request, res: Response) {
    const { id } = req.params;
    const car = await carService.getById(id);
    res.render('details', { title: 'Technical Specifications', car });
}

catalogRouter.get('/', homeController);
catalogRouter.get('/cars', dashboardController);
catalogRouter.get('/cars/:id', detailsController);

export default catalogRouter;
