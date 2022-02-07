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
        minlength: 8,
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
    dateOfBirth: {
        type: Date,
    },
    age: {
        type: Number,
        default: 21
    },
    dateOfJoining: {
        type: Date,
    },
    experience: {
        type: Number,
        default: 3,
    },
    Gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    maritalstatus: {
        type: String,
        enum: ['married', 'unmarried', 'divorced']
    },
    religion: {
        type: String,
        enum: ['hindu', 'muslim', 'sikh', 'christian']
    },
    languageknown: {
        type: String,
        enum: ['Assamese', 'Bengali', 'Bodo', 'Dogri', 'Gujarati', 'Hindi', 'kashmiri', 'Kannada', 'Konkani', 'Maithili', 'Malayalam', 'Manipuri', 'Marathi', 'Nepali', 'Oriya', 'Punjabi', 'Tamil', 'Telugu', 'Santali', 'Sindhi', 'Urdu']
    },
    address1: {
        type: String,
    },
    address2: {
        type: String,
    },
    Country: {
        type: String,
    },
    City: {
        type: String,
    },
    state: {
        type: String,
    },
    zipcode: {
        type: Number,
    },
    price: {
        type: Number,
        default: 4000
    },
    ratingsAverage: {
        type: Number,
        default: 4.2,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
        type: Number,
        default: 1
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: String,
        enum: ['house-clean', 'cook', 'nanny', 'elderlycare'],
        default: 'house-clean'
    },
    videos: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verifiedForWork: {
        type: Boolean,
        default: false,
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
    this.passwordChangeAt = Date.now() - 1000;
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
        const changedTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);
        return JWTtimeStamp < changedTimestamp;
    }
    return false;
}
maidSchema.methods.createPasswordResetToken = function () {
    let OTP = Math.floor(100000 + Math.random() * 900000)
    const OTPString = OTP.toString();
    this.OTP = crypto.createHash('sha256').update(OTPString).digest('hex');
    this.OTPExpires = Date.now() + 10 * 60 * 1000;
    console.log({ OTPString }, this.OTP);

    return OTPString;
}
const Maid = mongoose.model('Maid', maidSchema);

module.exports = Maid;