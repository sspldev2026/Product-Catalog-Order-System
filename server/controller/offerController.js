const { getAllOfferService, getOfferByIdService } = require("../service/offerServices")

const getAllOfferController = async (req,res) => {
    try {
        offers = await getAllOfferService()
        res.status(200).json(offers)
    } catch (error) {
        res.status(500).json({"error":error})
    }
}

const getOfferByIdController = async (req,res) => {
    const {id} = req.params
    try {
        offers = await getOfferByIdService(id)
        res.status(200).json(offers)
    } catch (error) {
        res.status(500).json({"error":error})
    }
}

module.exports = {
    getAllOfferController,
    getOfferByIdController
}