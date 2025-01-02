import mongoose from "mongoose";
import Product from "./product.model";

const orderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    cartItems:[{
         productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
         },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            discountPrice:{
                type:Number,
                required:true
            }
    }],
    paymentStatus:{
        type:String,
        enum:["pending","completed","cancelled"],
        default:"pending"
    },
    paymentType:{
        type:String,
        enum:["cash","card"],
        default:"cash"
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    isDispatched:{
        type:Boolean,
        default:false
    },
    shippingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    deliveryDate:{
        type:Date,
        required:true
    }
}
);

export const Order=mongoose.model("Order",orderSchema);