const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    notificationTitle: {
        type: String,
        required: [true, 'please tell us your name']
    },
    notificationBody: {
        type: String,
        required: [true, 'please provide body']
    },
    user: {
        type: mongoose.Schema.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

notificationSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'User',
        select: 'name photo'
    })
    next();
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;