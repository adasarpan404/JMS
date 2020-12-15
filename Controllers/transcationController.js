const factory = require('./handleFactory')

const Transaction = require('./../Model/transactionModel')
const catchAsync = require('../Utils/catchAsync')
const Maid = require('./../Model/maidModel')
const User = require('./../Model/userModel')
const AppError = require('../Utils/appError')
exports.setUserIds = (req, res, next) => {
    if (!req.body.user) {
        req.body.user = req.user._id;
    }
    console.log(req.body.user)
    next();
}
exports.createTransactiontoMaid = catchAsync(async (req, res, next) => {
    const maid = await Maid.findById(req.body.maid);
    const user = await User.findById(req.body.user);
    const rem = user.wallet - maid.price;
    if (!maid) {
        return next(new AppError('Maid with these account do not exist', 400))
    }

    if (rem < 0) {
        return next(new AppError("you donot have money to give to maid", 400))
    }

    const afterpayUser = await User.findByIdAndUpdate(req.body.maidId, {
        wallet: rem
    })

    const transactiondone = await Transaction.create({
        user: req.body.user,
        type: 'debit',
        amount: maid.price,

    })
    res.status(200).json({
        status: 'success',
        afterpayUser,
        transactiondone,

    })
})

exports.createTransactionToUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.body.user)

    let walletM = user.wallet;

    walletM = walletM + req.body.money;
    user.wallet = walletM;
    await user.save({ validateBeforeSave: false })
    const transactiondone = await Transaction.create({
        user: req.body.user,
        transactiontype: 'credit',
        amount: req.body.money,

    })

    res.status(200).json({
        status: 'success',
        user,
        transactiondone,

    })
})

exports.getAllTransaction = catchAsync(async (req, res, next) => {
    console.log(req.user._id);
    const trans = await Transaction.find({ user: req.user._id });
    res.status(200).json({
        status: 'success',
        trans,

    })
})