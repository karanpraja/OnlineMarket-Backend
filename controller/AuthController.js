const { response } = require("express")
const { UserSchema } = require("../model/AuthModel")

exports.createUser=async(req,res)=>{
    const User=new UserSchema(req.body)
    console.log(req.body)
    try{
    const response=await User.save()
        console.log((response))
        res.status(201).json(response)
    }catch(err){
        res.status(400).json(err)
    }
}

exports.loginUser=async(req,res)=>{
    // console.log(req)

    if(req.user){
        res.json(req.user)

    }
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
}
exports.logoutUser=async(req,res)=>{
    
  try{
    const User=await UserSchema.findOne({email:req.body.email})
res.status(200).json({message:"User LoggedOut Successfully"})
  }catch(error){
res.status(400).json(error)
  }

}

exports.getAllUsers=async(req,res)=>{
    
    
    try{
    const response=await UserSchema.find({}).exec()
console.log(response)
        res.status(200).json(response)
    }catch(err){
        res.status(400).json(err)
    }
}