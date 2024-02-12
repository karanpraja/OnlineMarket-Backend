const { UserSchema } = require("../model/AuthModel")

exports.fetchUserById=async(req,res)=>{
 const {id}=req.user
try
{
const User=await UserSchema.findById(id)//we don't use second await as response except creating sth 
res.status(200).json({id:User.id,role:User.role,addresses:User.addresses,email:User.email})
}catch(err){
    console.log("err")
    console.log(err)
res.status(400).json(err)
}
}
exports.removeUserInfo=async(req,res)=>{    
   try
   {
   res.status(200).json({message:"User info removed successfully!"})
   }catch(err){
       console.log("err")
       console.log(err)
   res.status(400).json(err)
   }
   }

exports.updateLoggedInUserData=async(req,res)=>{
    const {id}=req.params
    console.log(id)
    try{
    const  updatedUser=await UserSchema.findByIdAndUpdate(id,req.body,{new:true})
    console.log("updatedUser")
    console.log(updatedUser)
        res.status(200).json(updatedUser)
    }catch(err){
        console.log('err')
        res.status(400).json(err)
    }
}
