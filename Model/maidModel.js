const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const validator = require('validator')
const maidSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please tell us your name']
    },
    email: {
        type: String,
        required: [true, 'please provide your email'],
        unique: true,
        validate: [validator.isEmail, 'please provide a valide email']
    },
    phonenumber: {
        type: Number,
        required: [true, 'please provide your Phone Number']
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 9,
        select: false,
    },
    passwordConfirm: {
        type: String,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'passwords are not the same'
        }
    },
    price: {
        type: Number,
    },
    ratingsAverage: {
        type: Number,
        default: 4,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: String,
        enum: ['house-clean', 'cook', 'both'],
    },
    videos: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    city: {
        type: String,
        enum: ['Delhi', 'Noida', 'Mumbai'],
    },

    passwordChangeAt: Date,
    passwordResetToken: String,
    PasswordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    }

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });


maidSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'maid',
    localField: '_id'
})

maidSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

maidSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
})

maidSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});
maidSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}
maidSchema.methods.changePasswordAfter = function (JWTtimeStamp) {
    if (this.passwordChangeAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTtimeStamp < changedTimestamp;
    }
    return false;
}
maidSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log({ resetToken }, this.passwordResetToken);

    return resetToken;
}
const Maid = mongoose.model('Maid', maidSchema);

module.exports = Maid;