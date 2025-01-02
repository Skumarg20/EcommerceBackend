import { catchAsyncError } from "../utils/catchAsyncError";
import { AppError } from "../utils/AppError";
import {Brand} from "../../../db/model/brand.model.js"
import { ApiFeatures } from "../utils/ApiFeature.js";

const addBrand=catchAsyncError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name);
    const addBrand=new Brand(req.body).save();
    res.status(201).json({message:"brand added successfully",addBrand});
})

const getAllBrands=catchAsyncError(async(req,res,next)=>{
    let apiFeature=new ApiFeatures(Brand.find(),req.query).pagination().fields().filteration().search().sort();

    const pageNumber=apiFeature.queryString.page*1 || 1;
    const getAllBrands=await apiFeature.mongooseQuery;

    res.status(201).json({page:pageNumber,message:"success",getAllBrands});
})

const updateBrand=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    req.body.slug=slugify(req.body.name);
    const updateBrand=await Brand.findByIdAndUpdate(id,req.body,{
        new:true,
    })
    updateBrand && res.status(201).json({message:"brand updated successfully"});

    !updateBrand && res.status(404).json({message:"brand not found"});
})

const deleteBrand=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    const brand=await Brand.findByIdAndDelete(id);

    if(!brand){
return res.status(404).json({message:"brand not found"});

    }
   res.status(201).json({message:"brand is deleted successfully"});
})
export {addBrand,getAllBrands,updateBrand,deleteBrand};