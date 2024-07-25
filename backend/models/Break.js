const mongoose = require('mongoose');

const BreakSchema = mongoose.Schema({
    personId: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        default: ''
    }
})

module.exports = BreakSchema;