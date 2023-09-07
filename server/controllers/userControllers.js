const User = require("../models/UserModel");

const bcrypt = require("bcrypt");

const ExpressError = require("../utils/ExpressError");
const asyncHandler = require("express-async-handler");
const createSendToken = require("../utils/generateToken");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = asyncHandler(async (req, res, next) => {
  // 1) Create error if user posts password data
  // if (req.body.password || req.body.passwordConfirm) {
  //   return next(
  //     new ExpressError(
  //       "This route is not for passwords updated.Please use /updateMyPassword",
  //       400
  //     )
  //   );
  // }

  // Filtered unwanted field names that are not allowed to be updated
  // const filteredBody = filterObj(req.body, "name", "email");

  // 2) Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.body._id,
    {
      $set: filteredBody,
    },
    { new: true, runValidators: true }
  );

  // createSendToken(updatedUser, 201, res)

  res.status(200).json({
    data: updatedUser,
    status: "success"
  });
});

// Update function only for admin
exports.updateController = async (req, res, next) => {
  const userId = req.params.id;

  try {
    // If its the password that will be updated go here
    if (req.body.password) {
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(userUpdatedData.password, salt);
      req.body.password = hash;
    }

  // Filtered unwanted field names that are not allowed to be updated
    // const filteredBody = filterObj(req.body, "name", "email");

    // gets everything from req.body and sets it in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: req.body,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ updatedUser, msg: "Your data has been successfully updated" });
  } catch (err) {
    next(new ExpressError("Failed to Update, Please Try Again", 400));
  }
};

exports.deleteMe = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.deleteController = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(new ExpressError("Failed to delete, try again please!", 500));
  }
};

exports.getUserController = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json({ user });
  } catch (err) {
    next(new ExpressError("Cannot find user", 500));
  }
};

exports.getAllUsersController = async (req, res, next) => {
  const query = req.query.new;
  try {
    const allUsers = query
      ? await User.find().select("-password").sort({ _id: -1 }).limit(5)
      : await User.find().select("-password");
    res.status(200).json(allUsers);
  } catch (err) {
    next(
      new ExpressError("Failed to retrieve all users, try again please!", 500)
    );
  }
};

exports.getUserStatsController = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    next(
      new ExpressError("Failed to retrieve user stats, try again please!", 500)
    );
  }
};


exports.getUserProfileController = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id)

  if(user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})


exports.updateUserProfileController = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id)

  if(user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if(req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }

})
