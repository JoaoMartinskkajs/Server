import { Request, Response } from "express";
import User from "../../database/entities/User";

import bcrypt from 'bcrypt';
import { generateInvite } from "../../utils/generateInvite";

export class RegisterController{

    async create( req: Request, res: Response ){
        
        const {username,
               firstName,
               lastName,  
               email, 
               password, } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        //Verify missing fields
        if(!username || !firstName || !lastName || !email || !password){
            return res.status(400).json( {message: "Missing fields"} );
        };
        
        //Verify if the email already exists in the Database
        const existsEmail = await User.findOne( { email } );
        if(existsEmail){
            return res.status(400).json({ message: "Email already registered" });
        };

        try{
            const createUser = await User.create({
                username,
                firstName,
                lastName,
                email,
                password: hashPassword,
                inviteCode: generateInvite(7),
                inviteCounts: 0
            });
            
            return res.status(201).json({createUser});
        }

        catch(err){
            return res.status(500).json( { message: "Internal Server Error" } )
        }
    };
}