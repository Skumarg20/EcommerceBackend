import slugify from "slugify";
import {catchAsyncError} from './.././utils/catchAsyncError.js'
import {productModel } from '../../../db/model/product.model.js'
import {ApiFeatures} from './.././utils/ApiFeature.js'
import {AppError} from './../utils/AppError.js'

const addProduct=catchAsyncError(async(req,res,next)=>{
   req.body.imagecover=req.files.imagecover[0].filename;
   req.body.images=req.files.images.map((ele)=>ele.filename);
   req.body.slug=slugify(req.body.title);
   const addProduct=new productModel(req.body);
   await addProduct.save();
   res.status(201).json({message:"product added successfully",addProduct})
})

const getAllProduct=catchAsyncError(async(req,res,next)=>{
    const apiFeature=new ApiFeatures(productModel.find(),req.query).fields().filteration().pagination().search().sort()
    const pageNumber=apiFeature.queryString.page*1 || 1;
    
    const allProduct=await apiFeature.mongooseQuery;
    res.status(201).json({message:"success",allProduct,pageNumber});
})

const getProductbyId=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    const getProduct=await productModel.findById(id);
    res.status(201).json({message:"success",getProduct});
})

const updateProduct=catchAsyncError(async(req,res,next)=>{
const {id}=req.params;
if(req.body.title){
    req.body.slug=slugify(req.body.title)}
    const updatedProduct=await productModel.findByIdAndUpdate(id,req.body,{
        new:true
    });
  updatedProduct && res.status(201).json({message:"product updated successfully",updatedProduct});

  !updatedProduct &&  next(new AppError("product is not found"));
})

const deleteProduct=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    const deleteProduct=await productModel.findByIdAndDelete(id);
    deleteProduct && res.status(201).json({message:"product is deleted ",deleteProduct});
    !deleteProduct && next(new AppError("product is not found"));
})

export {
    addProduct,
    updateProduct,
    getProductbyId,
    getAllProduct,
    deleteProduct,
}