const { response } = require("express");
const { UserSchema } = require("../model/AuthModel");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");

exports.createUser = async (req, res) => {
  // console.log(req.body)

  // }catch(err){
  //     res.status(400).json(err)
  // }
  try {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const User = new UserSchema({
          ...req.body,
          password: hashedPassword,
          salt,
        });
        const user = await User.save();
        // console.log((response))
        // res.status(201).json(sanitizeUser(user))
        req.login(sanitizeUser(user),  (err)=> {
          if (err) {
            console.log(err)
            res.status(400).json(err)
          }else{
            res.status(201).json(sanitizeUser(user))
          }
        //   // res.redirect('/');
        });
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  // console.log(req)

  
    res.json(req.body.user);

  // console.log(req.user)

  // console.log(res.body)
  // try{
  // const User=await UserSchema.findOne({email:req.body.email},'email password id role addresses').exec()
  // console.log("working")
  // console.log(User)
  // if(!User){
  //     res.status(200).json({message:'no such user email'})
  // }else if(User.password===req.body.password){
  //     res.status(200).json(User)
  //     console.log('e2')
  // }else{
  //     res.status(400).json({message:'invalid credentials'})
  // }}catch(err){
  //     res.status(400).json(err)
  // }
};
exports.logoutUser = async (req, res) => {
  try {
    const User = await UserSchema.findOne({ email: req.body.email });
    res.status(200).json({ message: "User LoggedOut Successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const response = await UserSchema.find({}).exec();
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};
