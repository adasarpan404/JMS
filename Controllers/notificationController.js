const Notification = require('./../Model/notificationModel')
const factory = require('./handleFactory')
const catchAsync = require('../Utils/catchAsync')
const server = require('./../server')
exports.getAllNotification = (req, res, next) => {

}
exports.createNotification = catchAsync(async (req, res, next) => {
    const doc = await Notification.create(req.body);
    server.sendNotification(req.body.notificationTitle, req.body.notificationBody);
    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });

})