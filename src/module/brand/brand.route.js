import e from 'express'
import * as brand from "./brand.controller.js";
import {validate} from "./../../middlewares/validate.js";
import * as brandValidation from './brand.validate.js'
import { allowedTo,protectedRoutes } from '../auth/auth.controller';

const brandRouter=e.Router();

brandRouter.route("/").post(protectedRoutes,allowedTo("admin","user"),validate(brandValidation.addBrandValidation),brand.addBrand).get(brand.getAllBrands);

brandRouter.route("/:id").put(protectedRoutes,allowedTo("admin","user"),validate(brandValidation.updateBrandValidation),brand.updateBrand).delete(protectedRoutes,allowedTo("admin"),validate(brandValidation.deleteBrandValidation),brand.deleteBrand);

export default brandRouter;