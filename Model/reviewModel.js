const mongoose = require('mongoose')
const Maid = require('./maidModel');
const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review cannot be empty']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'rating cannot be empty']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    User: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'review must belong to user']
    },
    Maid: {
        type: mongoose.Schema.ObjectId,
        ref: 'Maid',
        required: [true, 'review must be assigned to an Maid']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

reviewSchema.index({ User: 1, Maid: 1 }, { unique: true })
reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'User',
        select: 'name photo'
    })
    next();
})

reviewSchema.statics.calcAverageRatings = async function (MaidId) {
    const stats = await this.aggregate([
        {
            $match: { Maid: MaidId }
        },
        {
            $group: {
                _id: '$Maid',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ])
    if (stats.length > 0) {
        await Maid.findByIdAndUpdate(MaidId, {
            ratingsAverage: stats[0].avgRating,
            ratingsQuantity: stats[0].nRating,
        })
    }
    else {
        await Maid.findByIdAndUpdate(MaidId, {
            ratingsAverage: 4,
            ratingsQuantity: 0,
        })
    }
}
reviewSchema.post('save', function () {
    this.constructor.calcAverageRatings(this.Maid);
})

reviewSchema.pre(/^findOneAnd/, async function () {
    this.r = await this.findOne();
    next();
})

reviewSchema.post(/^findOneAnd/, async function (next) {
    await this.r.constructor.calcAverageRatings(this.r.tour);
})
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;