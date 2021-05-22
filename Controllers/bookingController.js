const factory = require('./handleFactory')
const stripe = require('stripe')(process.env.STRIPE_KEY)
const booking = require('./../Model/bookingModel')
const catchAsync = require('../utils/catchAsync')
const Maid = require('./../Model/maidModel')

exports.setMaidUserIds = catchAsync(async (req, res, next) => {
    if (!req.body.Maid) req.body.Maid = req.params.maidId;
    if (!req.body.User) req.body.user = req.user.id;
    next();
})

exports.getSessionCheckOut = catchAsync(async (req, res, next) => {
    const maid = await Maid.findById(req.params.maidId);


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}`,
        cancel_url: `${req.protocol}://${req.get('host')}/maid/${maid.id}`,
        customer_email: req.user.email,
        client_reference_id: req.params.maidId,
        line_items: [
            {
                name: `${maid.name}`,
                description: `you bought this`,
                images: [
                    `${req.protocol}://${req.get('host')}/img/maids/${maid.photo}`
                ],
                amount: maid.price * 100,
                currency: 'INR',
                quantity: 1
            }
        ]
    });

    res.status(200).json({
        status: 'success',
        session
    })




})

exports.getAllBooking = factory.getAll(booking)

exports.getBooking = factory.getOne(booking)

exports.deleteBooking = factory.deleteOne(booking)