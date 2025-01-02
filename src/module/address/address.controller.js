import { catchAsyncError } from "../utils/catchAsyncError";
import { ApiFeatures } from "../utils/ApiFeature";
import {User} from '../../../db/model/user.model.js'
import { AppError } from "../utils/AppError";

const addAddress=catchAsyncError(async(req,res,next)=>{
    const addAddress=await User.findByIdAndUpdate(
        req.user._id,
        {$addToSet:{addresses:req.body}},
        {new:true}
    );

    addAddress && res.status(201).json({message:"success",addAddress:addAddress.addresses});

    !addAddress && next(new AppError("Address not found",404));
})

const removeAddress=catchAsyncError(async(req,res,next)=>{
    const removeAddress=await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull:{addresses:{_id:req.body.address}}

    },{
        new:true
    })

    removeAddress && res.status(201).json({message:"success",removeAddress:removeAddress.address});

    !removeAddress && next(new AppError("address was not found",404));
})

const getAllAddress=catchAsyncError(async(req,res,next)=>{
    const getAllAdress=await User.findOne({_id:req.user._id});

    getAllAddress && res.status(201).json({message:"success",getAllAddress:getAllAddress.address});

    !getAllAddress && next(new AppError("addresses are not found"));
})

export {addAddress,removeAddress,getAllAddress}