const express = require('express');
const ConnectionManager = require('../managers/ConnectionManager');
const router = express.Router();
const schemaBreak = require('../models/Break');

router.get('/', async(req, res) => { 
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    const connectionGroup = connectionClientGroup['connection'];
    const Break = connectionGroup.model('Break', schemaBreak);
    try{
        const breaks = await Break.find();
        res.json(breaks);
    }catch(error){
        res.json({message: error});
    }
});

router.post('/', async (req,res) => {
    let currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMins = currentDate.getMinutes();
    const breakStart = `${currentDate}`;
    currentDate.setHours(currentHours, currentMins + req.body.breakLength);
    const breakEnd = `${currentDate}`;

    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    const connectionGroup = connectionClientGroup['connection'];
    const Break = connectionGroup.model('Break', schemaBreak);
    const newBreak = new Break({
        personId: req.body.personId,
        start: breakStart,
        end: breakEnd
    })
    try {
    const savedBreak = await newBreak.save();
    ConnectionManager.broadcastRequestToGroup(groupId, savedBreak, 'breaks', 'POST');
    res.json(savedBreak);
    }catch(error){
        res.json({message: error});
    }
});

router.get('/:personId', async (req, res) => {
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    const connectionGroup = connectionClientGroup['connection'];
    const Break = connectionGroup.model('Break', schemaBreak);
    try{
        const breaks = await Break.find();
        for(const datasetBreak of breaks) {
            if(req.params.personId === datasetBreak.personId) {
                res.json(datasetBreak);
                break;
            }
        }
    }catch(error){
        res.json({message: error});
    }
})

router.delete('/:personId', async (req,res) => {
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    const connectionGroup = connectionClientGroup['connection'];
    const Break = connectionGroup.model('Break', schemaBreak); 
    try{
        const personId = req.params.personId;
        const breakCollection = await Break.find();
        const incompeleteBreaks = breakCollection.filter(_break => _break.completed === false);
        const breakDataset = incompeleteBreaks.filter(_break => _break.personId === personId);
        const objectIdString = `${Object.values(breakDataset)[0]._id}`;
        const objectId = objectIdString.split("'")[0];
        const removeBreak =
        await Break.findByIdAndDelete(objectId);
        ConnectionManager.broadcastRequestToGroup(groupId, removeBreak, 'breaks', 'DELETE');    
        res.json(removeBreak);
    }catch(error){
        res.json({message: error});
    }
})

router.patch('/:breakId', async(req,res)=>{
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Break = connectionGroup.model('Break', schemaBreak);
    try{
        const updatedBreak = await Break.findByIdAndUpdate(
            req.params.breakId,
            { $set: req.body},
            { new: true, runVailidators: true}
        );
        if (!updatedBreak) {
            res.status(404).json({ message: 'Break not found' });
            return;
        }
        ConnectionManager.broadcastRequestToGroup(groupId, updatedBreak, 'breaks', 'PATCH');
        res.json(updatedBreak);
    }catch(error){
        console.error('Error updating break:', error);
        res.status(500).json({ message: error.message });    
    }
})



module.exports = router;