const mongoose = require('mongoose');

const PositionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    //Breakfast
    thuBreakfast: {
        type: Boolean,
        default: false
    },
    thuBreakfastStart: {
        type: String, //Time
        default: ''
    },
    thuBreakfastEnd: {
        type: String, //Time
        default: ''
    },
    friBreakfast: {
        type: Boolean,
        default: false
    },
    friBreakfastStart: {
        type: String, //Time
        default: ''
    },
    friBreakfastEnd: {
        type: String, //Time
        default: ''
    },
    satBreakfast: {
        type: Boolean,
        default: false
    },
    satBreakfastStart: {
        type: String, //Time
        default: ''
    },
    satBreakfastEnd: {
        type: String, //Time
        default: ''
    },
    sunBreakfast: {
        type: Boolean,
        default: false
    },
    sunBreakfastStart: {
        type: String, //Time
        default: ''
    },
    sunBreakfastEnd: {
        type: String, //Time
        default: ''
    },
    monBreakfast: {
        type: Boolean,
        default: false
    },
    monBreakfastStart: {
        type: String, //Time
        default: ''
    },
    monBreakfastEnd: {
        type: String, //Time
        default: ''
    },
    tueBreakfast: {
        type: Boolean,
        default: false
    },
    tueBreakfastStart: {
        type: String, //Time
        default: ''
    },
    tueBreakfastEnd: {
        type: String, //Time
        default: ''
    },
    wedBreakfast: {
        type: Boolean,
        default: false
    },
    wedBreakfastStart: {
        type: String, //Time
        default: ''
    },
    wedBreakfastEnd: {
        type: String, //Time
        default: ''
    },

    //Brunch
    thuBrunch: {
        type: Boolean,
        default: false
    },
    thuBrunchStart: {
        type: String, //Time
        default: ''
    },
    thuBrunchEnd: {
        type: String, //Time
        default: ''
    },
    friBrunch: {
        type: Boolean,
        default: false
    },
    friBrunchStart: {
        type: String, //Time
        default: ''
    },
    friBrunchEnd: {
        type: String, //Time
        default: ''
    },
    satBrunch: {
        type: Boolean,
        default: false
    },
    satBrunchStart: {
        type: String, //Time
        default: ''
    },
    satBrunchEnd: {
        type: String, //Time
        default: ''
    },
    sunBrunch: {
        type: Boolean,
        default: false
    },
    sunBrunchStart: {
        type: String, //Time
        default: ''
    },
    sunBrunchEnd: {
        type: String, //Time
        default: ''
    },
    monBrunch: {
        type: Boolean,
        default: false
    },
    monBrunchStart: {
        type: String, //Time
        default: ''
    },
    monBrunchEnd: {
        type: String, //Time
        default: ''
    },
    tueBrunch: {
        type: Boolean,
        default: false
    },
    tueBrunchStart: {
        type: String, //Time
        default: ''
    },
    tueBrunchEnd: {
        type: String, //Time
        default: ''
    },
    wedBrunch: {
        type: Boolean,
        default: false
    },
    wedBrunchStart: {
        type: String, //Time
        default: ''
    },
    wedBrunchEnd: {
        type: String, //Time
        default: ''
    },

    //Lunch
    thuLunch: {
        type: Boolean,
        default: false
    },
    thuLunchStart: {
        type: String, //Time
        default: ''
    },
    thuLunchEnd: {
        type: String, //Time
        default: ''
    },
    friLunch: {
        type: Boolean,
        default: false
    },
    friLunchStart: {
        type: String, //Time
        default: ''
    },
    friLunchEnd: {
        type: String, //Time
        default: ''
    },
    satLunch: {
        type: Boolean,
        default: false
    },
    satLunchStart: {
        type: String, //Time
        default: ''
    },
    satLunchEnd: {
        type: String, //Time
        default: ''
    },
    sunLunch: {
        type: Boolean,
        default: false
    },
    sunLunchStart: {
        type: String, //Time
        default: ''
    },
    sunLunchEnd: {
        type: String, //Time
        default: ''
    },
    monLunch: {
        type: Boolean,
        default: false
    },
    monLunchStart: {
        type: String, //Time
        default: ''
    },
    monLunchEnd: {
        type: String, //Time
        default: ''
    },
    tueLunch: {
        type: Boolean,
        default: false
    },
    tueLunchStart: {
        type: String, //Time
        default: ''
    },
    tueLunchEnd: {
        type: String, //Time
        default: ''
    },
    wedLunch: {
        type: Boolean,
        default: false
    },
    wedLunchStart: {
        type: String, //Time
        default: ''
    },
    wedLunchEnd: {
        type: String, //Time
        default: ''
    },

    //Dinner
    thuDinner: {
        type: Boolean,
        default: false
    },
    thuDinnerStart: {
        type: String, //Time
        default: ''
    },
    thuDinnerEnd: {
        type: String, //Time
        default: ''
    },
    friDinner: {
        type: Boolean,
        default: false
    },
    friDinnerStart: {
        type: String, //Time
        default: ''
    },
    friDinnerEnd: {
        type: String, //Time
        default: ''
    },
    satDinner: {
        type: Boolean,
        default: false
    },
    satDinnerStart: {
        type: String, //Time
        default: ''
    },
    satDinnerEnd: {
        type: String, //Time
        default: ''
    },
    sunDinner: {
        type: Boolean,
        default: false
    },
    sunDinnerStart: {
        type: String, //Time
        default: ''
    },
    sunDinnerEnd: {
        type: String, //Time
        default: ''
    },
    monDinner: {
        type: Boolean,
        default: false
    },
    monDinnerStart: {
        type: String, //Time
        default: ''
    },
    monDinnerEnd: {
        type: String, //Time
        default: ''
    },
    tueDinner: {
        type: Boolean,
        default: false
    },
    tueDinnerStart: {
        type: String, //Time
        default: ''
    },
    tueDinnerEnd: {
        type: String, //Time
        default: ''
    },
    wedDinner: {
        type: Boolean,
        default: false
    },
    wedDinnerStart: {
        type: String, //Time
        default: ''
    },
    wedDinnerEnd: {
        type: String, //Time
        default: ''
    }
})

module.exports = mongoose.model('Positions', PositionSchema);