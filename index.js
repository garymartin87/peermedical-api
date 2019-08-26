require('dotenv').config();

const express = require('express');
const app = express();

const routes = require('./routes/index');
app.use('/', routes);

app.listen(process.env.PORT, () => console.log(`peermedical-api listening on port ${process.env.PORT}!`));