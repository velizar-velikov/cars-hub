import { Request, Response, Router } from 'express';

const carRouter: Router = Router();

function addCarGetController(req: Request, res: Response) {
    res.render('add-car');
}

carRouter.get('/add-car', addCarGetController);

export default carRouter;
