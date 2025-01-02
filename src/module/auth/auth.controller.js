import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {User} from '../../db/models/user.model.js';
import { catchAsyncError } from '../utils/catchAsyncError.js';
import { AppError } from '../utils/AppError.js';
const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');

const signup=catchAsyncError(async(req,res,next)=>{
   const userExists=await User.findOne({email:req.body.email});
   if(userExists) return next(new AppError("User already exists"));
    const hashPassword=await bcrypt.hash(req.body.password,12);
    const user=new User(...req.body,hashPassword);
     await user.save();
     delete user.password;
     const token=jwt.sign( { email: user.email, name: user.name, id: user._id, role: user.role },secretKey,
        {expiresIn:"1h"});
     res.status(201).json({message:"User created successfully",user,token});
});

const login=async(req,res,next)=>{
    
        const user=await User.findOne({     
            email:req.body.email
        });
        if(!user) return next(new AppError("Invalid email or password"));
        const isMatch=await bcrypt.compare(req.body.password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid email or password"});
        delete user.password;
        const token=jwt.sign( { email: user.email, name: user.name, id: user._id, role: user.role },secretKey,
            {expiresIn:"1h"});
        res.status(200).json({message:"Login successful",user,token});
    
}

const protectedRoutes=catchAsyncError(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1];
    }
    if(!token) return next(new AppError("You are not logged in",401));
    let decoded=jwt.verify(token,secretKey,(err,decoded)=>{
        if(err) return next(new AppError("Invalid token",401));
    });
    let user=await User.findById(decoded.id);
    if(!user) return next(new AppError("User does not exist",401));
    if(user.passwordChangeAt){
        let passwordChangeAt=parseInt(user.passwordChangeAt.getTime()/1000,10);
        if(decoded.iat<passwordChangeAt) return next(new AppError("Password changed recently",401));

    }
    req
    next();
});

const allowedTo=(...roles)=>{
    return catchAsyncError(async(req,res,next)=>{
        if(!roles.includes(req.user.role)) return next(new AppError("You are not allowed to perform this action",403));
        next();
    } );
};

export {signup,login,protectedRoutes,allowedTo};
