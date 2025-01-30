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
            console.log(req.body);

            const { _id } = await carService.create(req.body);
            res.redirect(`/cars/${_id}`);
        } catch (error) {
            next(new AppError('add-car', error, req.body));
        }
    },
};

carRouter.get('/add-car', isUser(), addCarController.get);
carRouter.post('/add-car', isUser(), validateInputs('car'), addCarController.post);

export default carRouter;
