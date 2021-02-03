const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.APP_PORT || 3000;
var Router = require('./routers/api');

app.use('/', Router);

app.listen(port, () => {
    console.log(`Listening at http://0.0.0.0:${port}`)
});