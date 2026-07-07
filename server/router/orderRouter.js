const express = require("express")
const { getAllOfferController, getOfferByIdController } = require("../controller/offerController")
const { getAllOrderContoller, getOrderByIdContoller, OrderPlaceController } = require("../controller/orderController")

const router = express.Router()

router.get("/", getAllOrderContoller )
router.post("/",OrderPlaceController)


router.get("/:id", getOrderByIdContoller)


module.exports = router