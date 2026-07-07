const express = require("express")
const { getAllOfferController, getOfferByIdController } = require("../controller/offerController")

const router = express.Router()

router.get("/", getAllOfferController )

router.get("/:id", getOfferByIdController)

module.exports = router