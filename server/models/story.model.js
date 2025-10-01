import mongoose, { Mongoose as mongoose } from "mongoose";

const storySchema = new mongoose.Schema(
  {
  

    author: {
      type: mongoose.Schema.Types.ObjectId,
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

    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 24 * 60 * 60, // 24 hours
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("story", storySchema);

export default Story;
