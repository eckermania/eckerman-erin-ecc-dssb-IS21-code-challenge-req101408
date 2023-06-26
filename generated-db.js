"use strict";
import * as fs from "fs";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

// Constants containing business logic and hard coded employee names
const owners = ['Alex', 'Mircea', 'Veronica'];
const developers = ['Ada', 'Ajay', 'Charles', 'Elena', 'Erin', 'Lin', 'Yusuf'];
const numDevsPerProduct = 5;
const scrumMasters = ['Bogdan', 'Irina', 'Qiang', 'Tito'];
const methodology = ['Waterfall', 'Agile'];
const locationPrefix = 'github.com/bcgov/';
const minStartDateYear = 2020;
const numOfProducts = 40;

// ID counter to keep track of last used product ID in mock db
let currentID = 0;

// Class for a single product
class Product {
    constructor() {
        this.productID = this.generateID();
        this.productName = uniqueNamesGenerator({dictionaries: [adjectives, colors, animals]});
        this.productOwnerName = owners[Math.floor(Math.random() * owners.length)];
        this.Developers = this.generateDevs();
        this.scrumMasterName = scrumMasters[Math.floor(Math.random() * scrumMasters.length)];
        this.startDate = this.generateStartDate();
        this.methodology = methodology[Math.floor(Math.random() * methodology.length)];;
        this.location = locationPrefix + this.productName
    }

    // Method to generate ID - Product IDs are generated in sequential order
    generateID() {
        currentID += 1;
        return currentID;
    };

    // Method to compile random list of developers
    generateDevs(){
        let remainingDevs = [...developers];
        let selectedDevs = [];
        for(let i = 0; i < numDevsPerProduct; i++){
            let randIndex = Math.floor(Math.random() * remainingDevs.length)
            let randDev = remainingDevs.splice(randIndex, 1)[0];
            selectedDevs.push(randDev)
        }
        return selectedDevs;
    }

    // Method to generate random start date as a string formatted to YYYY/MM/DD
    generateStartDate(){
        let minDate = new Date(minStartDateYear, 1, 1);
        let maxDate = new Date();
        
        let randDate = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
        let randMonth = randDate.getMonth().toString();
        randMonth = randMonth.length == 1 ? `0` + randMonth : randMonth;
        let randDay = randDate.getDate().toString();
        randDay = randDay.length == 1 ? `0` + randDay : randDay;
        let strDate = randDate.getFullYear().toString() + `/` + randMonth + `/` + randDay;
        // let strDate = randDate.getFullYear().toString() + `/` + ('0' + randDate.getMonth()).slice(-2)+`/` + ('0' + randDate.getDate()).slice(-2)
        
        return strDate;
    }
}

// Main function that writes an array of product objects to a json file
function buildMockDB(){
    let productList = []
    for(let i= 0; i< numOfProducts; i++){
        let newProd = new Product;
        productList.push(newProd)
    }
    fs.writeFile("./products.json", JSON.stringify(productList), err =>{
        if (err){
            console.log("Error writing file:", err);
        }     
    })
}

buildMockDB();
