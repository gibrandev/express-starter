require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: "*",
        credentials: false
    },
    allowEIO3: true
});
const port = process.env.APP_PORT || 3000;
const Router = require('./routers/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const consola = require('consola');
const jwt = require('jsonwebtoken');
const pino = require("pino")("./storage/logs/info.log");
const expressPino = require("express-pino-logger")({
  logger: pino
});

io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token){
        jwt.verify(socket.handshake.query.token, `your-256-bit-secret`, function(err, decoded) {
        if(err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
        });
    } else {
        next(new Error('Authentication error'));
    }
});

io.on('connection', (client) => {
    // Join for chatID
    client.on('join', (data) => {
        // Get by emit join
        var chatID = data;
        console.log('Join to: ' + chatID);
        client.on(chatID, (data) => {
            // Dynamic from chatID
            client.emit(chatID, data);
            // Dynamic from chatID
            client.broadcast.emit(chatID, data);
            console.log('Broadcast to: ' + chatID);
        });
    });
    client.on('disconnecting', () => {
        // console.log(client); // the Set contains at least the socket ID
    });
});

// Use libraries
app.use(expressPino);
app.engine('pug', require('pug').__express);
app.set('views', './views');
app.set('view engine', 'pug');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Init route
app.use('/', Router);

// Listen port
server.listen(port, () => {
    consola.ready({
        message: `Listening on *:${port}`,
        badge: true
    });
});