import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    passwordChangeAt:Date,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    isActive:{
        type:Boolean,
        default:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    blocked:{
        type:Boolean,
        default:false
    },
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    addresses:[{
        city:String,
        street:String,
        phone:String
      }]


},
{
    timestamps:true
});

const User=mongoose.model("User",userSchema);
export default User;