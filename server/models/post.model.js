import mongoose, { Mongoose } from "mongoose";

const postSchema = new mongoose.Schema({
  // author
  // caption
  // content - image , video
  // Date and time
  // Likes
  // Comments

  author: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  caption: {
    type: String,
    default: "",
  },

  mediaType: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },

  mediaUrl: {
    type: String,
    required: true,
  },

  likes: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],

  comments: [
    {
      user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "user",
      },

      text:{
        type:String,
        required:true
      },

      createdAt:{
        type:Date,
        default:Date.now()
      }
    },
  ],
} , {timestamps:true});

const Post = mongoose.model("post", postSchema);

export default Post;