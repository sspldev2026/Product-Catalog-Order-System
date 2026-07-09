require("dotenv").config();

const mongoose = require("mongoose");
const {dbConnection} = require("../utils/DB_Connction");

const category = require("../models/categoryModel");
const productModel = require("../models/productModel")
const offerModel = require("../models/offerModel")
const orderModel = require("../models/orderModel")

const categoryData = require("./category.seeder");
const productData = require("./product.seeder");
const offerData = require("./offer.seeder");
const orderData = require("./order.seeder");


const importData = async () => {
    try {
        await dbConnection(process.env.databaseURL);

        // Remove existing data
        // await productModel.deleteMany();
        // await category.deleteMany();
        // await offerModel.deleteMany();
        // await orderModel.deleteMany();

        // Insert new data
        await category.insertMany(categoryData);
        await productModel.insertMany(productData);
        await offerModel.insertMany(offerData);
        await orderModel.insertMany(orderData);

        console.log("Data Imported");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        dbConnection();

        // Remove existing data
        // await productModel.deleteMany();
        // await category.deleteMany();
        // await offerModel.deleteMany();
        // await orderModel.deleteMany();

        console.log("Data Deleted");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}