const express = require('express');
require('dotenv').config();

const routes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

let port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`peermedical-api listening on port ${port}!`)
);
