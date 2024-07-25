const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//Connection Manager
const bcrypt = require('bcrypt');
const ConnectionManager = require('./ConnectionManager');
const schemaGroupLogin = require('./models/GroupLogin');


app.use(cors());
app.use(bodyParser.json());

//Import Routes
const peopleRouter = require('./routes/people');
app.use('/people', peopleRouter);

const positionsRouter = require('./routes/positions');
app.use('/positions', positionsRouter);

const roleRouter = require('./routes/roles');
app.use('/roles', roleRouter);

const breakRoute = require('./routes/breaks');
app.use('/breaks', breakRoute);


//ROUTES
app.get('/', (req, res) => {
    res.send('We are home')
})

app.post('/', async (req,res) => {
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
            //connect client via websocket
            //add websocket connection to ClientGroupConnection
            return;
        }else {
            const data = {'Status': false}
            res.json(data);
            return; 
        }
    })
});

async function getLoginInfo() {
    try{
        const dbURI = process.env.MASTER_CONNECTION;
        const connectionLoginInfo = mongoose.createConnection(dbURI);
        const GroupLogin = connectionLoginInfo.model('GroupLogin', schemaGroupLogin);
        const allLogin = await GroupLogin.find();
        for(const login of allLogin) {
            const groupId = JSON.stringify(login._id).split('"')[1];
            const connection = login.connection;
            const clusterConnection = mongoose.createConnection(connection);
            ConnectionManager.addClientGroupConnection(groupId, clusterConnection);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(login.password, salt);
            ConnectionManager.addGroupLoginData(login.username, groupId, hashedPassword);
        }
        await connectionLoginInfo.close();
    }catch(error) {
        console.log({message: error});
    }
}
getLoginInfo();


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

