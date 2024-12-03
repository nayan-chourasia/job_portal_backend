import { User } from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// LOGIC FOR REGISTERING USER

export const register = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, role } = req.body;
    if (!fullname || !email || !phonenumber || !password || !role) {
      return res.status(400).json({
        message: "Please fill all the fields(registerController)",
        success: false,
      });
    }
    // checking user email exists or not
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "email already exists",
        success: false,
      });
    }
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating new user
    await User.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// LOGIC FOR USER LOGIN

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "please fill all the fields(loginController)",
        success: false,
      });
    }

    // cheching if email present or not in database
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }

    // comparing the password matched or not matached
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }
    // checkin role is correct or not
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesn't exists with current role",
        success: false,
      });
    }
    // logic for generating token
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };
    // logic for storing token in cookies
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

//LOGIC FOR LOGOUT

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out Succesfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// LOGIC TO UPDATE USER PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, skills } = req.body;
    const file = req.file;
    //cloudinary code will be written here
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    //skills will come as string and will store it in array
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; //comes from middleware authentication if user is register then it can update logic
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }
    // updating user data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phonenumber) user.phonenumber = phonenumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    //resume will come here
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; //save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; //save the original file name
    }

    await user.save();
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "profile updated succesfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
