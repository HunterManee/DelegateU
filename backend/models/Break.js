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
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = BreakSchema;