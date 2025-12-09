import User from "../models/userModel.js";

// @route GET /api/userProfile/
// @desc get loggedIn user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Server error fetching user profile",
    });
  }
};

// @route PUT /api/userProfile
// @desc Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        phoneNumber: updatedUser.phoneNumber,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error saving updated user, try again" });
  }
};
