const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');
const Maid = require('./../Model/maidModel')
const multer = require('multer')
const sharp = require('sharp')
const factory = require('./handleFactory')


const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an image! please upload only images.', 400), false)
    }
}
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `maid-${req.user.id}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
        .resize(500, 600)
        .toFormat('jpeg')
        .toFile(`public/img/users/${req.file.filename}`);

    next();
})
exports.getTop5Maids = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name, price, ratingsAverage, role, photos, videos, verified, city'
    next();
}
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    })
    return newObj;
}

exports.updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This routes is not for password updates', 401))
    }
    const filterBody = filterObj(req.body, 'name', 'email');
    if (req.file) filterBody.photo = req.file.filename;

    const updatedUser = await Maid.findByIdAndUpdate(req.user.id, filterBody, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    })
})

exports.getMaidInCity = catchAsync(async (req, res, next) => {
    const maid = await Maid.find({
        city: req.body.city
    })
    if (!maid) {
        return next(new AppError('No maid found in this city', 400))
    }

    res.status(200).json({
        status: 'success',
        data: {
            maid,
        }
    });

})

exports.getMaidInYourCity = catchAsync(async (req, res, next) => {
    const maid = await Maid.find({
        city: req.user.city
    })
    if (!maid) {
        return next(new AppError('No maid found in your city', 400))
    }

    res.status(200).json({
        status: 'success',
        data: {
            maid,
        }
    })
})


exports.getMaid = factory.getOne(Maid)

exports.getAllMaid = factory.getAll(Maid)

exports.updateMaid = factory.updateOne(Maid)

exports.deleteMaid = factory.deleteOne(Maid)