const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = RoleSchema;