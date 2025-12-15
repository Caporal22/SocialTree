import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import slug from "slug";
import User from "../models/User";
import colors from "colors";
import { hashPassword } from "../utils/auth";

export const createAccount =  async (req: Request, res: Response) => {

    // Errors control 
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const {email, password } = req.body;
 
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).send({ message: 'Email already exists' });
    }

    const handle = slug(req.body.handle, '_');

    const handleExists = await User.findOne({ handle });

    if (handleExists) {
        return res.status(400).send({ message: 'Username already exists' });
    }


    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;

    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
}

