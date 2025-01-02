import express from 'express';
import bodyParser from 'body-parser';

import cors from 'cors';
import { dbConnection } from './db/dbconnection.js';

const app=express();
app.use(bodyParser.json());
app.use(cors());
dbConnection();
app.listen(5000,()=>{
    console.log('Server started at http://localhost:5000');
});