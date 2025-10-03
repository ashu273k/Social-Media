import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  // Assuming user info is stored in req.user by authentication middleware
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const verifiedUser = await User.findById(userId).select("-password"); // Exclude password field
    res.json(verifiedUser);
  } catch (error) {
    console.error("Get Current User Error:", errror);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProfile = async (req, res) => {
    
  try {
    const userName = req.params.userName;

    const user = await User.findOne({ userName }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get Profile Error:", error);
  }

};
