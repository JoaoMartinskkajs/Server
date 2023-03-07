import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../database/entities/User';

interface JWTPayload{
    _id: string
};

export const authMiddleware = async ( 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {

    try{
        //Verify if has a token
        const { authorization } = req.headers;
        if(!authorization){
            return res.status(400).json( { message: "Not authorized" } )
        };
    
        const token = authorization.split(' ')[1];
        const { _id } = jwt.verify(token, process.env.JWT_pass ?? '') as JWTPayload;
    
        //Verify if exists an user with this id
        const user = await User.findById({_id});
        if(!user){
            return res.status(400).json( { message: "Not authorized" } )
        };
    
        req.user = user;
        next();
    }

    catch(err){
        res.status(500).json({ message: "Internal server error", error: err })
    }
};