const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    region: {
        type: String,
    },
    city: {
        type: String,
        required: [true, 'Maid wants to know which city you work']
    },
    salary: {
        type: Number,
        required: [true, 'Maid wants to know much salary you can give']
    },
    role: {
        type: String,
        enum: ['house-clean', 'cook', 'both']
    },
    comment: {
        type: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'request must belong to user']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

requestSchema.index({ user: 1 }, { unique: true })

requestSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'User',
        select: 'name photo'
    })
})

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;