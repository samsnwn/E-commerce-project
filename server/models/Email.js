import nodemailer from "nodemailer"
import ExpressError from "../utils/ExpressError.js"
import jwt from "jsonwebtoken"
import User from "./UserModel.js"
import dotenv from 'dotenv';
dotenv.config();
// const render = require("@react-email/render")
// const Email = require("../../client/src/emails/VerificationEmail")

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// const emailHtml = render(Email({ url: "https://example.com" }));


// send mail with defined transport object
const verifyEmailSender = async (mailTo, userId) => {
  try {
    await transporter.sendMail({
      from: '"Oldies but Goodies Vintage Clothing" <admin@email.com>', // sender address
      to: mailTo, // list of receivers
      subject: "Please verify your email address", // Subject line
      html: `<p className="text-red-500">Thank you for registering, to prevent spam accounts, please follow this <a href="http://localhost:5173/emailverification/${userId}">link</a><p>`, // html body
    });
  } catch (err) {
    throw new ExpressError(err);
  }
};


const resetPasswordMail = async (mailTo, userId, resetToken) => {
  try {
    await transporter.sendMail({
      from: '"Admin" <admin@email.com>',
      to: mailTo,
      subject: "Password reset",
      text: "Follow the link below",
      html: `<p>To get a new password, please click on this <a href="http://localhost:5173/user/resetpassword/${resetToken}">link</a> and reset your password </p>`,
    });
  } catch (err) {
    throw new ExpressError(err);
  }
};

const sendContactUsEmail = (obj) => {
  return new Promise((resolve, reject) => {
    transporter
      .sendMail({
        from: "authentication-generator@outlook.com",
        to: "authentication-generator@outlook.com",
        subject: "User Messages: " + obj.subject + " from: " + obj.name,
        html: `<h3>${obj.subject}</h3>
      <p>${obj.message}</p>
      <p>${obj.name}</p>
      <p>${obj.email}</p>`,
      })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
export { verifyEmailSender, resetPasswordMail, sendContactUsEmail };
