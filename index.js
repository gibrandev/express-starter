const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.APP_PORT || 3000;
var Router = require('./routers/api');
var bodyParser = require('body-parser')
var cors = require('cors')
const consola = require('consola')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', Router);

app.listen(port, () => {
    consola.success(`Listening at http://0.0.0.0:${port}`)
});