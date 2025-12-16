import { Router } from "express";
import {body} from 'express-validator';
import { createAccount, login } from "./handlers";

const router = Router();

/** Auth and registration */
router.post('/auth/register',
    body('handle').notEmpty().withMessage('Handle is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email not valid'),
    body('password').isLength({min: 8}).withMessage('Password is too short, min 8 characters'),
    createAccount);


router.post('/auth/login', 

    body('email').isEmail().withMessage('Email not valid'),
    body('password').notEmpty().isLength({min: 8}).withMessage('Password is obligatory'),
    login
);


export default router;