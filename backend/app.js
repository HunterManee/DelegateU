const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const bcrypt = require('bcrypt');
const ConnectionManager = require('./managers/ConnectionManager');
const WorkerManager = require('./managers/WorkerManager');
const schemaGroupLogin = require('./models/GroupLogin');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

//Import Routes
const peopleRouter = require('./routes/people');
const positionsRouter = require('./routes/positions');
const roleRouter = require('./routes/roles');
const breakRoute = require('./routes/breaks');

app.use('/people', peopleRouter);
app.use('/positions', positionsRouter);
app.use('/roles', roleRouter);
app.use('/breaks', breakRoute);


//ROUTES
app.get('/', (req, res) => {
    res.send('We are home')
})

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});


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

// Create HTTP server and WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Assuming ws is the WebSocket connection and groupId is obtained after login
wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');
    ws.on('message', (message) => {
        console.log('Received message:', message);
        // Handle incoming message, e.g., add to group
        const { groupId, action } = JSON.parse(message);

        if (action === 'join') {
            ws.groupId = groupId;
            ConnectionManager.addClientToGroup(groupId, ws);
        }
    });

    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
        if (ws.groupId) {
            ConnectionManager.removeClientFromGroup(ws.groupId, ws);
            console.log(`Client removed from group ${ws.groupId} due to error`);
        }
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
        if (ws.groupId) {
            ConnectionManager.removeClientFromGroup(ws.groupId, ws);
            console.log(`Client removed from group ${ws.groupId}`);
        }
    });
});

const workerManager = new WorkerManager();
const startBreakCheckPerson = () => {
    const groupIds = Object.keys(ConnectionManager.ClientGroupConnection);
    for(const groupId of groupIds) {
        const task = {
            message: "breakCollection",
            groupId: groupId
        }
        workerManager.assignTask('breakWorker', task);
    }
}

setInterval(() => {
    startBreakCheckPerson();
}, 1000); //1-minute interval

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

