const { updatePriceByOffer } = require("../service/offerServices")
const { getAllOffers, getOffersById, placeOrder } = require("../service/orderService")
const { isInStock, updateStocksInProducts } = require("../service/productServices")

const getAllOrderContoller = async (req, res) => {
    try {
        const data = await getAllOffers()
        res.status(200).send(data.reverse())
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const getOrderByIdContoller = async (req, res) => {
    const { id } = req.params
    try {
        const data = await getOffersById(id)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({ "err": error })
    }
}

const OrderPlaceController = async (req, res) => {
    console.log(req.body)
    let { customerName, items, totalAmount, paymentMethod } = req.body
    let isProductInStock = true
    let offerIds = []

    let {newPrice, offerId} = await updatePriceByOffer(totalAmount)
    totalAmount = newPrice
    if(offerId) offerIds.push(offerId)

    for (const element of items) {
        let x = await isInStock(element.productId, element.quantity)
        if (x === false){
            isProductInStock = false
            break
        }  
    }

    if (isProductInStock) {
        await updateStocksInProducts(items)
        const orderPlaced = await placeOrder({
            customerName, items, totalAmount, offerIds, paymentMethod
        })
        res.send(orderPlaced)
    }else{
        res.json({message:"Product is out of stock"})
    }

}

module.exports = {
    getAllOrderContoller,
    getOrderByIdContoller,
    OrderPlaceController
}