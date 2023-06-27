"use strict";

// dependencies
import fs from 'fs';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
const swaggerJson = JSON.parse(fs.readFileSync('./openapi.json'));

import health from './api/health.js';
import product from './api/product.js';

// setup server
const app = express();

// add req.body to all requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson));

//API routes
app.use("/api/health", health);
app.use("/api/product", product);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
});