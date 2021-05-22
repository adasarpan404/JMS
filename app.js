const express = require('express')
const morgan = require('morgan')
const xss = require('xss-clean')
const path = require('path')
const cors = require('cors')
const compression = require('compression')
const mongosantize = require('express-mongo-sanitize')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const app = express();
const bookingRouter = require('./router/bookingRouter')
const reviewRouter = require('./router/reviewRouter')
const userRouter = require('./router/userRouter')
const maidRouter = require('./router/maidRouter')
app.use(morgan('dev'))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'))

app.use(xss());
app.use(mongosantize());
app.use(cors());
app.use(helmet());
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/maids', maidRouter);
app.use('/api/v1/reviews', reviewRouter);
app.all('*', (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server!`, 404))
})
module.exports = app;