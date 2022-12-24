const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const dbo = require('./db/conn');

app.use(cors());
app.use(express.json());


const port = process.env.PORT || 5000;

app.listen(port, () => {
    dbo.connectToServer(err => {
        if (err) throw err;
    });

    console.log(`Server is running on port ${port}...`);
});