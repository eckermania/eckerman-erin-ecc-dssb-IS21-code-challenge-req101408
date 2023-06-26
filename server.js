"use strict";

// dependencies
import fs from 'fs';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
const swaggerJson = JSON.parse(fs.readFileSync('./openapi.json'));

import index from './api/index.js';
import health from './api/health.js';

// setup server
const app = express();

// add req.body to all requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson));

//API routes
app.use("/", index);
app.use("/api/health", health);
// app.use("/product", product);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
});