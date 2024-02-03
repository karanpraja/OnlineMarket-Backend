const { UserSchema } = require("../model/AuthModel")

exports.fetchUserById=async(req,res)=>{
    const {id}=req.params
console.log("response")
const User=await UserSchema.findById(id)//we don't use second await as response except creating sth 
console.log(User)
try
{
res.status(200).json(User)
}catch(err){
    console.log("err")
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
