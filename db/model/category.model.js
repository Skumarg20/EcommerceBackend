import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLen:{value:3,message:"Title should be at least 3 characters long"},
    },
    image:{
        type:String,
    },
    slug:{
        type:String,
         lowercase:true,

    }

},
     {   timestamps:true}
);

export const Category=mongoose.model("Category",categorySchema);