const express = require('express');
const router = express.Router();
const Position = require('../models/Position');

router.get('/', async (req, res) => {
    try{
        const positions = await Position.find();
        res.json(positions);
    }catch(error){
        res.json({message: error});
    }
});

router.post('/', async (req,res) => {
    const position = new Position({
        name: req.body.name,

        thuBreakfast: req.body.thuBreakfast,
        thuBreakfastStart: req.body.thuBreakfastStart,
        thuBreakfastEnd: req.body.thuBreakfastEnd,
        friBreakfast: req.body.friBreakfast,
        friBreakfastStart: req.body.friBreakfastStart,
        friBreakfastEnd: req.body.friBreakfastEnd,
        satBreakfast: req.body.satBreakfast,
        satBreakfastStart: req.body.satBreakfastStart,
        satBreakfastEnd: req.body.satBreakfastEnd,
        sunBreakfast: req.body.sunBreakfast,
        sunBreakfastStart: req.body.sunBreakfastStart,
        sunBreakfastEnd: req.body.sunBreakfastEnd,
        monBreakfast: req.body.monBreakfast,
        monBreakfastStart: req.body.monBreakfastStart,
        monBreakfastEnd: req.body.monBreakfastEnd,
        tueBreakfast: req.body.tueBreakfast,
        tueBreakfastStart: req.body.tueBreakfastStart,
        tueBreakfastEnd: req.body.tueBreakfastEnd,
        wedBreakfast: req.body.wedBreakfast,
        wedBreakfastStart: req.body.wedBreakfastStart,
        wedBreakfastEnd: req.body.wedBreakfastEnd,

        thuBrunch: req.body.thuBrunch,
        thuBrunchStart: req.body.thuBrunchStart,
        thuBrunchEnd: req.body.thuBrunchEnd,
        friBrunch: req.body.friBrunch,
        friBrunchStart: req.body.friBrunchStart,
        friBrunchEnd: req.body.friBrunchEnd,
        satBrunch: req.body.satBrunch,
        satBrunchStart: req.body.satBrunchStart,
        satBrunchEnd: req.body.satBrunchEnd,
        sunBrunch: req.body.sunBrunch,
        sunBrunchStart: req.body.sunBrunchStart,
        sunBrunchEnd: req.body.sunBrunchEnd,
        monBrunch: req.body.monBrunch,
        monBrunchStart: req.body.monBrunchStart,
        monBrunchEnd: req.body.monBrunchEnd,
        tueBrunch: req.body.tueBrunch,
        tueBrunchStart: req.body.tueBrunchStart,
        tueBrunchEnd: req.body.tueBrunchEnd,
        wedBrunch: req.body.wedBrunch,
        wedBrunchStart: req.body.wedBrunchStart,
        wedBrunchEnd: req.body.wedBrunchEnd,

        thuLunch: req.body.thuLunch,
        thuLunchStart: req.body.thuLunchStart,
        thuLunchEnd: req.body.thuLunchEnd,
        friLunch: req.body.friLunch,
        friLunchStart: req.body.friLunchStart,
        friLunchEnd: req.body.friLunchEnd,
        satLunch: req.body.satLunch,
        satLunchStart: req.body.satLunchStart,
        satLunchEnd: req.body.satLunchEnd,
        sunLunch: req.body.sunLunch,
        sunLunchStart: req.body.sunLunchStart,
        sunLunchEnd: req.body.sunLunchEnd,
        monLunch: req.body.monLunch,
        monLunchStart: req.body.monLunchStart,
        monLunchEnd: req.body.monLunchEnd,
        tueLunch: req.body.tueLunch,
        tueLunchStart: req.body.tueLunchStart,
        tueLunchEnd: req.body.tueLunchEnd,
        wedLunch: req.body.wedLunch,
        wedLunchStart: req.body.wedLunchStart,
        wedLunchEnd: req.body.wedLunchEnd,

        thuDinner: req.body.thuDinner,
        thuDinnerStart: req.body.thuDinnerStart,
        thuDinnerEnd: req.body.thuDinnerEnd,
        friDinner: req.body.friDinner,
        friDinnerStart: req.body.friDinnerStart,
        friDinnerEnd: req.body.friDinnerEnd,
        satDinner: req.body.satDinner,
        satDinnerStart: req.body.satDinnerStart,
        satDinnerEnd: req.body.satDinnerEnd,
        sunDinner: req.body.sunDinner,
        sunDinnerStart: req.body.sunDinnerStart,
        sunDinnerEnd: req.body.sunDinnerEnd,
        monDinner: req.body.monDinner,
        monDinnerStart: req.body.monDinnerStart,
        monDinnerEnd: req.body.monDinnerEnd,
        tueDinner: req.body.tueDinner,
        tueDinnerStart: req.body.tueDinnerStart,
        tueDinnerEnd: req.body.tueDinnerEnd,
        wedDinner: req.body.wedDinner,
        wedDinnerStart: req.body.wedDinnerStart,
        wedDinnerEnd: req.body.wedDinnerEnd
    })
    try {
    const savedPosition = await position.save();
    res.json(savedPosition);
    }catch(error){
        res.json({message: error});
    }
});

router.get('/:positionId', async (req, res) => {
    try{
        const position = await Position.findById(req.params.positionId);
        res.json(position);
    }catch(error){
        res.json({message: error});
    }


});

router.delete('/:positionId', async (req,res) => {
    try{
        const removedPosition = await Position.findByIdAndDelete(req.params.positionId)
        res.json(removedPosition);
    }catch(error){
        res.json({message: error});
    }
})

router.patch('/:positionId', async(req,res)=>{
    try{
        const updatedPosition = await Position.findByIdAndUpdate(
            req.params.positionId,
            { $set: req.body},
            { new: true, runVailidators: true}
        );
        res.json(updatedPosition);
    }catch(error){
        res.json({message: error});
    }
})

module.exports = router;