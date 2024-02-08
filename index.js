const express = require("express");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy  ;
var crypto = require('crypto');
var db = require('./db');
const server = express();
var jwt = require('jsonwebtoken');
const cors=require('cors')
const mongoose = require("mongoose");
const session=require('express-session')
// const csrf=require('csurf')
var SQLiteStore = require('connect-sqlite3')(session);
const  JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const SECRET_KEY="SECRET_KEY"
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = SECRET_KEY;
// exports.SecretKey='Karan@1234'


const ProductRouter=require('./routes/ProductRoutes') 
const BrandRouter=require('./routes/BrandRoutes') 
const CategoryRouter=require('./routes/CategoryRoutes')
const AuthRouter=require('./routes/AuthRoutes')
const UserRouter=require('./routes/UserRoutes')
const CartRouter=require('./routes/CartRoutes')
const OrderRouter=require('./routes/OrderRoutes');
const { UserSchema } = require("./model/AuthModel");
const { isAuth, sanitizeUser } = require("./services/common");

server.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
// server.use(csrf());
server.use(passport.authenticate('session'));
server.use(cors({
  exposedHeaders:['X-Total-Count'],
}))
server.use(express.json())//to parse a req body
server.use('/products',
// isAuth(),
ProductRouter.router)
server.use('/',BrandRouter.router)
server.use('/',CategoryRouter.router)
server.use('/orders',OrderRouter.router)
server.use('/users',AuthRouter.router)
server.use('/user',UserRouter.router)
server.use('/cart',CartRouter.router)

// console.log("passport")


//pasport strategies
passport.use('local',new LocalStrategy({ usernameField: 'email' }, async function(email, password, done) {
  console.log("Passport")
  // console.log({email,password})
  //by default passport uses username 
  try{
    // console.log(email)
 const user= await UserSchema.findOne({ email: email }).exec()
 console.log({indexUser:user})
 if (!user) {  
  console.log('!USER')
  return done(null,false,{message:"invalid credentials"});
}
      crypto.pbkdf2(
        password,
         user.salt,
          310000, 
          32,
           'sha256',
      async function(err, hashedPassword){
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
          console.log("timingSageEqual")
          console.log(user.password,hashedPassword)
          return done(null, false, {message: 'Incorrect username or password.'});
        }
        console.log("LoginUser")
        console.log("SecretKey:"+SECRET_KEY)
        const token=jwt.sign(sanitizeUser(user),SECRET_KEY)
        console.log(token)
         done(null, {id:user.id,role:user.role,token:token});//we have to use done instead of cb 
      });

  }catch(err)  
  {
    console.log("Error")
    return done(err)
  }
  //     if (err) { ; }
  //     if (!user) { return done(null, false); }
  //     if (!user.verifyPassword(password)) 
  //     { return done(null, false); }
  //     return done(null, user);
  //   });
}));

//PASSPORT JWT
passport.use('jwt',new JwtStrategy(opts, async function(jwt_payload, done) {
  console.log("JWT")
  console.log(jwt_payload)
  // User.findOne({id: jwt_payload.sub}, function(err, user) {
  //     if (err) {
  //         return done(err, false);
  //     }
  //     if (user) {
  //         return done(null, user);
  //     } else {
  //         return done(null, false);
  //         // or you could create a new account
  //     }
  // });
  try{
    console.log("jwt try")
    const user=await UserSchema.findById(jwt_payload.id)
    if (user) {
              return done(null, sanitizeUser(user));
          } else {
              return done(null, false);
              // or you could create a new account
          }
  }catch(err){
    return done(err,false)
  }
}));


//serialize and deserialize
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    console.log("Serialize user")
    return cb(null, { id: user.id,username: user.name});
  });
});


passport.deserializeUser(function(user, cb) {
  console.log("deserializeUser",user)
  process.nextTick(function() {
    return cb(null, user);
  });
});


// const {createProduct}  = require("./controller/ProductController");//it requires one bracket to cause an console.error();

main().catch((error) => console.log(error));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce"); 
  console.log("database connected!");
}
server.get("/", (req, res) => {
  res.json({ status: "Server working properly" });
});
// server.post("/products",createProduct );
server.listen(8080, () => {
  console.log("server working");
});
