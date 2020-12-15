const express = require('express')
const morgan = require('morgan')
const xss = require('xss-clean')
const mongoSantize = require('express-mongo-sanitize')
const helmet = require('helmet')
const globalErrorHandler = require('./Controllers/errorController')
const userRouter = require('./Router/userRouter');
const maidRouter = require('./Router/maidRouter');
const reviewRouter = require('./Router/reviewRouter')
const requestRouter = require('./Router/requestRouter')
const AppError = require('./Utils/appError')
const app = express();
app.use(morgan('dev'))

app.use(helmet());
app.use(xss());
app.use(mongoSantize());




app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/maids', maidRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/request', requestRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));

})

app.use(globalErrorHandler)
module.exports = app;