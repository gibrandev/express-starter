require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.APP_PORT || 3000;
const Router = require('./routers/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const consola = require('consola');

app.engine('pug', require('pug').__express);
app.set('views', './views');
app.set('view engine', 'pug');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', Router);

app.listen(port, () => {
    consola.success(`Listening at http://0.0.0.0:${port}`);
});