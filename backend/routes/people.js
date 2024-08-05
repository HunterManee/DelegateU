const express = require('express');
const axios = require('axios');
const ConnectionManager = require('../managers/ConnectionManager');
const router = express.Router();
const schemaPerson = require('../models/Person');

router.get('/', async(req, res) => {
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Person = connectionGroup.model('Person', schemaPerson);
    try{
        const person = await Person.find();
        res.json(person);
    }catch(error){
        console.error('Error fetching person:', error);
        res.status(500).json({ message: error.message });    }
});

router.post('/', async (req,res) => {
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Person = connectionGroup.model('Person', schemaPerson);
    const person = new Person({
        name: req.body.name,

        role: req.body.role,

        thu: req.body.thu,
        thuStart: req.body.thuStart,
        thuEnd: req.body.thuEnd,
        thuBreakTime: req.body.thuBreakTime,
        thuBreakStatus: req.body.thuBreakStatus,
        thuPosition: req.body.thuPosition,
        fri: req.body.fri,
        friStart: req.body.friStart,
        friEnd: req.body.friEnd,
        friBreakTime: req.body.friBreakTime,
        friBreakStatus: req.body.friBreakStatus,
        friPosition: req.body.friPosition,
        sat: req.body.sat,
        satStart: req.body.satStart,
        satEnd: req.body.satEnd,
        satBreakTime: req.body.satBreakTime,
        satBreakStatus: req.body.satBreakStatus,
        satPosition: req.body.satPosition,
        sun: req.body.sun,
        sunStart: req.body.sunStart,
        sunEnd: req.body.sunEnd,
        sunBreakTime: req.body.sunBreakTime,
        sunBreakStatus: req.body.sunBreakStatus,
        sunPosition: req.body.sunPosition,
        mon: req.body.mon,
        monStart: req.body.monStart,
        monEnd: req.body.monEnd,
        monBreakTime: req.body.monBreakTime,
        monBreakStatus: req.body.monBreakStatus,
        monPosition: req.body.monPosition,
        tue: req.body.tue,
        tueStart: req.body.tueStart,
        tueEnd: req.body.tueEnd,
        tueBreakTime: req.body.tueBreakTime,
        tueBreakStatus: req.body.tueBreakStatus,
        tuePosition: req.body.tuePosition,
        wed: req.body.wed,
        wedStart: req.body.wedStart,
        wedEnd: req.body.wedEnd,
        wedBreakTime: req.body.wedBreakTime,
        wedBreakStatus: req.body.wedBreakStatus,
        wedPosition: req.body.wedPosition
    })
    try{
        const savedPerson = await person.save()
        ConnectionManager.broadcastRequestToGroup(groupId, savedPerson, 'people', 'POST');
        res.status(201).json({ message: 'Person saved successfully' });
    }catch(error){
        console.error('Error saving person:', error);
        res.status(500).json({ message: error.message });    }
});

router.get('/:personId', async (req, res) => {
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Person = connectionGroup.model('Person', schemaPerson);
    try{
        const person = await Person.findById(req.params.personId);
        if (!person) {
            res.status(404).json({ message: 'Person not found' });
            return;
        }
        res.json(person);
    }catch(error){
        console.error('Error fetching person:', error);
        res.status(500).json({ message: error.message });    }
})

router.delete('/:personId', async (req,res) => {
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Person = connectionGroup.model('Person', schemaPerson);
    try{
        const removedPerson = await Person.findByIdAndDelete(req.params.personId)
        if (!removedPerson) {
            res.status(404).json({ message: 'Person not found' });
            return;
        }
        ConnectionManager.broadcastRequestToGroup(groupId, removedPerson, 'people', 'DELETE');
        res.json({ message: 'Person deleted successfully' });
    }catch(error){
        console.error('Error deleting person:', error);
        res.status(500).json({ message: error.message });    }
})

router.patch('/:personId', async(req,res)=>{
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Person = connectionGroup.model('Person', schemaPerson);
    try{
        const updatedPerson = await Person.findByIdAndUpdate(
            req.params.personId,
            { $set: req.body},
            { new: true, runVailidators: true}
        );
        if (!updatedPerson) {
            res.status(404).json({ message: 'Person not found' });
            return;
        }
        ConnectionManager.broadcastRequestToGroup(groupId, updatedPerson, 'people', 'PATCH');
        if(req.body.break !== undefined) {
            data = {
                "personId": updatedPerson._id
            };
            if(req.body.break === 'start') {
                data['breakLength'] = req.body.breakLength;
                await axios.post(`https://delegateubackend.azurewebsites.net?groupId=${groupId}`,data);
            }
            else if(req.body.break === 'incomplete') {
                await axios.delete(`https://delegateubackend.azurewebsites.net/${data.personId}?groupId=${groupId}`)
            }
            
        }
        res.json(updatedPerson);
    }catch(error){
        console.error('Error updating person:', error);
        res.status(500).json({ message: error.message });    
    }
})


module.exports = router;