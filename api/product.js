// This router handles GET requests to the application's landing page
import express from 'express';
const router = express.Router();

import * as fs from "fs";

//filepath to mock db
const dbPath = './products.json'

// GET one product 
router.get("/:productId", (req, res) => {
    try{
        let productId = parseInt(req.params.productId);

        //productId is not an int
        if(isNaN(productId)){
            res.status(400).send("productId needs to be an integer")
        }

        let products = JSON.parse(fs.readFileSync(dbPath));

        //productId does not exist in db
        if (productId < 1 || productId > products.length){
            res.status(404).send("productId not present in database")
        }

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(products[productId - 1]))
    } catch(err){
        res.status(500).send(err)
    }

});

export default router;