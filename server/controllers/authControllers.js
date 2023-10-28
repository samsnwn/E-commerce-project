import User from "../models/UserModel.js";
import { createHash } from "crypto";
import asyncHandler from "express-async-handler";
import ExpressError from "../utils/ExpressError.js";
import { createSendToken } from "../utils/generateToken.js";
import { verifyEmailSender, resetPasswordMail } from "../models/Email.js";

export const registrationController = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const domain = req.get("origin");

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new ExpressError(`User already exists`, 404);
  }
  // Create new User instance
  const newUser = new User({
    name: req.body.name,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    email: req.body.email,
  });

  // Password hash is done between here by the UserSchema

  // Save user to DB
  const savedUser = await User.create(newUser);

  if (savedUser) {
    // Make password undefined for security purposes
    savedUser.password = undefined;

    // Send verification email
    verifyEmailSender(savedUser.email, savedUser._id, domain);

    // Send response to frontend
    res.status(200).json({ message: "User created successfully" });
  } else {
    throw new ExpressError("Invalid user data", 500);
  }
});

export const googleRegistrationController = asyncHandler(
  async (req, res, next) => {
    const { email } = req.body.email;
    const user = await User.findOne({ email });

    const hashedPassword = createHash("sha256")
      .update(req.body.aud)
      .digest("hex");

    if (user) {
      createSendToken(user, 201, res);
    } else {
      const newUser = new User({
        name: req.body.name,
        password: hashedPassword,
        passwordConfirm: hashedPassword,
        email: req.body.email,
        googleId: req.body.sub,
        isVerified: req.body.email_verified,
      });
      const savedUser = await User.create(newUser);

      if (savedUser) {
        // Make password undefined for security purposes
        savedUser.password = undefined;

        // Send response to frontend
        createSendToken(savedUser, 201, res);
      } else {
        throw new ExpressError("Invalid user data", 500);
      }
    }
  }
);

export const loginController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // checks if email exists in DB
  const user = await User.findOne({ email }).select("+password");

  // If user does not exist or password is incorrect(done in UserSchema)
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new ExpressError("Invalid email or password", 401);
  }

  // Make password undefined for security purposes
  user.password = undefined;

  // If everything is ok and user is verified, send token to client
  if (user.isVerified) {
    createSendToken(user, 201, res);
  } else {
    throw new ExpressError("Please verify your email address", 401);
  }
});

export const googleLoginController = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // checks if email exists in DB
  const user = await User.findOne({ email });

  // If everything is ok and user is verified, send token to client
  if (user) {
    createSendToken(user, 201, res);
  } else {
    throw new ExpressError(
      "User does not exist, please create a new account first",
      401
    );
  }
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  //  1) Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ExpressError("A user does not exist with this email", 404));
  }

  //  2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const domain = req.get("origin");

  resetPasswordMail(user.email, user._id, resetToken, domain);
  res.status(200).json({
    status: "success",
    message: "Check your inbox to proceed ",
  });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) Set the new password only if token did not expire and there is user
  if (!user) {
    return next(new ExpressError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user(done in userSchema)

  // 4) Send success message
  res.status(201).json({
    status: "success",
    message: "Password changed successfully",
  });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  // 2) Check if posted password is correct
  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new ExpressError("Password is incorrect", 401));
  }

  if (newPassword !== newPasswordConfirm) {
    return next(new ExpressError("Passwords do not match", 401));
  }

  // 3) Update the password
  user.password = newPassword;
  user.passwordConfirm = null;
  await user.save();
  s;
  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});

// Email verification controller
export async function emailVerificationController(req, res, next) {
  const id = req.params.id;
  try {
    await User.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    ).select("-password");
    res
      .status(200)
      .json({ message: "Your email has been successfully verified" });
  } catch (error) {
    return next(
      new ExpressError("There has been an error, please try again", 401)
    );
  }
}

export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged out" });
});
