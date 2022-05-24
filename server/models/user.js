const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "Username already taken"],
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: [true, "Email already taken"],
      validate: {
        validator: validator.email,
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a email"],
      minlength: 6,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async () => {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

module.exports = model("User", UserSchema);
