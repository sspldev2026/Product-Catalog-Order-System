const offerModel = require("../models/offerModel")

getAllOfferService = async () => {
    return await offerModel.find()
}

getOfferByIdService = async (id) => {
    return await offerModel.findById(id)
}

updatePriceByOffer = async (price) => {
   const fixed =  await offerModel.find({discountType:"FIXED"})
   if(price >= fixed[0].minimumPurchase ){
    console.log(price-fixed[0].discountValue)
    return {newPrice:price-fixed[0].discountValue , offerId:fixed[0]._id} 
   }
   return {newPrice:price,offerId:null}
}


module.exports = {
    getAllOfferService,
    getOfferByIdService,
    updatePriceByOffer
}