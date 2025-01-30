import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

const validations = {
    register: [
        body('email').trim().isEmail().withMessage('Email must be a valid email address'),
        body('password').trim().isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
        body('repass')
            .trim()
            .custom((value, { req }) => value === req.body.password)
            .withMessage('Both password must match'),
    ],
    car: [],
};

export function validateInputs(validationType: 'register' | 'car') {
    return async function (req: Request, res: Response, next: NextFunction) {
        for (const validation of validations[validationType]) {
            await validation.run(req);
        }

        next();
    };
}
