const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { default: validator } = require("validator");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a email"],
      minlength: [6, "Password should be atleast 6 characters long"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("email must be unique"));
  } else {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

module.exports = model("User", UserSchema);
