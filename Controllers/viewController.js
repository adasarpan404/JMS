const catchAsync = require('../Utils/catchAsync');




exports.getStart = catchAsync(async (req, res, next) => {
    res.status(200).render('startingPage');
})
exports.getLoginPage = catchAsync(async (req, res, next) => {
    res.status(200).render('login', {
        purpose: 'Login '
    })
})

exports.getMaidLoginPage = catchAsync(async (req, res, next) => {
    res.status(200).render('maid-login')
})
exports.getMaidSignUpPage = catchAsync(async (req, res, next) => {
    res.status(200).render('signupmaid')
})
exports.getsignupPage = catchAsync(async (req, res, next) => {
    res.status(200).render('signup')
})

exports.getoverview = catchAsync(async (req, res, next) => {
    res.status(200).render('overview', {
        purpose: req.user.name
    });
})

exports.getMaidOverview = catchAsync(async (req, res, next) => {
    res.status(200).render('maidOverview', {
        purpose: req.user.name
    })
})

exports.getUpdatePersonalInformation = catchAsync(async (req, res, next) => {
    res.status(200).render('updatepersonal');
})

exports.getUpdateContactInformation = catchAsync(async (req, res, next) => {
    res.status(200).render('updateContact');
})

exports.getForgetPassword = catchAsync(async (req, res, next) => {
    res.status(200).render('forgotPassword');
})
exports.getResetPassword = catchAsync(async (req, res, next) => {
    res.status(200).render('ResetPassword')
})