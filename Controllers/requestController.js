const AppError = require('./../Utils/appError')

const Request = require('./../Model/requestModel')

const factory = require('./handleFactory')
const catchAsync = require('../utils/catchAsync')



exports.createRequest = catchAsync(async (req, res, next) => {

    const request = await Request.create({
        region: req.user.region,
        city: req.user.city,
        salary: req.body.salary,
        role: req.body.role,
        user: req.user,
    })

    res.status(201).json({
        status: 'success',
        data: {
            request
        }
    })
})

exports.updateRequest = factory.updateOne(Request);

exports.deleteRequest = factory.deleteOne(Request);

exports.getAllRequest = catchAsync(async (req, res, next) => {
    const request = await Request.find({
        city: req.user.city
    })

    if (!request) {
        return next(new AppError('There is no request in your city. Please wait for some time ', 400))
    }

    res.status(201).json({
        status: 'success',
        request: {
            request
        },
    })
})

exports.getOneRequest = catchAsync(async (req, res, next) => {
    const request = await Request.findById(req.params.id);
    if (!request) {
        return next(new AppError('There is no request to this Id', 400))
    }
    res.status(200).json({
        status: 'success',
        data: {
            request,
        }
    })
})