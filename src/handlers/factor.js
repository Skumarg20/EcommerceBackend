import {AppError} from '../src/module/utils/AppError';  
import { catchAsyncError } from '../module/utils/catchAsyncError';

export const deleteOne=(model,name)=>{
    return catchAsyncError(async(req,res,next)=>{
        const {id}=req.params;
        const doc=await model.findByIdAndDelete(id,{
            new:true,
        });        
        let response={};
        response[name]=doc;
        console.log(response)
        if(!doc){
            return next(new AppError(`No ${name} found with this id`,404));
        }   
        res.status(204).json({
            message:`${name} deleted`,
            status: "success",
            data: response,
        });


}
);
}   