const User = require("../models/User");
const { createToken } = require("../utils/jwt");
const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../error");

const registerUser = async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password) {
    throw new CustomError("Enter the required data", StatusCodes.BAD_REQUEST);
  }

  try {
    const newUser = new User({ email, password, username });
    const response = await newUser.save();
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User Successfully created",
      data: { user: response._doc },
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new CustomError(
        "Please enter the required data",
        StatusCodes.BAD_REQUEST
      );
    }
    const user = await User.findOne({ username });
    if (!user) {
      throw new CustomError("Enter valid credentials", StatusCodes.BAD_REQUEST);
    }
    const passwordIsCorrect = await user.comparePassword(password);
    if (!passwordIsCorrect) {
      throw new CustomError("Enter valid credentials", StatusCodes.BAD_REQUEST);
    }
    const token = await createToken(user._doc);
    res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: "User logged in successfully",
      data: { user, token },
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: error.message });
  }
};

module.exports = { loginUser, registerUser };
