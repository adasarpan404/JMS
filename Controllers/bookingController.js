const factory = require('./handleFactory')

const booking = require('./../Model/bookingModel')
const catchAsync = require('../Utils/catchAsync')

exports.setMaidUserIds = catchAsync(async (req, res, next) => {
    if (!req.body.Maid) req.body.Maid = req.params.maidId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
})

exports.createBooking = factory.createOne(booking)

exports.getAllBooking = factory.getAll(booking)

exports.getBooking = factory.getOne(booking)


exports.deleteBooking = factory.deleteOne(booking)