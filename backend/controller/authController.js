import { oAuth2Client } from '../utils/googleConfig.js';
import axios from 'axios';
import  jwt  from 'jsonwebtoken';
import User from '../Schema/UserSchema.js';

const googleLogin = async (req, res) => {
    try {
        const {code} = req.query;
        // console.log("Redirect URI being used:", oAuth2Client.redirectUri);
        
        // 1. Exchange authorization code for tokens
        const googleRes = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(googleRes.tokens);

        // 2. Fetch user profile information
        const userResToken = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);

        // const {email} = userResToken.data;
        const { email, given_name, family_name, picture } = userResToken.data;
    
        // 3. Find or create user
        const user = await User.findOne({email : email });

        if (!user) {
          user = await User.create({
            name: `${given_name} ${family_name}`, 
            email,
            password: null,               // no password yet
            profileImage: picture,
            authProvider: "google",
            profileTitle: given_name.toLowerCase(), // optional but useful
          });
        }


        // 4. Generate JWT
        const token = jwt.sign(
          { id: user._id, email },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_TIMEOUT,
          }
        );

        
        // Set cookie same as normal login
        res.cookie("Token", token, {
          httpOnly: true,
          // secure: false,     
          // sameSite: "Lax",
          sameSite: 'None', 
          secure: true,
          maxAge: 5 * 60 * 60 * 1000
        });

        // Return response
        return res.status(200).json({
          message: "User logged in successfully",
          user
        });

    }
    catch(err) {
        console.error("Error during Google login:");
        res.status(500).json({
            message: "Internal server error",
        });
    } 
};

export default googleLogin;
