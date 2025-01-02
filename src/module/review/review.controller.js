import {catchAsyncError} from '../../utils/catchAsync';
import {AppError} from '../../utils/appError';
import {ApiFeatures} from '../../utils/apiFeatures';
import {Review} from './review.model';

const addReview=catchAsyncError(async (req,res,next)=>{
    req.body.userId=req.user._id;
    let isReviewed=await Review.findOne({
        userId:req.user._id,
        productId:req.body.productId
    });
    if(isReviewed){
        return next(new AppError('You have already reviewed this product',400));
    }
    const review=await Review.create(req.body);
    res.status(201).json({
        status:'success',
        data:{
            review
        }
    });
}
);

const getAllReviews=catchAsyncError(async (req,res,next)=>{
    const features=new ApiFeatures(Review.find(),req.query).filter().sort().limitFields().paginate();

    const pageNumber=features.queryString.page*1||1;
    const reviews=await features.mongooseQuery;
    res.status(200).json({
        status:'success',
        page:pageNumber,
        results:reviews.length,
        data:{
            reviews
        }
    });
}
);

const getSpecificReview= catchAsyncError(async (req,res,next)=>{
    const review=await Review.findById(req.params.id);
    if(!review){
        return next(new AppError('No review found with that id',404));
    }
    res.status(200).json({
        status:'success',
        data:{
            review
        }
    });
}
);

const updateReview=catchAsyncError(async (req,res,next)=>{
    const {id}=req.params;

    const review=await Review.findByIdAndUpdate({_id:id,userId:req.user._id},req.body,{
        new:true,
        runValidators:true
    }); 
    if(!review){
        return next(new AppError('No review found with that id',404));
    }
    res.status(200).json({
        status:'success',
        data:{
            review
        }
    });
}
);

const deleteReview=catchAsyncError(async (req,res,next)=>{  
    const {id}=req.params;
    const review=await Review.findOneAndDelete({_id:id,userId:req.user._id});
    if(!review){
        return next(new AppError('No review found with that id',404));
    }
    res.status(204).json({
        status:'success',
        data:null
    });
}
);

export { addReview, getAllReviews, getSpecificReview, updateReview, deleteReview };
