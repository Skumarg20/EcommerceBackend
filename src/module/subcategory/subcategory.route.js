import express from 'express';
import * as subCategories from './subcategory.controller.js';
import {allowedTo, protect} from '../../utils/auth.js';

const subCategoryRouter = express.Router();

subCategoryRouter.route('/').post(protect, allowedTo('admin','user'), subCategories.addSubCategory).get(subCategories.getAllSubCategories);

subCategoryRouter.route('/:id').patch(protect, allowedTo('admin','user'), subCategories.updateSubCategory).delete(protect, allowedTo('admin','user'), subCategories.deleteSubCategory);

export default subCategoryRouter;

