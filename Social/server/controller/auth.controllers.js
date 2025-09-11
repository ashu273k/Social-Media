import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { name, email,  password, userName } = req.body;

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

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({ name, email, password: hashedPassword, userName });
  res.status(201).json(newUser);
}

export const signIn = async (req, res) => {
  const { userName, password} = req.body;
  

  if(!userName || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({userName})
  console.log(user);
  if(!user) {
    return res.status(400).json({ message: "Invalid UserName" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Password" });
  }

  res.status(200).json({ message: "Sign in successful" });
}