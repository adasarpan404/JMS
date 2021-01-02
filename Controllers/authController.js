const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync')
const User = require('./../Model/userModel')
const Email = require('./../Utils/email')

const signToken = id => {

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};


exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    const url = `${req.protocol}://${req.get('host')}/`;
    console.log(url);
    await new Email(newUser, url).sendWelcome();
    createSendToken(newUser, 201, res);

})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError('please provide email and password', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('incorrect email and password', 401))
    }
    createSendToken(user, 200, res)
})

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(new AppError('You are not logged in! Please login in to get access', 401))
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('The User belonging to this token does not longer exist', 401))
    }
    if (currentUser.changePasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed Password! please login again', 401));
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
})
exports.isLoggedIn = catchAsync(async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET)
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }
            if (currentUser.changePasswordAfter(decoded.iat)) {
                return next();
            }
            res.locals.user = currentUser;
            return res.status(200).redirect('/overview')
        } catch (err) {
            return next();
        }
    }
    next();
})

exports.restrictTo = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }

        next();
    };
}

exports.logout = catchAsync(async (req, res, next) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
})

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user associated with this email', 404))
    }
    const OTP = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    try {
        await new Email(user, OTP).sendPasswordReset();
        res.status(200).json({
            status: 'success',
            message: 'OTP sent to mail'
        })
    }
    catch (err) {
        user.OTP = undefined,
            user.OTPExpires = undefined,
            await user.save({ validateBeforeSave: false })

        return next(
            new AppError('There was an error sending the email. Try again later!', 500)
        );
    }

})

exports.resetPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({
        OTP: req.body.OTP,
        OTPExpires: { $gte: Date.now() },
    });
    if (!user) {
        return next(new AppError('token is invalid or expired', 400))
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    createSendToken(user, 200, res);
})

exports.updatePassword = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('your current password is wrong', 401));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    createSendToken(user, 200, res);


})