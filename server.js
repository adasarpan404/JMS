const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const socketio = require('socket.io');
const app = require('./app');
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});


const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
var server = require('http').createServer(app);
io = socketio(server)
io.on('connection', socket => {
    exports.sendNotification = (title, body) => {
        socket.emit('notification', {
            title, body
        })
    }
})

server = server.listen(port, () => {
    console.log(`App running on port ${port}...`);
});


process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message, err.stack);
    server.close(() => {
        process.exit(1);
    });
});

