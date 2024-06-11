import { check, validationResult } from 'express-validator';

export const validateAddress = [
    check('fullName').notEmpty().withMessage('Full name is required'),
    check('addressLine1').notEmpty().withMessage('Address line 1 is required'),
    check('neighborhood').notEmpty().withMessage('Neighborhood is required'),
    check('street').notEmpty().withMessage('Street is required'),
    check('doorNumber').notEmpty().withMessage('Door number is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('state').notEmpty().withMessage('State is required'),
    check('postalCode').notEmpty().withMessage('Postal code is required'),
    check('phoneNumber').notEmpty().withMessage('Phone number is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
