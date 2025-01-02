import e from  'express';
import { validate } from '../../middlewares/validate.js';
import {allowedTo,protectRoutes} from "../auth/auth.controller.js";
import * as c from "./cart.controller.js"


const cartRouter=e.Router();

cartRouter.post(
    '/',
    protectRoutes,
    allowedTo("user"),
    c.addProductToCart
  );
  
  // Get logged user's cart
  cartRouter.get(
    '/',
    protectRoutes,
    allowedTo("user"),
    c.getLoggedUserCart
  );
  
cartRouter.post('/applycoupon', protectRoutes,
    allowedTo("user"),
    c.applyCoupon),
cartRouter.delete("/:id", protectRoutes,
        allowedTo("user"),
        c.removeItemFromCart).put( protectRoutes,
            allowedTo("user"),
            c.updateProductQuantity)

export default cartRouter;



