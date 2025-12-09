import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: false,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
