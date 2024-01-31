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
    // try{
    const User=await UserSchema.findOne({email:req.body.email},'email password id').exec()
    console.log("working")
    console.log(User)
    if(!User){
        res.status(200).json({message:'no such user email'})
    }else if(User.password===req.body.password){
        res.status(200).json(User)
        console.log('e2')
    }else{
        res.status(400).json({message:'invalid credentials'})
    }


    // }catch(err){
    //     res.status(400).json(err)
    // }
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