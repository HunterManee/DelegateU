const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

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
    let data = {
        username: req.body.username,
        password: req.body.password
    }
    if(data.username === process.env.NORTHSTAR_USERNAME &&
        data.password === process.env.NORTHSTAR_PASSWORD) {
            await mongoose.connect(process.env.NORTHSTAR_CONNECTION);
            data = {"Status": true};
            res.json(data);
    }
    else{
        data = {"Status": false};
        res.json(data);
    }
});

mongoose.connect(process.env.NORTHSTAR_CONNECTION);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});