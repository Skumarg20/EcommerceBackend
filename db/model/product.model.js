import mongoose from "mongoose";

const PruoductSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    trim:true,
    minLen:{value:3,message:"Title should be at least 3 characters long"},
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minLen:{value:10,message:"Description should be at least 10 characters long"},
        maxLen:{value:200,message:"Description should be at most 200 characters long"},
    },
    imgcover:{
        type:String,
        trim:true,
    },
    image:{
        type:[String],
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
        default:0,
        min:0
    },
    priceAfterDiscount:{
        type:Number,
        default:0,
        min:0
    },
    qunaity:{
        type:Number,
        default:0,
        required:true,
        min:0
    },
    sold:{
        type:Number,
        default:0,
        min:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    subcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subcategory",
        required:true,
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Brand",
        required:true,
    },
    ratingsAverage:{
        type:Number,
        default:4.5,
        min:{value:1,message:"Rating should be at least 1"},
        max:{value:5,message:"Rating should be at most 5"},
        set:val=>Math.round(val*10)/10
    },
    ratingsQuantity:{
        type:Number,
        default:0,
    },
   
  });

    const Product = mongoose.model("Product", PruoductSchema);
    export default Product;