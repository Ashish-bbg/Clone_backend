import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateTokenResponse } from "../utils/generateTokenResponse.js";

// simple email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// password must be 6+ chars, at least 1 number and 1 letter
// const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&{}]).{8,}$/;

const rules = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /\d/,
  special: /[!@#$%^&*{}]/,
  minLength: /.{8,}/,
};

const validateUserValue = (name, email, password) => {
  if (!name || !email || !password) {
    return {
      valid: false,
      message: "All fields are required",
    };
  }

  if (!emailRegex.test(email)) {
    return {
      valid: false,
      message: "Invalid email format",
    };
  }

  const failedRules = [];
  for (const [ruleName, regex] of Object.entries(rules)) {
    if (!regex.test(password)) {
      failedRules.push(ruleName);
    }
  }

  if (failedRules.length > 0) {
    return {
      valid: false,
      message: "Password invalid",
      missing: failedRules,
    };
  }
  return { valid: true };
};

// REGISTER
export const registerUser = async (req, res) => {
  try {
    let { name, email } = req.body;
    const { password } = req.body;
    name = name.toLowerCase();
    email = email.toLowerCase();

    const validation = validateUserValue(name, email, password);
    if (!validation.valid) {
      return res.status(400).json({
        message: validation.message,
        missing: validation.missing || [],
      });
    }

    // check if user exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //  response to client
    const userData = generateTokenResponse(res, user);

    res.status(201).json({
      userData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking if field contains values
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // password match
    if (isMatch) {
      const userData = generateTokenResponse(res, user);
      res.status(200).json({
        userData,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @DESC LOGOUT
// POST
export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });
    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error("Logout error:", err.message);
    return res.status(500).json({ message: "Unable to clear cookie" });
  }
};
