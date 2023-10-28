import User from "../models/UserModel.js";

import { genSalt, hash as _hash } from "bcrypt";

import ExpressError from "../utils/ExpressError.js";
import asyncHandler from "express-async-handler";
import {createSendToken} from "../utils/generateToken.js";

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const updateMe = asyncHandler(async (req, res, next) => {
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
export const updateController = async(req, res, next) => {
  const userId = req.params.id;

  try {
    // If its the password that will be updated go here
    if (req.body.password) {
      const salt = await genSalt(12);
      const hash = await _hash(userUpdatedData.password, salt);
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
}

export const deleteMe = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const deleteController = async(req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(new ExpressError("Failed to delete, try again please!", 500));
  }
}

export const getUserController = async(req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json({ user });
  } catch (err) {
    next(new ExpressError("Cannot find user", 500));
  }
}

export const getAllUsersController = async(req, res, next) => {
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
}

export const getUserStatsController = async(req, res, next) => {
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
}


export const getUserProfileController = asyncHandler(async(req, res) => {
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


export const updateUserProfileController = asyncHandler(async(req, res) => {
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
