const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
    maid: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'booking must belongs to maid']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'booking must belongs to user']
    },
    paid: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
bookingSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'Maid',
        select: 'name photo'
    })
    next();
})

bookingSchema.pre('save', function (next) {
    this.paid = true;
    next();
})

const Booking = mongoose.model('Booking', bookingSchema)