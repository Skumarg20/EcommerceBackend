import e from 'express'
import * as reviewController from './review.controller'
import {allowedTo,protectedRoutes} from "../../../src/module/auth/auth.controller"
import * as validater from './review.validate.js'
import {validate } from '../../middlewares/validate'

const reviewRouter=e.Router();

reviewRouter.route('/').post(protectedRoutes,allowedTo('user'),validate(validater.addReviewValidation),reviewController.addReview).get(reviewController.getAllReviews);

reviewRouter.route('/:id').get(validate(validater.getSpecificReviewValidation),reviewController.getSpecificReview).patch(protectedRoutes,allowedTo('user'),validate(validater.updateReviewValidation),reviewController.updateReview).delete(protectedRoutes,allowedTo('user'),validate(validater.deleteReviewValidation),reviewController.deleteReview);
export default reviewRouter;    