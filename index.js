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
const helmet = require("helmet");
const JwtToken = require('./libs/token');

/*
** Socket io
*/
io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token){
        jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET || '', async (err, decoded) => {
        if(err) return next(new Error('Authentication error'));
            // Check token with lib
            var checkToken = await JwtToken.check(decoded.jti);
            if(checkToken === false) {
                next(new Error('Authentication error'));
            } else {
                socket.decoded = decoded;
                next();
            }
        });
    } else {
        next(new Error('Authentication error'));
    }
});

io.on('connection', (client) => {
    // Join for room
    client.on('join', (data) => {
        // Get by emit join
        var room = data;
        console.log('Join to: ' + room);
        client.on(room, (data) => {
            // Dynamic from room
            client.emit(room, data);
            // Dynamic from room
            client.broadcast.emit(room, data);
            console.log('Broadcast to: ' + room);
        });
    });
    client.on('disconnecting', () => {
        // console.log(client); // the Set contains at least the socket ID
    });
});
/*
** Socket io
*/

/*
** Use libraries
*/
app.use(cors());
app.use(helmet());
app.engine('pug', require('pug').__express);
app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
** Init route
*/
app.use('/', Router);

/*
** Listen port
*/
server.listen(port, () => {
    consola.ready({
        message: `Listening on *:${port}`,
        badge: true
    });
});