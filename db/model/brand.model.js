import mongoose from "mongoose";

const brandSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    logo:{
        type:String,
        trim:true
    },
    slug:{
        type:String,
        unique:true,
        required:true
    }
});

const Brand=mongoose.model("Brand",brandSchema);
export default Brand;