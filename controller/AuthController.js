const { response } = require("express");
const { UserSchema } = require("../model/AuthModel");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");
const jwt=require('jsonwebtoken');
const SECRET_KEY="SECRET_KEY"

exports.createUser = async (req, res) => {
  // console.log(req.body)

  // }catch(err){
  //     res.status(400).json(err)
  // }
  try {
    const salt = crypto.randomBytes(16);
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
            console.log("LoginSuccesfull")
var token = jwt.sign(sanitizeUser(user),SECRET_KEY);
res.cookie('jwt', token, { expires: new Date(Date.now() + 3600000), httpOnly: true })
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
  console.log("loginUser")
const user=req.user
  console.log({loginUser:req.user})
  // user.token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzQ5YTJiMTBkOGRkNTZhNDJlZGRiYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA3NTcyNzM0fQ.9iHoSZZkoV7BakCMRKkQCavLjsjrc1yEPfZwxGrV3dI"
    res.cookie('jwt', user.token, { expires: new Date(Date.now() + 10800000), httpOnly: true }).status(201).json({id:user.id,role:user.role,token:user.token});

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
  const {id}=req.user
  console.log({l:"logout",user:req.user})
  try {
    const User = await UserSchema.findById(id);
    console.log({User:User})
    
    res.clearCookie('jwt').status(200).json({ message: "User LoggedOut Successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const response = await UserSchema.find({}).exec();
    // console.log(response);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.checkUser=async(req,res)=>{
  console.log("CheckUser")
if(req.user){
  res.json(req.user)
}else{
  res.sendStatus(401)
}
};



// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzQ5NmE5YTI0ZmE0NjgzMjRmOGNiOCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA3MzgyNDQxfQ.h9UaRq4vUKMlUAtz90oKs-eM5NWt1NF5x9V2iDm5FZY"