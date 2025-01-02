import { catchAsyncError } from "../utils/catchAsyncError";
import { AppError } from "../utils/AppError";
import { Category } from "./category.model";
import { ApiFeatures } from "../utils/ApiFeature";


const addCategory=catchAsyncError(async(req,res,next)=>{

    req.body.Image=req.file.filename;
    req.body.slug=req.body.name.toLowerCase().split(' ').join('-');

    const category=await Category(req.body).save();
    res.status(201).json({
        status: "success",
        data: category,
    });
}
);

const getAllCategory=catchAsyncError(async(req,res,next)=>{
    const apiFeature=await ApiFeatures(Category.find(),req.query).pagination().sort().filteration().search().fields();

    const pageNumber=apiFeature.queryString.page*1 || 1;
    const category=await apiFeature.mongooseQuery;

    res.status(200).json({
        page:pageNumber,
        status: "success",
        data: category,
    });
}       
);

const updateCategory=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    const {name}=req.body;
    req.body.slug=req.body.name.toLowerCase().split(' ').join('-');
    const updateCategory=await Category.findByIdAndUpdate(id,req.body,{
        new:true,
    }); 
    if(!updateCategory){
        return next(new AppError("No category found with this id",404));
    }   
    res.status(200).json({
        message:"Category updated",
        status: "success",
        data: updateCategory,
    });
}   
);

const deleteCategory=catchAsyncError(async(req,res,next)=>{ 
    const {id}=req.params;

    const category=await Category.findByIdAndDelete(id);
    if(!category){
        return next(new AppError("No category found with this id",404));
    }
    res.status(204).json({
        message:"Category deleted",
        status: "success",
    });
}   
);

export default {addCategory,getAllCategory,updateCategory,deleteCategory};
