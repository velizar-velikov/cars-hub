import { NextFunction, Request, Response, Router } from 'express';
import { isUser } from '../middlewares/guards';
import { validateInputs } from '../validations/validations';
import { validationResult } from 'express-validator';
import carService from '../services/carService';
import { AppError } from '../utils/appError';

const carRouter: Router = Router();

const addCarController = {
    get(req: Request, res: Response) {
        res.render('add-car');
    },
    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const result = validationResult(req);

            if (!result.isEmpty()) {
                result.throw();
            }

            const { _id } = await carService.create(req.body);
            res.redirect(`/cars/${_id}`);
        } catch (error) {
            const data = {
                ...req.body,
                fuel: {
                    Petrol: req.body.fuel == 'Petrol',
                    Diesel: req.body.fuel == 'Diesel',
                    lpg: req.body.fuel == 'LPG',
                    electric: req.body.fuel == 'Electric',
                },
            };
            next(new AppError('add-car', error, data));
        }
    },
};

const editController = {
    async get(req: Request, res: Response) {
        const { id } = req.params;
        const car = await carService.getById(id);

        res.render('edit-car', { data: car });
    },
    async post(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const result = validationResult(req);

            if (!result.isEmpty()) {
                result.throw();
            }

            await carService.edit(id, req.body);
            res.redirect(`/cars/${id}`);
        } catch (error) {
            const data = {
                ...req.body,
                fuel: {
                    Petrol: req.body.fuel == 'Petrol',
                    Diesel: req.body.fuel == 'Diesel',
                    lpg: req.body.fuel == 'LPG',
                    electric: req.body.fuel == 'Electric',
                },
            };
            next(new AppError('add-car', error, data));
        }
    },
};

carRouter.get('/add-car', isUser(), addCarController.get);
carRouter.post('/add-car', isUser(), validateInputs('car'), addCarController.post);
carRouter.get('/cars/:id/edit', isUser(), editController.get);
carRouter.post('/cars/:id/edit', isUser(), validateInputs('car'), editController.post);

export default carRouter;
