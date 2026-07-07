const productModule = require("../models/productModel")

const isInStock = async (id,quantity) => {
    const product = await productModule.findById(id)
    
    if(product.stock < quantity){
        return false;
    }else{
        return true
    }
}

const updateStocksInProducts = async (items) => {
    for (const element of items) {
        product  = await productModule.findById(element.productId)
        await productModule.findByIdAndUpdate(element.productId,{stock:product.stock-element.quantity})
    }
}


module.exports = {
    isInStock,
    updateStocksInProducts
}