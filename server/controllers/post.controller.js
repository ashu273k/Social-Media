import uploadFile from "../config/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const uploadPost = async (req, res) => {
  try {
    // caption
    //mediaType
    // mediaUrl
    const { mediaType, caption } = req.body;

    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File path:", req.file.path); // Check if path exists

    let mediaUrl = "";
    try {
      mediaUrl = await uploadFile(req.file.path);
      console.log("Cloudinary URL:", mediaUrl);
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return res
        .status(500)
        .json({ message: `Cloudinary upload failed: ${uploadError.message}` });
    }

    if (!mediaUrl) {
      return res
        .status(500)
        .json({ message: "Failed to get media URL from Cloudinary" });
    }

    // create the post

    const post = await Post.create({
      mediaType,
      caption,
      mediaUrl,
      author: req.userId,
    });
    // we need to show posts for a individual user
    const user = await User.findById(req.userId).populate("posts");
    user.posts.push(post._id);
    await user.save();

    // we need to show posts on the feed

    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "userName profileImage"
    );

    return res.status(201).json(populatedPost);

    // userName
    // profileImage
  } catch (error) {
    res.status(500).json({ message: `Cannot Upload$ ${error}` });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate(
      "author",
      "userName profileImage"
    );
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(404).json({ message: "No Posts Found" });
  }
};


export const like = async (req, res) => {
  // Post ID
  // User ID
  // Already liked or not - dislike
  // if not - like
  // username
}