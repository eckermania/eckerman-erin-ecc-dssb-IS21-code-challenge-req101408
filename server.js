"use strict";

// dependencies
import express from 'express';

import index from './api/index.js';
// import user from './endpoints/user.js';

// setup server
const app = express();

// add req.body to all requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//API routes
app.use("/", index)
// app.use("/product", product);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
});