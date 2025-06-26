const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
    minLength: 2,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Enter a valid email.",
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: validator.isStrongPassword,
    },
  },
});

// hashing password before doing the "save" event in DB.

userSchema.pre("save", async function(next) {
  // hashing the password only once when intially the user adds login value and save
  // on any other further modification to user data which uses the same mongoose save method
  // we'll check first that is the password modified then hashing will happen otherwise skip hashing

  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User
}