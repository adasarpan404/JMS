const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
})
const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    userCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! shutting down...');
    console.log(err.name, err.message, err.stack);
    server.close(() => { process.exit(1) });
})
