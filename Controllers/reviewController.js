const Review = require('./../Model/reviewModel')
const factory = require('./handleFactory')
exports.setMaidUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.Maid) req.body.Maid = req.params.maidId;
    if (!req.body.User) req.body.User = req.user.id;
    next();
};
exports.getReview = factory.getOne(Review)

exports.createReview = factory.createOne(Review)

exports.getAllReview = factory.getAll(Review)

exports.updateUser = factory.updateOne(Review)

exports.deleteUser = factory.deleteOne(Review)