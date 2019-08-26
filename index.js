const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
mongoose.connection.on('open', function(ref) {
    console.log('Connected to mongo server.');
    return startServer();
});
mongoose.connection.on('error', function(err) {
    console.log('Could not connect to mongo server!');
    return console.error(err);
});

const startServer = () => {
    let port = process.env.PORT || 3000;
    app.listen(port, () =>
        console.log(`peermedical-api listening on port ${port}!`)
    );
};
