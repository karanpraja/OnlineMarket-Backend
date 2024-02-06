const express = require("express");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy  ;
var crypto = require('crypto');
var db = require('./db');
const server = express();
const cors=require('cors')
const mongoose = require("mongoose");
const session=require('express-session')
// const csrf=require('csurf')
var SQLiteStore = require('connect-sqlite3')(session);


const ProductRouter=require('./routes/ProductRoutes') 
const BrandRouter=require('./routes/BrandRoutes') 
const CategoryRouter=require('./routes/CategoryRoutes')
const AuthRouter=require('./routes/AuthRoutes')
const UserRouter=require('./routes/UserRoutes')
const CartRouter=require('./routes/CartRoutes')
const OrderRouter=require('./routes/OrderRoutes');
const { UserSchema } = require("./model/AuthModel");
const { loginUser } = require("./controller/AuthController");

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
server.use('/products',ProductRouter.router)
server.use('/',BrandRouter.router)
server.use('/',CategoryRouter.router)
server.use('/orders',OrderRouter.router)
server.use('/users',AuthRouter.router)
server.use('/user',UserRouter.router)
server.use('/cart',CartRouter.router)

// console.log("passport")

//pasport strategies
passport.use('local',new LocalStrategy({ usernameField: 'email' }, async function(username, password, done) {
  console.log("Passport")
  console.log({username,password})
  //by default passport uses username 
  try{
    console.log("try")
 const user= await UserSchema.findOne({ email: username }).exec()
 console.log({user})
      if (!user) {  
        console.log('1')
        return done(null,false,{message:"invalid credentials"});
      }
      if (user.password===password) 
          { console.log('2')
          return  done(null,user); }
      else{
        console.log('3')
        return done(null, false, {message:"invalid credentials"});
      }

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
//serialize and deserialize
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    console.log("Serialize user")
    return cb(null, { id: user.id,username: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  console.log("deserializeUser")
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
