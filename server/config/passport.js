// const GoogleStrategy = require("passport-google-oauth20").Strategy
// const mongoose = require("mongoose")

// const User = require("../models/UserModel")


// module.exports = (passport) => {
//   passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     secret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/callback/google"
//   }, 
//   async(accessToken, refreshToken, profile, done) => {
//     console.log(profile)
//   }))

//   passport.serializeUser((user, cb) => {
//     process.nextTick(() => {
//       cb(null, { id: user.id, username: user.username, name: user.name });
//     });
//   });
  
//   passport.deserializeUser((user, cb) => {
//     process.nextTick(() => {
//       return cb(null, user);
//     });
//   });
// }