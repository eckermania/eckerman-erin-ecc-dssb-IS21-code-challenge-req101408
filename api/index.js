// This router handles GET requests to the application's landing page
import express from 'express';
const router = express.Router();

import * as fs from "fs";

//filepath to mock db
const dbPath = './products.json'

// GET all products 
router.get("/", (req, res) => {
    try{
        let products = fs.readFileSync(dbPath);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(products)
    } catch(err){
        res.status(500).send(err)
    }

});

export default router;