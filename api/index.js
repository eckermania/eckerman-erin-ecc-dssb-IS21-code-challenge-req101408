// This router handles GET requests to the application's landing page
import express from 'express';
const router = express.Router();

import * as fs from "fs";


// GET all products /api/product
// Retrieve a random activity from the Bored API and return new instance of Activity. 
// Request will be filtered on youngest user record if table is not empty.
router.get("/", (req, res) => {
    // Check Users table to see if at least one record exists
    let SQL = `SELECT accessibility, price FROM Users WHERE user_id=(SELECT max(user_id) FROM Users);`

    return pool.query(SQL)
    .then((db_res) => {
        let reqURL = `https://www.boredapi.com/api/activity`;
        // Users table is not empty - add price and accessibility params to path
        if (db_res.rows.length > 0){
            console.log(db_res.rows);
            let priceMinMax = translatePrice(db_res.rows[0].price);
            let accessibilityMinMax = translateAccessibility(db_res.rows[0].accessibility);
            reqURL += `?minprice=` + priceMinMax[0] + `&maxprice=` + priceMinMax[1] + `&minaccessibility=` + 
                accessibilityMinMax[0] + `&maxaccessibility=` + accessibilityMinMax[1];
        }
        (async () => {
            let resBody = await fetch(reqURL).then(response => response.json());

            if(resBody.error){
                return res.status(404).send("No activity found matching accessibility and price requirements")
            }

            let newActivity = new Activity(resBody.activity, resBody.accessibility, resBody.type, resBody.participants, 
                resBody.price, resBody.link, resBody.key);
            console.log('Activity instance:', newActivity);
            res.send(newActivity);
        })();

    })
    .catch((err) =>{
        console.log(err)
        res.status(500).send("Error retrieving record.")
    });
});

export default router;