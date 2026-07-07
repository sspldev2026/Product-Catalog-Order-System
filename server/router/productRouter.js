const express = require("express")
const Product = require("../models/productModel");
const { productPaginationController } = require("../controller/productController");

const router = express.Router()

router.get("/", productPaginationController);


module.exports = router