const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please tell us your name']
    },
    email: {
        type: String,
        required: [true, 'please provide your email'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phonenumber: {
        type: String,
        required: [true, 'please provide phone number'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, ' please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same! '
        }
    },
    role: {
        type: String,
        enum: ['user', 'regional-admin', 'admin'],
        default: 'user'
    },
    city: {
        type: String,
        enum: ['Delhi', 'Noida', 'Mumbai'],
        default: 'Noida'
    },
    passwordChangeAt: Date,
    OTP: String,
    OTPExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangeAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changePasswordAfter = function (JWTtimeStamp) {
    if (this.passwordChangeAt) {
        const changedTimestamp = parseInt(
            this.passwordChangeAt.getTime() / 1000,
            10
        );
        return JWTtimeStamp < changedTimestamp
    }
    return false;
}

userSchema.methods.createPasswordResetToken = function () {
    let OTP = Math.floor(100000 + Math.random() * 900000);
    const OTPString = OTP.toString();
    this.OTP = crypto.createHash('sha256').update(OTPString).digest('hex');
    this.OTPExpires = Date.now() + 10 * 60 * 1000;
    return OTPString;
}
const User = mongoose.model('User', userSchema);
module.exports = User;