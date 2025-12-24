import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import slug from "slug";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export const createAccount =  async (req: Request, res: Response) => {

    const {email, password } = req.body;
 
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(409).send({ message: 'Email already exists' });
    }

    const handle = slug(req.body.handle, '_');

    const handleExists = await User.findOne({ handle });

    if (handleExists) {
        return res.status(409).send({ message: 'Username already exists' });

    }


    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;

    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
}

export const login = async (req: Request, res: Response) => {


    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    const {email, password } = req.body;
 
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ message: "User doesn't exist" });
    }

    // Check password
    const isPasswordCorrect = await checkPassword(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).send({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = generateJWT({id: user._id});
    res.send({ token });
    // console.log(colors.green('User logged in:'), user.email);
    // console.log(user.password);
    // res.send({ message: 'Login successful' });


}
