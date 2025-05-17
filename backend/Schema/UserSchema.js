import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';


const userSchema = new mongoose.Schema({
  profilePreviewId: { type: String, default: uuidv4 },
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
      icon: { type: String, default: "" },
    },
  ],
  shop: [
    {
      linkTitle: { type: String, required: true },
      linkUrl: { type: String, required: true },
      icon: { type: String, default: "" },
    },
  ],

  bannerColor: { type: String, default: "" },

  profileLayout: { type: String, default: 'stack' },
  buttonStyle: { type: String, default: 'fillOne' },
  buttonColor: { type: String, default: '#ffffff' },
  buttonFontColor: { type: String, default: '#888888' },
  fontFamily: { type: String, default: 'default' },
  fontColor: { type: String, default: '#ffffff' },
  theme: { type: String, default: 'airSnow' },
}, 
{ timestamps: true }
); 

export default mongoose.model("User", userSchema);
