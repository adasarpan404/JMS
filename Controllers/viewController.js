const catchAsync = require('../Utils/catchAsync');
const Maid = require('../Model/maidModel')
const APIFeatures = require('../Utils/apiFeatures')




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
exports.getForgotMaidPassword = catchAsync(async (req, res, next) => {
    res.status(200).render('forgotMaidPassword')
})

exports.getResetMaidPassword = catchAsync(async (req, res, next) => {
    res.status(200).render('resetMaidPassword')
})

exports.getVerifyOTP = catchAsync(async (req, res, next) => {
    const email = req.user.email;
    res.status(200).render('verifyOTP', {
        email,
    })
})

exports.getVerifyMaidOTP = catchAsync(async (req, res, next) => {
    const email = req.user.email;
    res.status(200).render('verifyMaidOTP', {
        email,
    })
}

)

exports.getMaid = catchAsync(async (req, res, next) => {
    const AllFeatures = new APIFeatures(Maid.find({ city: req.user.city }), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const cookFeatures = new APIFeatures(Maid.find({ role: 'cook' }), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const nanyFeatures = new APIFeatures(Maid.find({ role: 'nanny' }), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const Allmaids = await AllFeatures.query;
    const cookMaid = await cookFeatures.query;
    const nannyMaids = await nanyFeatures.query;
    res.status(200).render('overview', {
        Allmaids,
        cookMaid,
        nannyMaids
    })

})