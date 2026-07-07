const catagoryModel = require("../models/categoryModel")

getAllCatService = async () => {
    return await catagoryModel.find()
}


module.exports = {
    getAllCatService
}