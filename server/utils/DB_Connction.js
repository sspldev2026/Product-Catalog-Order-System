const mongoose = require("mongoose")

const dbConnection = (url) => {
    try {
        mongoose.connect(url).then(() => {
            console.log("DB connected")
        });

    } catch (error) {
        handleError(error);
    }
}

module.exports = {dbConnection}