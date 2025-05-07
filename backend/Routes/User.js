import express from "express";
const router = express.Router();
import User from '../Schema/UserSchema.js';
import Authenticate from "../Middlewares/Authenticate.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import upload from '../Middlewares/upload.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// =================================get all users==============================================================
router.get('/' , async(req, res)=>{
    const users = await User.find();
    try{
        res.json({UserList: users});
    }
    catch(err){
        res.send(err);
    }
})
// ========================delete all users==============================================================
router.delete('/deleteAll', async(req, res)=>{
    try{
        await User.deleteMany();
    
        res.json({msg: "All users deleted."});
    }
    catch(err){
        res.send(err);
    }
}
)
// ====================================== signup ==============================================================

router.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ msg: "All fields are required." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ msg: "User with this email already exists." });
    }
    const existingUserName = await User.findOne({ name: name });
    if (existingUserName) {
        return res.status(400).json({ msg: "User with this name already exists." });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ msg: "Passwords do not match." });
    }
    try {
        const hashPass = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashPass,
        });
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });
        // console.log('token of signin', token);
        res.cookie('Token', token, {
            httpOnly: true,
            maxAge: 5 * 60 * 60 * 1000,
            // sameSite: 'None',
            // secure: true,
            secure: false,
            sameSite: 'Lax',
        });
        return res.status(200).json({ msg: "User registered and logged in!", user });
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ msg: "Server error during signup." });
    }
});

// ======================================login===============================================================
router.post('/login', async (req, res)=>{
    const { userName, password } =   req.body;

    const existingUser = await User.findOne({ profileTitle: userName });
    if (!existingUser) {
      return res.status(400).json({msg:"User does not exists."});
    }

    const payload = { id: existingUser.id }

    // compare password
    bcrypt.compare(password, existingUser.password, (err, isMatch) => { 
        if (err) {
            console.error('Error comparing passwords:', err); 
            return res.status(500).json({ msg: "An error occurred while checking the password." });
          }
        if (isMatch){
            // create token
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"5h"});
            // store token in cokkie
            res.cookie('Token', token, {
                httpOnly: false, 
                maxAge:5 * 60 * 60 * 1000,
                // sameSite: 'None', 
                // secure: true,
                secure: false,
sameSite: 'Lax',

              });
          
            return res.status(200).json({msg: "You are logged in!" ,existingUser});
        } 
        else {
            // Password mismatch
            return res.status(400).json({ msg: "Incorrect password." });
          }
    });
})

//------------------------- logout--------------------------------------
router.post('/logout', (req, res) => {
    res.cookie('Token', '', { 
        httpOnly: true, 
        expires: new Date(0), 
        sameSite: 'None', 
        secure: true 
    });
    return res.status(200).json({ msg: "User logged out successfully." });
});


//------------------------- Update profile title--------------------------------------
router.put("/update-profile-title/:userId", async (req, res) => {
    try {
        const { profileTitle } = req.body;
        const userId = req.params.userId;

        const user = await User.findByIdAndUpdate(
            userId,
            { profileTitle },
            { new: true } 
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile title updated", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
// ============================update profile image===================================
// Upload image
router.post('/upload-profile-image',Authenticate, upload.single('image'), async (req, res) => {
    try {
      const userId = req.user.id; // assumes auth middleware sets req.user
      const user = await User.findById(userId);
  
      // remove old image if exists
      if (user.profileImage) {
        const oldPath = path.join(__dirname, '..', 'uploads', 'profileImages', path.basename(user.profileImage));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
  
      const imageUrl = `/uploads/profileImages/${req.file.filename}`;
      user.profileImage = imageUrl;
      await user.save();
  
      res.json({ success: true, imageUrl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Upload failed' });
    }
  });
  
// ============================ REMOVE  profile image===================================
  router.delete('/remove-profile-image',Authenticate, async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);
  
      if (user.profileImage) {
        const filePath = path.join(__dirname, '..', 'uploads', 'profileImages', path.basename(user.profileImage));
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        user.profileImage = '';
        await user.save();
      }
  
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Delete failed' });
    }
  });
// ===========================Fetch user data ===================================
router.get('/userData', Authenticate, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('name email profileImage');
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

// ==========================Edit user data =======================================
router.put('/update-settings', Authenticate, async (req, res) => {
  try {
    const userId = req.user._id; 

    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password && password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const updateFields = {
      name: `${firstName} ${lastName}`,
      email,
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    res.json({ message: 'User updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


export default router;