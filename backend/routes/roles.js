const express = require('express');
const ConnectionManager = require('../managers/ConnectionManager');
const router = express.Router();
const schemaRole = require('../models/Roles');

router.get('/', async(req, res) => {
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Role = connectionGroup.model('Role', schemaRole);
    try{
        const roles = await Role.find();
        res.json(roles);
    }catch(error){
        console.error('Error fetching role:', error);
        res.status(500).json({ message: error.message });      }
})

router.post('/', async (req,res) => {
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Role = connectionGroup.model('Role', schemaRole);
    const role = new Role({
        name: req.body.name
    })
    try{
        const savedRole = await role.save()
        ConnectionManager.broadcastRequestToGroup(groupId, savedRole, 'roles', 'POST');
        res.status(201).json({ message: 'Position saved successfully' });
    }catch(error){
        console.error('Error saving position:', error);
        res.status(500).json({ message: error.message });    }
});

router.get('/:roleId', async (req, res) => {
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Role = connectionGroup.model('Role', schemaRole);
    try{
        const role = await Role.findById(req.params.roleId);
        if (!role) {
            res.status(404).json({ message: 'Role not found' });
            return;
        }
        res.json(role);
    }catch(error){
        console.error('Error fetching position:', error);
        res.status(500).json({ message: error.message });    }
})

router.delete('/:roleId', async (req,res) => {
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Role = connectionGroup.model('Role', schemaRole);
    try{
        const removedRole = await Role.findByIdAndDelete(req.params.roleId)
        if (!removedRole) {
            res.status(404).json({ message: 'Position not found' });
            return;
        }
        ConnectionManager.broadcastRequestToGroup(groupId, removedRole, 'roles', 'DELETE')
        res.json({ message: 'Role deleted successfully' });
    }catch(error){
        console.error('Error deleting role:', error);
        res.status(500).json({ message: error.message });    }
})

router.patch('/:roleId', async(req,res)=>{
    const groupId = req.query.groupId;
    const connectionClientGroup = ConnectionManager.getClientGroupConnection(groupId);
    if (!connectionClientGroup) {
        res.status(404).json({ message: 'Group not found' });
        return;
    }
    const connectionGroup = connectionClientGroup['connection'];
    const Role = connectionGroup.model('Role', schemaRole);
    try{
        const updatedRole = await Role.findByIdAndUpdate(
            req.params.roleId,
            { $set: req.body},
            { new: true, runVailidators: true}
        );
        if (!updatedRole) {
            res.status(404).json({ message: 'Role not found' });
            return;
        }
        ConnectionManager.broadcastRequestToGroup(groupId, updatedRole, 'roles', 'PATCH');
        res.json(updatedRole);
    }catch(error){
        console.error('Error updating role:', error);
        res.status(500).json({ message: error.message });     }
})


module.exports = router;