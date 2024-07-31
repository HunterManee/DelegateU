const express = require('express');
const ConnectionManager = require('../ConnectionManager');
const router = express.Router();
const schemaPosition = require('../models/Position');

router.get('/', async (req, res) => {
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Position = connectionGroup.model('Position', schemaPosition);
    try{
        const positions = await Position.find();
        res.json(positions);
    }catch(error){
        console.error('Error fetching position:', error);
        res.status(500).json({ message: error.message });    
    }
});

router.post('/', async (req,res) => {
    console.log('post recived');
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Position = connectionGroup.model('Position', schemaPosition);
    const formCollection = req.body;
    try {

        for(const dataset of formCollection) {
            const position = new Position({
                name: dataset.name,

                thuBreakfast: dataset.thuBreakfast,
                thuBreakfastStart: dataset.thuBreakfastStart,
                thuBreakfastEnd: dataset.thuBreakfastEnd,
                friBreakfast: dataset.friBreakfast,
                friBreakfastStart: dataset.friBreakfastStart,
                friBreakfastEnd: dataset.friBreakfastEnd,
                satBreakfast: dataset.satBreakfast,
                satBreakfastStart: dataset.satBreakfastStart,
                satBreakfastEnd: dataset.satBreakfastEnd,
                sunBreakfast: dataset.sunBreakfast,
                sunBreakfastStart: dataset.sunBreakfastStart,
                sunBreakfastEnd: dataset.sunBreakfastEnd,
                monBreakfast: dataset.monBreakfast,
                monBreakfastStart: dataset.monBreakfastStart,
                monBreakfastEnd: dataset.monBreakfastEnd,
                tueBreakfast: dataset.tueBreakfast,
                tueBreakfastStart: dataset.tueBreakfastStart,
                tueBreakfastEnd: dataset.tueBreakfastEnd,
                wedBreakfast: dataset.wedBreakfast,
                wedBreakfastStart: dataset.wedBreakfastStart,
                wedBreakfastEnd: dataset.wedBreakfastEnd,

                thuBrunch: dataset.thuBrunch,
                thuBrunchStart: dataset.thuBrunchStart,
                thuBrunchEnd: dataset.thuBrunchEnd,
                friBrunch: dataset.friBrunch,
                friBrunchStart: dataset.friBrunchStart,
                friBrunchEnd: dataset.friBrunchEnd,
                satBrunch: dataset.satBrunch,
                satBrunchStart: dataset.satBrunchStart,
                satBrunchEnd: dataset.satBrunchEnd,
                sunBrunch: dataset.sunBrunch,
                sunBrunchStart: dataset.sunBrunchStart,
                sunBrunchEnd: dataset.sunBrunchEnd,
                monBrunch: dataset.monBrunch,
                monBrunchStart: dataset.monBrunchStart,
                monBrunchEnd: dataset.monBrunchEnd,
                tueBrunch: dataset.tueBrunch,
                tueBrunchStart: dataset.tueBrunchStart,
                tueBrunchEnd: dataset.tueBrunchEnd,
                wedBrunch: dataset.wedBrunch,
                wedBrunchStart: dataset.wedBrunchStart,
                wedBrunchEnd: dataset.wedBrunchEnd,

                thuLunch: dataset.thuLunch,
                thuLunchStart: dataset.thuLunchStart,
                thuLunchEnd: dataset.thuLunchEnd,
                friLunch: dataset.friLunch,
                friLunchStart: dataset.friLunchStart,
                friLunchEnd: dataset.friLunchEnd,
                satLunch: dataset.satLunch,
                satLunchStart: dataset.satLunchStart,
                satLunchEnd: dataset.satLunchEnd,
                sunLunch: dataset.sunLunch,
                sunLunchStart: dataset.sunLunchStart,
                sunLunchEnd: dataset.sunLunchEnd,
                monLunch: dataset.monLunch,
                monLunchStart: dataset.monLunchStart,
                monLunchEnd: dataset.monLunchEnd,
                tueLunch: dataset.tueLunch,
                tueLunchStart: dataset.tueLunchStart,
                tueLunchEnd: dataset.tueLunchEnd,
                wedLunch: dataset.wedLunch,
                wedLunchStart: dataset.wedLunchStart,
                wedLunchEnd: dataset.wedLunchEnd,

                thuDinner: dataset.thuDinner,
                thuDinnerStart: dataset.thuDinnerStart,
                thuDinnerEnd: dataset.thuDinnerEnd,
                friDinner: dataset.friDinner,
                friDinnerStart: dataset.friDinnerStart,
                friDinnerEnd: dataset.friDinnerEnd,
                satDinner: dataset.satDinner,
                satDinnerStart: dataset.satDinnerStart,
                satDinnerEnd: dataset.satDinnerEnd,
                sunDinner: dataset.sunDinner,
                sunDinnerStart: dataset.sunDinnerStart,
                sunDinnerEnd: dataset.sunDinnerEnd,
                monDinner: dataset.monDinner,
                monDinnerStart: dataset.monDinnerStart,
                monDinnerEnd: dataset.monDinnerEnd,
                tueDinner: dataset.tueDinner,
                tueDinnerStart: dataset.tueDinnerStart,
                tueDinnerEnd: dataset.tueDinnerEnd,
                wedDinner: dataset.wedDinner,
                wedDinnerStart: dataset.wedDinnerStart,
                wedDinnerEnd: dataset.wedDinnerEnd
            })
            const savedPosition = await position.save();
            ConnectionManager.broadcastRequestToGroup(groupId, savedPosition, 'positions', 'POST');
        }
        res.status(201).json({ message: 'Position saved successfully' });
    }catch(error){
        console.error('Error saving position:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/:positionId', async (req, res) => {
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Position = connectionGroup.model('Position', schemaPosition);
    try{
        const position = await Position.findById(req.params.positionId);
        if (!position) {
            res.status(404).json({ message: 'Position not found' });
            return;
        }
        res.json(position);
    }catch(error){
        console.error('Error fetching position:', error);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:positionId', async (req,res) => {
    console.log('delete');
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Position = connectionGroup.model('Position', schemaPosition);
    try{
        const removedPosition = await Position.findByIdAndDelete(req.params.positionId)
        if (!removedPosition) {
            res.status(404).json({ message: 'Position not found' });
            return;
        }
        ConnectionManager.broadcastRequestToGroup(groupId, removedPosition, 'positions', 'DELETE');
        res.json({ message: 'Position deleted successfully' });
    }catch(error){
        console.error('Error deleting position:', error);
        res.status(500).json({ message: error.message });    
    }
})

router.patch('/:positionId', async(req,res)=>{
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Position = connectionGroup.model('Position', schemaPosition);
    try{
        const updatedPosition = await Position.findByIdAndUpdate(
            req.params.positionId,
            { $set: req.body},
            { new: true, runVailidators: true}
        );
        if (!updatedPosition) {
            res.status(404).json({ message: 'Position not found' });
            return;
        }
        ConnectionManager.broadcastRequestToGroup(groupId, updatedPosition, 'positions', 'PATCH');
        res.json(updatedPosition);
    }catch(error){
        console.error('Error updating position:', error);
        res.status(500).json({ message: error.message }); 
    }
})

module.exports = router;