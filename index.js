require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: "*",
        credentials: true
    },
    allowEIO3: true
});
const port = process.env.APP_PORT || 3000;
const Router = require('./routers/api');
const cors = require('cors');
const consola = require('consola');
const jwt = require('jsonwebtoken');
const helmet = require("helmet");
const JwtToken = require('./libs/token');

/*
** Socket io
*/
io.on("connection", (socket) => {
    var chatId = socket.handshake.query.chatId;
    var auth = socket.handshake.headers.authorization;
    // get auth
    var checkToken = JwtToken.checkJwt(auth, chatId);
    if(checkToken === false) {
        socket.disconnect();
    };

    socket.join(chatId);
    socket.on("message", (msg) => {
        socket.to(chatId).emit("message", msg);
    });

    socket.on("disconnect", (reason) => {
        console.log(reason);
    });

    socket.on("leave", () => {
        socket.leave(chatId);
        socket.disconnect();
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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