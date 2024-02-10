const passport = require("passport")

exports.isAuth=(req,res,done)=>{
    console.log("isAuth")
    console.log(req)
    // if(req.user){
        return passport.authenticate('jwt')
    // }else{
    // res.send(401)
    // }
    }
exports.sanitizeUser=(user)=>{
    return {id:user.id,role:user.role}
}