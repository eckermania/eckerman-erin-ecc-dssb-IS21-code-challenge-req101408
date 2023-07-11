"use strict";

// dependencies
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
const swaggerJson = JSON.parse(fs.readFileSync('./openapi.json'));

import health from './endpoints/health.js';
import product from './endpoints/product.js';

// setup server
const app = express();

// add req.body to all requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson));

//API routes
app.use(cors());
app.use("/api/health", health);
app.use("/api/product", product);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
});