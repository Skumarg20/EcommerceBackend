import e from 'express'
import {allowedTo, protectedRoutes} from '../../module/auth/auth.controller.js';
import { validate } from '../../middlewares/validate.js';
import { uploadSingleFile } from '../../../multer/multer.js';
import * as product from './product.controller.js'
import * as validater from './product.validate.js'

const ProductRouter=e.Router()
let arrFields = [
    { name: "imgcover", maxCount: 1 },
    { name: "images", maxCount: 20 },
  ];
ProductRouter.route('/').post(protectedRoutes,allowedTo('admin'),uploadMultipleFiles(arrFields, "products"),validate(validater.addProductValidation),product.addProduct).get(protectedRoutes,allowedTo('user'),product.getAllProduct);
ProductRouter.route('/:id').put(protectedRoutes,allowedTo('admin'),validate(validater.updateProductValidation),product.updateProduct).get(protectedRoutes,allowedTo('user'),validate(validater.getSpecificProductValidation),product.getProductbyId).delete(protectedRoutes,allowedTo('admin'),validate(validater.deleteProductValidation),product.deleteProduct);
