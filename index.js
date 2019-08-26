const express = require('express');
const app = express();
const port = 3000; // ToDo: Move this to .env

const routes = require('./routes/index');
app.use('/', routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));