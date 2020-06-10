const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

require("dotenv").config();

const User = require("../models/user");



module.exports = {
  signup: async (req, res) => {
    console.log("user sign up api");
    const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(403).json({
                error: "Email is taken"
            })
        }
        
        const user = await new User(req.body);
        await user.save();
 
    return res.status(200).json({ message: "Signup success. Please login" });
  },
  signin: async (req, res) => {
    //find the user based on email
    const { email, password } = req.body;
    
    User.findOne(
      {
        email: req.body.email
      },
      async (err, user) => {
        //if err or no user
       
        //if user is found, make sure that email and password match
        //create authenticate method in model and use here
        console.log(user);
        
        if (user) {
          if (!user.authenticate(req.body.password, user.password)) {
            return res.status(401).json({
              error: "Email and password do not match"
            });
          }
        }
        

        //generate a token with user_id and secret
        var token = null;
        if (user) {
          token = jwt.sign({ _id: user._id,role : user.role }, process.env.JWT_SECRET);
        }
       

        //persist the token as 't' in cookie with expiry date
        res.cookie("t", token, { expire: new Date() + 9999 });
       

        //return response with user and token to frontend client
        if (user) {
          const { _id, fullName, email } = user;
          return res.json({ token, user: { _id, email, fullName } });
        }
       
      }
    );
  },
  
  signout: (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Signout success" });
  },

  requireSignin: expressJwt({
    secret: process.env.JWT_SECRET
  })
};
