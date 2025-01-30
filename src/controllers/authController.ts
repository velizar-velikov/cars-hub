import { NextFunction, Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';
import { authService } from '../services/authService';
import tokenService from '../services/tokenService';
import { config } from '../config/config';
import { isGuest, isUser } from '../middlewares/guards';
import { validateInputs } from '../validations/validations';
import { AppError } from '../utils/appError';

const authRouter: Router = Router();

const loginController = {
    get(req: Request, res: Response) {
        res.render('login');
    },
    async post(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const user = await authService.login(email, password);
            const token = tokenService.create(user);
            res.cookie(config.cookie_name, token, { httpOnly: true });
            res.redirect('/');
        } catch (error) {
            next(new AppError('login', error, req.body));
        }
    },
};

const registerController = {
    get(req: Request, res: Response) {
        res.render('register');
    },
    async post(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const result = validationResult(req);

            if (!result.isEmpty()) {
                result.throw();
            }

            const user = await authService.register(email, password);
            const token = tokenService.create(user);
            res.cookie(config.cookie_name, token, { httpOnly: true });
            res.redirect('/');
        } catch (error) {
            next(new AppError('register', error, req.body));
        }
    },
};

const logoutController = async (req: Request, res: Response) => {
    res.clearCookie(config.cookie_name);
    res.redirect('/');
};

authRouter.get('/login', isGuest(), loginController.get);
authRouter.post('/login', isGuest(), loginController.post);
authRouter.get('/register', isGuest(), registerController.get);
authRouter.post('/register', isGuest(), validateInputs('register'), registerController.post);
authRouter.get('/sign-out', isUser(), logoutController);

export default authRouter;
