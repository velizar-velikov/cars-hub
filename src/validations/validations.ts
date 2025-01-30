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
    car: [
        body('brand').trim().isLength({ min: 3 }).withMessage('brand must be at least 3 characters long'),
        body('model').trim().isLength({ min: 3 }).withMessage('model must be at least 3 characters long'),
        body('engine').trim().isLength({ min: 3 }).withMessage('engine must be at least 3 characters long'),
        body('fuel').trim().isIn(['Petrol', 'Diesel', 'LPG', 'Electric']).withMessage('fuel must be one of the provided types'),
        body('doors').trim().isInt({ gt: 3, lt: 8 }).withMessage('doors must be a number between 3 and 8'),
        body('wheels').trim().isLength({ min: 3 }).withMessage('wheels must be at least 3 characters long'),
        body('dimensions').trim().isLength({ min: 10 }).withMessage('dimensions must be at least 10 characters long'),
        body('imageUrl').trim().isURL({ require_tld: false, require_protocol: true }).withMessage('imageUrl must be a valid URL'),
        body('tuning').trim().isLength({ min: 10 }).withMessage('tuning must be at least 10 characters long'),
        body('description').trim().isLength({ min: 10 }).withMessage('description must be at least 10 characters long'),
    ],
};

export function validateInputs(validationType: 'register' | 'car') {
    return async function (req: Request, res: Response, next: NextFunction) {
        for (const validation of validations[validationType]) {
            await validation.run(req);
        }

        next();
    };
}
