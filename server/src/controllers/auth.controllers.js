import ErrorHandler from "../middlewares/error.middlewares.js";
import { User } from "../models/auth.models.js";
import { sendCookie } from "../utils/features.js";
import bcrypt from "bcrypt";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return next(new ErrorHandler("Invalid Username Or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Username Or Password", 400));

    sendCookie(user, res, `Okairi ${user.name}`);
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exists", 400));

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookie(user, res, `Yokoso ${user.name}`, 201);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      // httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: "lax",
      secure: false,
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
      user: req.user,
    });
};

export const profile = async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const updateProfile =async(req,res,next)=>{
  
}