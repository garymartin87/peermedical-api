const express = require('express');
require('dotenv').config();
//var mongoose = require('mongoose');

const routes = require('./routes/index');

const app = express();

app.use('/', routes);

let port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`peermedical-api listening on port ${port}!`)
);
