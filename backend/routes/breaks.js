const express = require('express');
const router = express.Router();
const Break = require('../models/Break');

router.get('/', async(req, res) => {
    try{
        const breaks = await Break.find();
        res.json(breaks);
    }catch(error){
        res.json({message: error});
    }
});

router.post('/', async (req,res) => {
    const newBreak = new Break({
        personId: req.body.personId,
        start: req.body.start,
        end: req.body.end
    })
    try {
    const savedBreak = await newBreak.save();
    savedBreak._id = savedBreak.personId;
    res.json(savedBreak);
    }catch(error){
        res.json({message: error});
    }
});

router.get('/:personId', async (req, res) => {
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
    try{
        const personId = req.params.personId;
        const breaks = await Break.find();
        for(let i = breaks.length-1; i >= 0; i--) {
            if(personId === breaks[i].personId) {
                const datasetId = breaks[i]._id;
                const removeBreak =
                    await Break.findByIdAndDelete(datasetId);
                res.json(removeBreak);
                break;
            }
        }
    }catch(error){
        res.json({message: error});
    }
})



module.exports = router;