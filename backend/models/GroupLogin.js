const mongoose = require('mongoose');

const GroupLoginSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    connection: {
        type: String,
        required: true
    }
})

module.exports = connectionLoginInfo.module('GroupLogin', GroupLoginSchema);