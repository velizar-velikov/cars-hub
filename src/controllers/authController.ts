import { Request, Response, Router } from 'express';

const authRouter: Router = Router();

function loginController(req: Request, res: Response) {
    res.render('login');
}

function registerController(req: Request, res: Response) {
    res.render('register');
}

authRouter.get('/login', loginController);
authRouter.get('/register', registerController);

export default authRouter;
