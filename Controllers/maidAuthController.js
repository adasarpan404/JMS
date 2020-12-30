const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const AppError = require('./../Utils/appError')
const catchAsync = require('../Utils/catchAsync')
const Maid = require('./../Model/maidModel')

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_In });
};
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production ') cookieOptions.secure = true;

    res.cookie('jwtmaid', token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await Maid.create({
        name: req.body.name,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    e
    if (!email || !password) {
        return next(new AppError('please provide email and password', 400))
    }

    const user = await Maid.findOne({ email }).select('+password');
    console.log(user)
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('incorrect email and password', 401))
    }
    createSendToken(user, 200, res)
})

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' '[1]);
    } else if (req.cookies.jwtmaid) {
        token = req.cookies.jwtmaid;
    }

    if (!token) {
        return next(new AppError('you are not logged in! Please log in to get access', 401))
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await Maid.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError(' The User belonging to this token does not longer exist or you are not reqistered for this route', 401))
    }
    if (currentUser.changePasswordAfter(decoded.iat)) {
        return next(new AppError('user recently changedPassword! please login again', 401))
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});
exports.isLoggedIn = catchAsync(async (req, res, next) => {
    if (req.cookies.jwtmaid) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwtmaid, process.env.JWT_SECRET);
            const currentUser = await Maid.findById(decoded.id);
            if (!currentUser) {
                return next();
            }
            if (currentUser.changePasswordAfter(decoded.iat)) {
                return next()
            }
            res.locals.user = currentUser;
            return res.status(200).redirect('/maidOverview')
        }
        catch (err) {
            return next();
        }
    }
    next();
})

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await Maid.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no Maid associated with these email', 404))
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const message = `you forgot your password? submit a patch request with a new password and password confirm ${resetUrl}.If you don't want to change your password, please ignore this email`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset (Valid for 10 min )',
            message,
        });
        res.status(200).json({
            status: 'success',
            message: 'token sent to mail'
        })
    }
    catch (err) {
        user.passwordResetToken = undefined,
            user.passwordResetExpires = undefined,
            await user.save({ validateBeforeSave: false })

        return next(new AppError('There was an error sending the email. Try again later!', 500))
    }
})

exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gte: Date.now() },
    });

    if (!user) {
        return next(new AppError('token is invalid or expired', 400))
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    createSendToken(user, 200, res);
})

exports.updatePassword = catchAsync(async (req, res, next) => {
    const user = await Maid.findById(req.user.id).select('+password');
    if (!(await user.correctPassword(req.body.passwordConfirm, user.password))) {
        return next(new AppError('Your current password is wrong', 401))
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
})