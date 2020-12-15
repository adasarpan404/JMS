const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Maid = require('./../Model/maidModel')

const factory = require('./handleFactory')


exports.getTop5Maids = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name, price, ratingsAverage, role, photos, videos, verified, city'
    next();
}

exports.getMaidInCity = catchAsync(async (req, res, next) => {
    const maid = await Maid.find({
        city: req.body.city
    })
    if (!maid) {
        return next(new AppError('No maid found in this city', 400))
    }

    res.status(200).json({
        status: 'success',
        data: {
            maid,
        }
    });

})

exports.getMaidInYourCity = catchAsync(async (req, res, next) => {
    const maid = await Maid.find({
        city: req.user.city
    })
    if (!maid) {
        return next(new AppError('No maid found in your city', 400))
    }

    res.status(200).json({
        status: 'success',
        data: {
            maid,
        }
    })
})


exports.getMaid = factory.getOne(Maid)

exports.getAllMaid = factory.getAll(Maid)

exports.updateMaid = factory.updateOne(Maid)

exports.deleteMaid = factory.deleteOne(Maid)