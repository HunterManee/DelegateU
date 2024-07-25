const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//Connection Manager
const bcrypt = require('bcrypt');
const ClientGroupConnection = {};
const GroupLoginData = {};

// console.log(process.env);

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
    if(GroupLoginData[username] === undefined) {
        const data = {'Status': false}
        res.json(data);
        return;
    }
    const hashedPassword = GroupLoginData[username].hashedPassword;
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
            const groupId = GroupLoginData[username].groupId;
            res.json(groupId);
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
        const schemaGroupLogin = mongoose.Schema({
            username: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            connection: {
                type: String,
                required: true
            }
        })
        const GroupLogin = connectionLoginInfo.model('GroupLogin', schemaGroupLogin);
        const allLogin = await GroupLogin.find();
        for(const login of allLogin) {
            const groupId = JSON.stringify(login._id).split('"')[1];
            const connection = login.connection;
            const connectionDiningHall = await mongoose.connect(connection);
            ClientGroupConnection[groupId] = {
                'connection': connectionDiningHall,
                'clients': new Array()
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(login.password, salt);

            GroupLoginData[login.username] = {
                'groupId': groupId,
                'hashedPassword': hashedPassword
            };
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

