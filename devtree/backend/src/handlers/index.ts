import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import slug from "slug";
import formidable from 'formidable'
import {v4 as uuid} from 'uuid'
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";
import cloudinary from "../config/cloudinary";

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

export const getUser = async (req: Request, res: Response) => {
    
    res.json(req.user);

}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const {description} = req.body;
        const handle = slug(req.body.handle, '_');

        const handleExists = await User.findOne({ handle });

        if (handleExists && handleExists.email !== req.user.email) {
            return res.status(409).send({ message: 'Username already exists' });

        }

        // Update User
        req.user.description = description;
        req.user.handle = handle;
        await req.user.save()
        res.send('Profile update correctly')


    } catch (e) {
        const error = new Error("Some failed")
        return res.status(500).json({error : error.message})
    }

}


export const uploadImage = async (req: Request, res: Response) => {

    const form = formidable({multiples: false})
    

    try {
        form.parse(req, (error, fields, files) =>{
            
            cloudinary.uploader.upload(files.image2[0].filepath, { public_id: uuid() }, async function(error, result){
                if(error){
                    const error = new Error("Some failed uploading image")
                    return res.status(500).json({error : error.message})
                }
                if(result){
                    req.user.image = result.secure_url
                    await req.user.save();
                    res.json({image: result.secure_url})
                }
            })
        })
        
    } catch (e) {
        const error = new Error("Some failed")
        return res.status(500).json({error : error.message});
    }

}