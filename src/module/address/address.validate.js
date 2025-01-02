import Joi from 'joi'

const addAddressValidation=Joi.object({
    city:Joi.string().trim(),
    street:Joi.string(),
    phone:Joi.string(),
});

const deleteAddressvalidation=Joi.object({
    address:Joi.string().hex().length(24).required(),
});
export {addAddressValidation,deleteAddressvalidation};