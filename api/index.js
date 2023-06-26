// This router handles GET requests to the application's landing page
import express from 'express';
const router = express.Router();

import * as fs from "fs";


// GET all products 

router.get("/", (req, res) => {
    fs.readFile("../generateddb.js", function(err, data) {
        res.writeHead(200, {'Content-Type': 'json'})
    })

});

export default router;