import { Request, Response, Router } from 'express';
import carService from '../services/carService';
import { Types } from 'mongoose';

const catalogRouter: Router = Router();

async function homeController(req: Request, res: Response) {
    const latestCar = (await carService.getLatestOne())[0];
    res.render('home', { car: latestCar });
}

async function dashboardController(req: Request, res: Response) {
    const cars = await carService.getAll();
    res.render('dashboard', { title: 'Cars dashboard', cars });
}

async function detailsController(req: Request & { user?: { _id: Types.ObjectId } }, res: Response) {
    const { id } = req.params;
    const car = await carService.getById(id);

    const isOwner = Boolean(req.user && req.user._id.toString() === car._ownerId.toString());

    res.render('details', { title: 'Technical Specifications', car, isOwner });
}

catalogRouter.get('/', homeController);
catalogRouter.get('/cars', dashboardController);
catalogRouter.get('/cars/:id', detailsController);

export default catalogRouter;
