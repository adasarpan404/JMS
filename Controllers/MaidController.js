const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Maid = require('./../Model/maidModel')
const multer = require('multer')
const sharp = require('sharp')
const factory = require('./handleFactory')

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an image! please upload only images', 400))
    }
}
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

exports.uploadUserPhoto = upload.single('photo');
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `maid-${req.user.id}-${Date.now()}.webp`;
    await sharp(req.file.buffer)
        .resize(500, 600)
        .toFormat('webp')
        .toFile(`public/img/maids/${req.file.filename}`);

    next();
})

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
    const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
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

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
        status: 'success',
        data: null
    })
})

exports.getMaid = factory.getOne(Maid);
exports.getAllMaid = factory.getAll(Maid);
exports.updateMaid = factory.updateOne(Maid);
exports.deleteMaid = factory.deleteOne(Maid);