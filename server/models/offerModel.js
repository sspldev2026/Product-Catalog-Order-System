const mongoose = require("mongoose")

const offerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    discountType: {
        type: String,
        enum: ["PERCENTAGE", "FIXED"],
        required: true,
    },
    minimumPurchase: {
        type: Number,
        default: 0,
    },
    discountValue: {
        type: Number,
        required:true
    }
});

const offersModule = mongoose.model('offers', offerSchema);
module.exports = offersModule
