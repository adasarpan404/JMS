const User = require('./../Model/userModel');
const catchAsync = require('./../Utils/catchAsync');
const AppError = require('./../Utils/appError');
const factory = require('./handleFactory');
const multer = require('multer')
const sharp = require('sharp')
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an image! please upload only images.', 400), false)
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
exports.uploadUserPhoto = upload.single('photo');
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `user-${req.user.id}-${Date.now()}.webp`;
    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('webp')
        .toFile(`public/img/users/${req.file.filename}`);

    next();
})
exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This routes is not for password updates', 401))
    }

    const filterBody = filterObj(req.body, 'name', 'email');
    if (req.file) filterBody.photo = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
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
    await User.findByIdAndUpdate(req.user.id, { active: false })
    res.status(204).json({
        status: 'success',
        data: null,
    })
})


exports.getUser = factory.getOne(User);
exports.getAllUser = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User)