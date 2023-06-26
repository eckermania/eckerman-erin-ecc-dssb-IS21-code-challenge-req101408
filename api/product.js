// This router handles GET requests to the application's landing page
import express from 'express';
const router = express.Router();

import * as fs from "fs";

//filepath to mock db
const dbPath = './products.json'

//helper function to check if productId present in list of products
function productIdPresent(productList, productId){
    for(let i = 0; i < productList.length; i++){
        if (productList[i].productId == productId){
            return true
        }
    }
    return false
}


//GET one product 
router.get("/:productId", (req, res) => {
    try{
        let productId = parseInt(req.params.productId);

        //productId is not an int
        if(isNaN(productId)){
            res.status(400).send("productId needs to be an integer")
        }

        let products = JSON.parse(fs.readFileSync(dbPath));

        //productId does not exist in db
        if (!productIdPresent(products, productId)){
            res.status(404).send("productId not present in database")
        }

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(products[productId - 1]))
    } catch(err){
        res.status(500).send(err)
    }

});

//POST new product
router.post("/", (req, res) => {
    try{
        let newProduct = req.body;
        let products = JSON.parse(fs.readFileSync(dbPath));

        //identify id for new product
        // newProduct["productId"] = parseInt(products[products.length-1].productId) ++;
        let lastProduct = products[products.length-1];
        let highestID = lastProduct.productId;

        newProduct["productId"] = highestID += 1;

        //add new product to in-memory version of mock db and overwrite mock db file
        products.push(newProduct);
        fs.writeFile(dbPath, JSON.stringify(products), err =>{
            if (err){
                console.log("Error writing file:", err);
            } else {
                res.send(201)
            }     
        })

    } catch(err){
        res.status(500).send(err)
    }
})

//DELETE product
router.delete("/:productId", (req, res) => {
    try{
        let targetId = parseInt(req.params.productId);
        let products = JSON.parse(fs.readFileSync(dbPath));

        //Find location of product to be deleted in in-memory version of mock db
        let targetIndex = -1
        for (let i = 0; i < products.length; i++){
            if (products[i].productId == targetId){
                targetIndex = i;
                break;
            }
        }

        //given productId does not exist in mock db
        if (targetIndex == -1){
            res.status(404).send("productId not present in db");
        }

        //delete targeted product and overwrite mock db
        delete products[targetIndex];
        fs.writeFile(dbPath, JSON.stringify(products), err =>{
            if (err){
                console.log("Error writing file:", err);
            } else {
                res.send(204)
            }     
        })

    } catch(err) {
        res.status(500).send(err)
    }
})

export default router;