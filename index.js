require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)
const port = process.env.APP_PORT || 3000;
const Router = require('./routers/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const consola = require('consola');

io.on('connection', function(client) {
    // Join for chatID
    client.on('join', function(data) {
        // Get by emit join
        var chatID = data;
        client.on('push', function(data) {
            // Dynamic from chatID
            client.emit(chatID, data);
            // Dynamic from chatID
            client.broadcast.emit(chatID, data);
        });
    });
});

// Use libraries
app.engine('pug', require('pug').__express);
app.set('views', './views');
app.set('view engine', 'pug');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Init route
app.use('/', Router);

// Listen port
server.listen(port, function(){
    consola.ready({
        message: `Listening on *:${port}`,
        badge: true
    });
});