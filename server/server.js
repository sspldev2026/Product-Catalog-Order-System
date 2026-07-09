const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()

require("dotenv").config();


const category = require("./models/categoryModel.js")
const Product = require("./models/productModel.js")
const Orders = require("./models/orderModel.js")
const OffersModel = require("./models/offerModel.js")


const productRouter = require("./router/productRouter.js")
const offerRouter = require("./router/offerRouter.js")
const orderRotuer = require("./router/orderRouter.js")
const categoryRotuer = require("./router/categoryRouter.js")
const { dbConnection } = require("./utils/DB_Connction.js")

app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions))


dbConnection(process.env.databaseURL)


app.use("/product",productRouter)
app.use("/offer",offerRouter)
app.use("/order",orderRotuer)
app.use("/category",categoryRotuer)




app.listen(8000, () => console.log("Server running on port 8000"))