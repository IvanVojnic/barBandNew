import express from 'express';
import PORT from "./env.js";


import sequelize from './utils/database.js';

import router from './routes/routes.js';

const app = express();

import cors from 'cors';
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

sequelize.sync({force:false}).then(()=>{
    console.log("Tables have been created");
}).catch(err=>console.log(err));

app.listen(PORT);
