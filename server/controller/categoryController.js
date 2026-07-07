const { getAllCatService } = require("../service/catagoryService")

const getAllCatContoller = async (req, res) => {
    try {
        const data = await getAllCatService()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({error:error})
    }
}

module.exports = {
    getAllCatContoller
}