const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const bcrypt = require('bcrypt');
const ConnectionManger = require('../managers/ConnectionManager');


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

router.get('/', (req, res) => {
    res.send('We are home')
})
router.get('/health', (req, res) => {
    res.status(200).send('OK');
});


router.post('/', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const groupLoginData = ConnectionManager.getGroupLoginData(username);
    if(groupLoginData === undefined) {
        const data = {'Status': false}
        res.json(data);
        return;
    }
    const hashedPassword = groupLoginData.hashedPassword;
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
            const groupId = groupLoginData.groupId;
            const data = {
                'Status': true,
                'groupId': groupId
            }
            res.json(data);
            return;
        }else {
            const data = {'Status': false}
            res.json(data);
            return; 
        }
    })
});

router.post('/receive-message', (req, res) => {
    const message = req.body.Body;
    const fromNumber = req.body.From;
    const toNumber = req.body.To;
    const groupIds = Object.keys(ConnectionManger.ClientGroupConnection);
    for(const groupId of groupIds) {
        ConnectionManger.broadcastRequestToGroup(groupId, fromNumber);
        const phoneNumber = ConnectionManger.ClientGroupConnection[groupId].phoneNumbe;
        if(toNumber !== phoneNumber) {continue;}
        const broadcast = `${fromNumber}: ${message}`;
        ConnectionManger.broadcastRequestToGroup(groupId, broadcast);
    }
    res.send('<Response></Response>');
})

module.exports = router;