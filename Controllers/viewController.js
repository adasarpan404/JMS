const catchAsync = require('../Utils/catchAsync');




exports.getOverview = catchAsync(async (req, res, next) => {
    const tours = await
        res.status(200).render('base');
})
