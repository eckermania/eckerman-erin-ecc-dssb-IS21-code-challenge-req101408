// This router handles GET requests to the application's landing page
import express from 'express';
const router = express.Router();

import * as fs from "fs";

const dbPath = './products.json'

// Check health of API - currently only consists of a check for mock db file
router.get("/", (req, res) => {
    try{
        if (fs.existsSync(dbPath)){
        res.send()
        } else {
            res.status(500).send("Mock db does not exist. Run generated-db.js script to create mock db json file.")
        }
    } catch(err){
        console.error(err)
    }
});

export default router;