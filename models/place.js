const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    placeName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Place', placeSchema)