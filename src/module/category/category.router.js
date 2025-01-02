import e from express;
import * as c from './category.controller.js';
import {allowedTo, protect} from '../../utils/auth.js';
import subCategoryRouter from '../subcategory/subcategory.route.js';
import { validate } from '../../middlewares/validate.js';
import { uploadSingleFile } from '../../../multer/multer.js';
import { addCategoryValidation, deleteCategoryValidation, updateCategoryValidation } from './category.validation.js';


const categoryRouter=e.Router();

categoryRouter.use('/:categoryId/subcategory',subCategoryRouter);


categoryRouter.post('/',protect,allowedTo('admin'),uploadSingleFile("Image","category"),validate(addCategoryValidation),c.addCategory);
categoryRouter.get('/',c.getAllCategory);
categoryRouter.put('/:id',protect,allowedTo('admin'),validate(updateCategoryValidation),c.updateCategory);
categoryRouter.delete('/:id',protect,allowedTo('admin'),validate(deleteCategoryValidation),c.deleteCategory);


export default categoryRouter;  
