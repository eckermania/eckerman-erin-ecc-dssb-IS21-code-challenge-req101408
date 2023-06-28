// This router handles GET requests to the application's landing page
import express from 'express';
const router = express.Router();

import * as fs from "fs";

//filepath to mock db
const dbPath = './products.json';

//helper function to check if productId present in list of products
function findProductIdIndex(productList, productId){
    for(let i = 0; i < productList.length; i++){
        if (productList[i].productId == productId){
            return i;
        }
    }
    return -1;
}

// GET all products 
router.get("/all", (req, res) => {
    try{
        let products = fs.readFileSync(dbPath);
        res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(products)
    } catch(err){
        res.status(500).send(err)
    }

});

//GET one product 
router.get("/:productId", (req, res) => {
    try{
        let productId = parseInt(req.params.productId);

        //productId is not an int
        if(isNaN(productId)){
            res.status(400).send("productId needs to be an integer");
            return;
        }

        let products = JSON.parse(fs.readFileSync(dbPath));

        //productId does not exist in db
        if (findProductIdIndex(products, productId) == -1){
            res.status(404).send("productId not present in database");
            return;
        }

        res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify(products[productId - 1]));

    } catch(err){
        res.status(500).send(err);
    }

});

//POST new product
router.post("/", (req, res) => {
    try{
        let newProduct = req.body;
        let products = JSON.parse(fs.readFileSync(dbPath));

        //identify id for new product
        let lastProduct = products[products.length-1];
        let highestID = lastProduct.productId;

        newProduct["productId"] = highestID += 1;

        //change startDate to desired format
        newProduct["startDate"] = newProduct["startDate"].replace(/-/g, "/")

        //add new product to in-memory version of mock db and overwrite mock db file
        products.push(newProduct);
        fs.writeFile(dbPath, JSON.stringify(products), err =>{
            if (err){
                res.status(500).send(err);
                return;
            } else {
                res.send(201);
            }     
        })

    } catch(err){
        res.status(500).send(err);
    }
});

//DELETE product
router.delete("/:productId", (req, res) => {
    try{
        let targetId = parseInt(req.params.productId);
        let products = JSON.parse(fs.readFileSync(dbPath));

        let targetIndex = findProductIdIndex(products, targetId);

        //given productId does not exist in mock db
        if (targetIndex == -1){
            res.status(404).send("productId not present in db");
            return;
        }

        //delete targeted product and overwrite mock db
        products.splice(targetIndex, 1);
        fs.writeFile(dbPath, JSON.stringify(products), err =>{
            if (err){
                res.status(500).send(err);
            } else {
                res.send(204);
            }     
        })

    } catch(err) {
        res.status(500).send(err);
    }
});

//UPDATE product - entire product record will be overwritten with request body contents
router.put("/:productId", (req, res) => {
    try{
        let targetId = parseInt(req.params.productId);
        let updatedProduct = req.body;

        //request body is empty
        if (!updatedProduct.productName){
            res.status(400).send("Missing request body");
            return;
        }

        let products = JSON.parse(fs.readFileSync(dbPath));

        let targetIndex = findProductIdIndex(products, targetId);

        //given productId does not exist in mock db
        if (targetIndex == -1){
            res.status(404).send("productId not present in db");
            return;
        }

        //replace targeted product record and overwrite mock db
        products.splice(targetIndex, 1);
        products.push(updatedProduct);
        fs.writeFile(dbPath, JSON.stringify(products), err =>{
            if (err){
                res.status(500).send(err);
            } else {
                res.send(200);
            }     
        })

    } catch(err) {
        res.status(500).send(err);
    }
})

export default router;