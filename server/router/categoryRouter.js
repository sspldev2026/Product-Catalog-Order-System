const express = require("express")
const { getAllCatContoller } = require("../controller/categoryController")

const router = express.Router()

router.get("/", getAllCatContoller)

module.exports = router