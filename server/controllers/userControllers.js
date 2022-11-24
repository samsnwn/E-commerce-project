const User = require('../models/UserModel')
const ExpressError = require("../ExpressError");
const bcrypt = require("bcrypt");

exports.updateController = async (req, res, next) => {
    const userId = req.params.id
    const userUpdatedData = req.body;

    try {
        // if all passwords are correct, encrypt newPass and update it in database
        if(userUpdatedData.password) {
            const salt = await bcrypt.genSalt(12);
            const hash = await bcrypt.hash(userUpdatedData.password, salt);
            await User.findByIdAndUpdate(userId, {
                password: hash,
            });
        }
        // update email
        const newUser = await User.findByIdAndUpdate(userId, {
            email: userUpdatedData.email
        }, {new:true}).select('-password')

        req.session.user = newUser;
        res.status(200).json({user: req.session.user, msg: 'Your data has been successfully updated'})

    } catch (err) {
        next(new ExpressError('Failed to Update, Please Try Again', 400));
    }
}


exports.deleteController = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')
    } catch (err) {
        next(new ExpressError('Failed to delete, try again please!', 500))
    }
}

exports.getUserController = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password')

        res.status(200).json({user})
    } catch (err) {
        next(new ExpressError('Cannot find user', 500))
    }
}

exports.getAllUsersController = async (req, res, next) => {
    const query = req.query.new
    try {
        const allUsers = query ? await User.find().select('-password').sort({_id:-1}).limit(5) : await User.find().select('-password');
        res.status(200).json({allUsers})
    } catch (err) {
        next(new ExpressError('Failed to retrieve all users, try again please!', 500))
    }
}

exports.getUserStatsController = async (req, res, next) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {$project: {month: {$month: "$createdAt"}}},
            {$group: {_id: "$month", total:{$sum: 1}}}
        ])
        res.status(200).json(data)
    } catch (err) {
        next(new ExpressError('Failed to retrieve user stats, try again please!', 500))
    }
}