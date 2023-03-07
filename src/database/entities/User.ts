import mongoose, { Schema } from 'mongoose';

export interface User{
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    inviteCode: string,
    inviteCounts:number
}

const User = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    inviteCode: String,
    inviteCounts: Number
});

export default mongoose.model("Users", User);