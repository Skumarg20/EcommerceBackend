import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import { AppError } from '../src/module/utils/AppError';

const createMulterUploader=(folderName)=>{
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,`public/uploads/${folderName}`);
        },
        filename:(req,file,cb)=>{
            const ext=file.mimetype.split('/')[1];
            cb(null,`${uuidv4()}.${ext}`);
        },
    });

    const fileFilter=(req,file,cb)=>{
        if(file.mimetype.startsWith('image')){
            cb(null,true);
        }else{
            cb(new AppError("Not an image! Please upload only images",400),false);
        }
    };
    const upload=multer({
        storage:storage,
        fileFilter:fileFilter,
    });
    return upload;
}

export const uploadSingleFile=(fileName,folerName)=>{
    return createMulterUploader(folerName).single(fileName);
}

export const uploadMultipleFiles=(fileName,folerName)=>{
    return createMulterUploader(folerName).array(fileName);
}