const catchAsync = require('../Utils/catchAsync');



exports.getOverview = catchAsync(async (req, res, next) => {
    res.status(200).render('base');
})
