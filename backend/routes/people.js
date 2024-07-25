const express = require('express');
const ConnectionManager = require('../ConnectionManager');
const router = express.Router();
const schemaPerson = require('../models/Person');

router.get('/', async(req, res) => {
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    const connectionGroup = connectionClientGroup['connection'];
    const Person = connectionGroup.model('Person', schemaPerson);
    try{
        const people = await Person.find();
        res.json(people);
    }catch(error){
        res.json({message: error});
    }
});

router.post('/', async (req,res) => {
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
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
        res.json(savedPerson);
    }catch(error){
        res.json({message: error});
    }
});

router.get('/:personId', async (req, res) => {
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    const connectionGroup = connectionClientGroup['connection'];
    const Person = connectionGroup.model('Person', schemaPerson);
    try{
        const person = await Person.findById(req.params.personId);
        res.json(person);
    }catch(error){
        res.json({message: error});
    }
})

router.delete('/:personId', async (req,res) => {
    try{
        const removedPerson = await Person.findByIdAndDelete(req.params.personId)
        res.json(removedPerson);
    }catch(error){
        res.json({message: error});
    }
})

router.patch('/:personId', async(req,res)=>{
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    const connectionGroup = connectionClientGroup['connection'];
    const Person = connectionGroup.model('Person', schemaPerson);
    try{
        const updatedPerson = await Person.findByIdAndUpdate(
            req.params.personId,
            { $set: req.body},
            { new: true, runVailidators: true}
        );
        res.json(updatedPerson);
    }catch(error){
        res.json({message: error});
    }
})


module.exports = router;