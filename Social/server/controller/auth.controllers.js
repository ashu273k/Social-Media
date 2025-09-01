import User from "../model/user.model.js";

export const signUp = async (req, res) => {
  const { name, userName, email, password } = req.body;

  if(!name || !email || !userName || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUserEmail = await User.findOne({ email });
  if (existingUserEmail) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const existingUserName = await User.findOne({ userName });
  if (existingUserName) {
    return res.status(400).json({ message: "Username already taken" });
  }

  const newUser = await User.create({ name, userName, email, password });
  res.status(201).json({ message: "User created successfully" });
}