const catchAsync = require('../Utils/catchAsync');




exports.getStart = catchAsync(async (req, res, next) => {
    res.status(200).render('startingPage');
})
exports.getLoginPage = catchAsync(async (req, res, next) => {
    res.status(200).render('login')
})

exports.getMaidLoginPage = catchAsync(async (req, res, next) => {
    res.status(200).render('base', {
        purpose: 'This is for Maid login page'
    })
})
exports.getsignupPage = catchAsync(async (req, res, next) => {
    res.status(200).render('signup')
})

exports.getoverview = catchAsync(async (req, res, next) => {
    res.status(200).render('overview', {
        purpose: req.user.name
    });
})