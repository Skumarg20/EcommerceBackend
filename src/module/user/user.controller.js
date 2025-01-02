import { catchAsyncError } from "../utils/catchAsyncError";
import { AppError } from "../utils/AppError";
import { User } from "./user.model";
import { ApiFeatures } from "../utils/ApiFeature";

const addUser = catchAsyncError(async (req, res, next) => {
    const user = await User(req.body).save();   
    res.status(201).json({
        status: "success",
        data: user,
    });
  
    }
);

const getAllUser = catchAsyncError(async (req, res, next) => {
    const apifeature= await ApiFeatures(User.findAll(),req.query).pagination().sort().filteration().search().fields();

    const pageNumber=apifeature.queryString.page*1 || 1;
    const user= await apifeature.mongooseQuery;
    res.status(200).json({
        page:pageNumber,
        status: "success",
        data: user,
    });

    }   
);

const updateUser = catchAsyncError(async (req, res, next) => {
    const {id}=req.params;
    const user = await User.findByIdAndUpdate(id,req.body,{
        new:true,
    });
    if(!user){
        return next(new AppError("No user found with this id",404));
    }
    res.status(200).json({
        message:"User updated",
        status: "success",
        data: user,
    });
    }
    );

    const changeUserPassword=catchAsyncError(async (req,res,next)=>{
        const {id}=req.params;
        const user= await User.findById(id).select('+password');
        if(!user){
            return next(new AppError("No user found with this id",404));
        }
        user.password=req.body.password;
        await user.save();
        res.status(200).json({
            message:"Password updated",
            status: "success",
            data: user,
        });
    });
const deleteUser = catchAsyncError(async (req, res, next) => {
    const {id}=req.params;
    const user = await User.findByIdAndDelete(id);
    if(!user){
        return next(new AppError("No user found with this id",404));
    }
    res.status(204).json({
        message:"User deleted",
        status: "success",
        data: null,
    });
    }
);

export { addUser, getAllUser, updateUser, deleteUser,changeUserPassword };
