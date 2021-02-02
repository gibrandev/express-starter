const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.APP_PORT || 3000;
var authController = require('./controllers/authController.js');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/auth', authController);

app.listen(port, () => {
    console.log(`Listening at http://0.0.0.0:${port}`)
});