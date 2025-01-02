import {catchAsyncError} from '../../utils/catchError';
import slugify from 'slugify';
import {ApiFeatures} from '../../utils/ApiFeatures';
const addSubCategory = catchAsyncError(async (req, res,next) => {
    req.body.slug=slugify(req.body.name);
    const subCategory = await SubCategory(req.body).save();


    res.status(201).json({
        status: 'success',
        data: {
            subCategory
        }
    });
});
const getAllSubCategories = catchAsyncError(async (req, res,next) => {
    let filter = {};
    if(req.query.category){
        filter = {category: req.query.category};
    }
  
    const apiFeatures=new ApiFeatures(SubCategory.find(filter),req.query).filteration();
    const subCategories = await apiFeatures.mongooseQuery;

    res.status(200).json({
        status: 'success',
        data: {
            subCategories
        }
    });
}
);

const updateSubCategory = catchAsyncError(async (req, res,next) => {
    const {id}  = req.params;
    if(req.body.name){
        req.body.slug=slugify(req.body.name);
    }
    const subCategory = await SubCategory.findByIdAndUpdate(id, req.body,{
        new:true,
    }
    );                  
    res.status(200).json({
        status: 'success',
        data: {
            subCategory
        }
    });
}
);

const deleteSubCategory = catchAsyncError(async (req, res,next) => { 
    const {id}  = req.params;
    await SubCategory.findByIdAndDelete(id);
    res.status(204).json({
        status: 'success',
        data: null
    });
}
);

export {addSubCategory,getAllSubCategories,updateSubCategory,deleteSubCategory};