const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: true
    }
}, {timestamps:true})


//  This function fires before the create function is executed
UserSchema.pre("save", async function (next) {
    // Only run this function if password is modified
    if (!this.isModified("password")) return next();
  
    // Hash the pass with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    // Delete password confirm
    // this.confirmPassword = undefined;
    next();
  });
  
  // This function compares passwords
  UserSchema.methods.correctPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

const User = mongoose.model('User', UserSchema)
module.exports = User;