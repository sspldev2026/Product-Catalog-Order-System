const Orders = require("../models/orderModel")

const getAllOffers = async () => {
    try {
        return await Orders.find().populate({
            path: 'items',
            populate: {
                path: 'productId'
            }
        })
    } catch (error) {
        return error.message
    }
}

const getOffersById = async (id) => {
    try {
        return await Orders.findById(id).populate({
            path: 'items',
            populate: {
                path: 'productId'
            }
        })
    } catch (error) {
        return error
    }
}

const placeOrder = async (orderObject) => {
    try {
        return await Orders.create(orderObject)
    } catch (error) {
        return error
    }
}

module.exports = {
    getAllOffers,
    getOffersById,
    placeOrder
}