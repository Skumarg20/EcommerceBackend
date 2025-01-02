import { AppError } from "../utils/AppError";
import { catchAsyncError } from "../utils/catchAsyncError";
import { cartModel } from "../../../db/model/cart.model";
import {productModel} from '../../../db/model/product.model';
import {couponModel} from '../../../db/model/coupon.model';


const calcTotalPrice=(cart)=>{
    let totalPrice=0;
    cart.cartItems.forEach((item)=>{
        totalPrice+=item.quantity*item.price;
    })
    cart.totalPrice=totalPrice;
}
const calcTotalPriceAfterDiscount=(cart)=>{ 
    let totalPriceAfterDiscount=0;
    cart.cartItems.forEach((item)=>{
        totalPriceAfterDiscount+=item.quantity*item.DiscountedPrice;
    })
    cart.totalPriceAfterDiscount=totalPriceAfterDiscount;
}
const calcDiscount=(cart)=>{    
    let discount=0;
    cart.cartItems.forEach((item)=>{
        discount+=item.quantity*(item.price-item.DiscountedPrice);
    })
    cart.discount=discount;
}
const addProductToCart = catchAsyncError(async (req, res, next) => {
    const { productId, quantity } = req.body;
    const { userId } = req.user._id;
    const product = await productModel.findById(productId).select("price");
    if (!product) {
        return next(new AppError("Product not found", 404));
    }
req.body.price=product.price;
let isCartExist=await cartModel.findOne({userId });


if(!isCartExist){

    const cartItem={productId,quantity,price:product.price,DiscountedPrice:product.DiscountedPrice};
     let totalPrice=calcTotalPrice(cartItem);
     let totalPriceAfterDiscount=calcTotalPriceAfterDiscount(cartItem);
        let discount=calcDiscount(cartItem);
    
    const cart = await cartModel.create({ userId, cartItems: [{ productId, quantity, price: product.price,DiscountedPrice:product.DiscountedPrice }],totalPrice,totalPriceAfterDiscount,discount });
   
    return res.status(201).json({ status: "success", data: { cart } });
}
}
);

const removeItemFromCart = catchAsyncError(async (req, res, next) => {
    const { userId } = req.user._id;
    const cart = await cartModel.findOneAndUpdate(
        { userId },
        { $pull: { cartItems: { _id: req.params.id } } },
        { new: true }
    );

    if (!cart) {
        return next(new AppError("Item not found in cart", 404));
    }

    calcTotalPrice(cart);
    calcTotalPriceAfterDiscount(cart);
    calcDiscount(cart);

    await cart.save();

    res.status(200).json({ status: "success", data: { cart } });
});


const updateProductQuantity = catchAsyncError(async (req, res, next) => {
    const { productId, quantity } = req.body;
    const product = await productModel.findById(productId);
    if (!product) return next(new AppError("Product was not found", 404));

    let cart = await cartModel.findOne({ userId: req.user._id });
    if (!cart) return next(new AppError("Cart not found", 404));

    const cartItem = cart.cartItems.find(item => item.productId.toString() === productId);
    if (!cartItem) return next(new AppError("Product not found in cart", 404));

    cartItem.quantity = quantity;
    calcTotalPrice(cart);
    calcTotalPriceAfterDiscount(cart);
    calcDiscount(cart);

    await cart.save();

    res.status(200).json({ status: "success", data: { cart } });
});

const applyCoupon=catchAsyncError(async(req,res,next)=>{
    let coupon=await couponModel.findOne({
        code:req.body.code,
        expires:{$gt:Date.now()},
    })

    let cart=await cartModel.findOne({userId:req.user._id});

    cart.totalPriceAfterDiscount=cart.totalPriceAfterDiscount=cart.totalPrice-(cart.totalPrice*coupon.discount)/100;
    cart.discount=coupon.discount;
    await cart.save();

    res.status(201).json({message:"success",cart});


})

const getLoggedUserCart = catchAsyncError(async (req,res,next)=>{

    let cartItems = await cartModel.findOne({userId:req.user._id}).populate('cartItem.productId')
  
    res.status(200).json({message:"success",cart : cartItems})
  })
export {    
    addProductToCart,
    updateProductQuantity,
    removeItemFromCart,
    applyCoupon,
    getLoggedUserCart
};