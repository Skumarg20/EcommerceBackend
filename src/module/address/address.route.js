import {validate } from '../../middlewares/validate.js'
import e from 'express';
import { allowedTo,protectedRoutes } from '../auth/auth.controller.js'
import * as address from '../address/address.controller.js'
import * as validater from "./address.validate.js"
import { allow } from 'joi';

const addressRouter=e.Router();

addressRouter.route("/").patch(protectedRoutes,allowedTo('user'),validate(validater.addAddressValidation),address.addAddress).delete(protectedRoutes,allowedTo('user'),validate(validater.deleteAddressvalidation),address.removeAddress).get(protectedRoutes,allowedTo('user'),address.getAllAddress);

export default addressRouter;