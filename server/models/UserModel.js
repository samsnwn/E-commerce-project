const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require('validator')
const crypto = require('crypto');


const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide a valid email address'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide your email']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minLength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        // This only works on create and save!!!
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: 'Passwords do not match'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
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


UserSchema.pre('save', function (next) {
  if(!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = Date.now() - 1000;
  next()
})


//  This function fires before the create function is executed
UserSchema.pre("save", async function (next) {
    // Only run this function if password is modified
    if (!this.isModified("password")) return next();
  
    // Hash the pass with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    // Delete password confirm
    this.passwordConfirm = undefined;
    next();
  });
  
  // This function compares passwords
  UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword,userPassword);
  };

//   Checks is passwords were changed
  UserSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        return JWTTimestamp < changedTimestamp // 100 < 200 
    }
    // False means NOT changed,
    return false
  }

//   Creates password reset token
  UserSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    console.log({resetToken}, this.passwordResetToken)

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
  }


const User = mongoose.model('User', UserSchema)
module.exports = User;