const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    
    role: {
        type: String,
        default: 'unassigned'
    },


    thu: {
        type: Boolean,
        default: false
    },
    thuStart: {
        type: String,
        default: ''
    },
    thuEnd: {
        type: String,
        default: ''
    },
    thuBreakTime: {
        type: String,
        default: ''
    },
    thuBreakStatus: {
        type: String,
        default: 'Needs'
    },
    thuPosition: {
        type: String,
        default: 'unassigned'
    },
    fri: {
        type: Boolean,
        default: false
    },
    friStart: {
        type: String,
        default: ''
    },
    friEnd: {
        type: String,
        default: ''
    },
    friBreakTime: {
        type: String,
        default: ''
    },
    friBreakStatus: {
        type: String,
        default: 'Needs'
    },
    friPosition: {
        type: String,
        default: 'unassigned'
    },
    sat: {
        type: Boolean,
        default: false
    },
    satStart: {
        type: String,
        default: ''
    },
    satEnd: {
        type: String,
        default: ''
    },
    satBreakTime: {
        type: String,
        default: ''
    },
    satBreakStatus: {
        type: String,
        default: 'Needs'
    },
    satPosition: {
        type: String,
        default: 'unassigned'
    },
    sun: {
        type: Boolean,
        default: false
    },
    sunStart: {
        type: String,
        default: ''
    },
    sunEnd: {
        type: String,
        default: ''
    },
    sunBreakTime: {
        type: String,
        default: ''
    },
    sunBreakStatus: {
        type: String,
        default: 'Needs'
    },
    sunPosition: {
        type: String,
        default: 'unassigned'
    },
    mon: {
        type: Boolean,
        default: false
    },
    monStart: {
        type: String,
        default: ''
    },
    monEnd: {
        type: String,
        default: ''
    },
    monBreakTime: {
        type: String,
        default: ''
    },
    monBreakStatus: {
        type: String,
        default: 'Needs'
    },
    monPosition: {
        type: String,
        default: 'unassigned'
    },
    tue: {
        type: Boolean,
        default: false
    },
    tueStart: {
        type: String,
        default: ''
    },
    tueEnd: {
        type: String,
        default: ''
    },
    tueBreakTime: {
        type: String,
        default: ''
    },
    tueBreakStatus: {
        type: String,
        default: 'Needs'
    },
    tuePosition: {
        type: String,
        default: 'unassigned'
    },
    wed: {
        type: Boolean,
        default: false
    },
    wedStart: {
        type: String,
        default: ''
    },
    wedEnd: {
        type: String,
        default: ''
    },
    wedBreakTime: {
        type: String,
        default: ''
    },
    wedBreakStatus: {
        type: String,
        default: 'Needs'
    },
    wedPosition: {
        type: String,
        default: 'unassigned'
    }
})

module.exports = mongoose.model('Person', PersonSchema);