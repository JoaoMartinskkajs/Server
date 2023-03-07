import User from "../../database/entities/User";
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

export class LoginController{

    async login( req: Request, res: Response ){
        const { email, password } = req.body;

        //Verify missing fields
        if (!email || !password){
            return res.status(400).json( { message: "Missing fields" } )
        };

        try{

            //Verify email and password
            const user = await User.findOne( {email} );
            if(!user){
                return res.status(400).json( { message: "Invalid email or password" } )
            };

            const editedUser = user;
    
            //Verify if the password is correct
            const verifypass = await bcrypt.compare(password, user?.password!);
            if(!verifypass){
                return res.status(400).json( { message: "Invalid email or password" } );
            };
            
            //JTW
            const token = jwt.sign( 
                { _id: user._id }, 
                process.env.JWT_PASS || '', 
                { expiresIn: '30d' }
            );

            res.status(201).json( { 
                user: editedUser,
                token: token
             } );
        }
        
        catch(err){
            return res.status(500).json( { message: "Internal Server Error" } )
        }


    };

    async getProfile( req: Request, res: Response  ){
        try{
            return res.json(req.user)
        }
        catch(err){
            return res.status(500).json( { message: "Internal Server Error" } )
        }
    };
};