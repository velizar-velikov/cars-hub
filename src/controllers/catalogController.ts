import { Request, Response, Router } from 'express';

const catalogRouter: Router = Router();

function homeController(req: Request, res: Response) {
    res.render('home');
}

catalogRouter.get('/', homeController);

export default catalogRouter;
