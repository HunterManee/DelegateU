const express = require('express');
const router = express.Router();
const Role = require('../models/Roles');

router.get('/', async(req, res) => {
    try{
        const roles = await Role.find();
        res.json(roles);
    }catch(error){
        res.json({message: error});
    }
})

router.post('/', async (req,res) => {
    const role = new Role({
        name: req.body.name
    })
    try{
        const savedRole = await role.save()
        res.json(savedRole);
    }catch(error){
        res.json({message: error});
    }
});

router.get('/:roleId', async (req, res) => {
    try{
        const role = await Role.findById(req.params.roleId);
        res.json(role);
    }catch(error){
        res.json({message: error});
    }
})

router.delete('/:roleId', async (req,res) => {
    try{
        const removedRole = await Role.findByIdAndDelete(req.params.roleId)
        res.json(removedRole);
    }catch(error){
        res.json({message: error});
    }
})

router.patch('/:roleId', async(req,res)=>{
    try{
        const updatedRole = await Role.findByIdAndUpdate(
            req.params.roleId,
            { $set: req.body},
            { new: true, runVailidators: true}
        );
        res.json(updatedRole);
    }catch(error){
        res.json({message: error});
    }
})


module.exports = router;