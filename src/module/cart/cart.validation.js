import Joi from 'joi';

const addProductValidation = Joi.object({
    cartItem: Joi.array().items(
     Joi.object({
        productId: Joi.string().hex().length(24).required(),    
        quantity: Joi.number().integer().min(1).default(1),
        price: Joi.number().min(0).required(),
        totalProductDiscount: Joi.number().min(0).required(),
     }) ).min(1),

  
    
});

const removeProductValidation = Joi.object({
    productId: Joi.string().hex().length(24).required(),
});

export { addProductValidation, removeProductValidation };   
