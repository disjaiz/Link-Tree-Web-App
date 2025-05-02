import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileTitle: { type: String, default: "" },
  bio: { type: String, default: "" },
  profileImage: { type: String, default: "" },
  social: [
    {
      linkTitle: { type: String, required: true },
      linkUrl: { type: String, required: true },
    },
  ],
  shop: [
    {
      linkTitle: { type: String, required: true },
      linkUrl: { type: String, required: true },
    },
  ],
}, 
{ timestamps: true }
); 


export default mongoose.model("User", userSchema);
