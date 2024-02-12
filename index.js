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
const cookieParser = require("cookie-parser");
const ProductRouter=require('./routes/ProductRoutes') 
const BrandRouter=require('./routes/BrandRoutes') 
const CategoryRouter=require('./routes/CategoryRoutes')
const AuthRouter=require('./routes/AuthRoutes')
const UserRouter=require('./routes/UserRoutes')
const CartRouter=require('./routes/CartRoutes')
const OrderRouter=require('./routes/OrderRoutes');
const { UserSchema } = require("./model/AuthModel");
const { isAuth, sanitizeUser, cookieExtractor } = require("./services/common");
const { request } = require("http");


const SECRET_KEY="SECRET_KEY"
    var opts = {}
    opts.jwtFromRequest = cookieExtractor;
    opts.secretOrKey = SECRET_KEY;
// exports.SecretKey='Karan@1234'
// server.use(express.static('build'))
server.use(cookieParser())
server.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
// server.use(csrf());
server.use(passport.authenticate('session'));
server.use(cors({
  origin: '*',
  exposedHeaders: ['X-Total-Count'],
}))
server.use(express.json())//to parse a req body
server.use('/products',
ProductRouter.router)
server.use('/',BrandRouter.router)
server.use('/',CategoryRouter.router)
server.use('/orders',isAuth(),OrderRouter.router)
server.use('/users',AuthRouter.router)
server.use('/user',isAuth(),UserRouter.router)
server.use('/cart',isAuth(),CartRouter.router)

// console.log("passport")



//pasport strategies
passport.use('local',new LocalStrategy({ usernameField: 'email' }, async function(email, password, done) {
  console.log("Passport")
  // console.log({email,password}) by default passport uses username 
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
        let token=jwt.sign(sanitizeUser(user),SECRET_KEY)
        console.log(token)
         done(null, {id:user.id,role:user.role,token:token});
      });

  }catch(err)  
  {
    console.log("Error")
    return done(err)
  }
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
    console.log("jwtuser")
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
    console.log(user)
    console.log("Serialize user")
    return cb(null, { id: user.id,role:user.role});
  });
});


passport.deserializeUser(function(user, cb) {
  console.log("deserializeUser",user)
  process.nextTick(function() {
    return cb(null, user);
});
});

//Payment Intent
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51OdmoiSB02QNHAyRyZHy5mn65Rjm1ocUHVMBP4Bp7IBWFnX2TVuRjHqhRvf5mhObExT4QeJ4TcSnrgIbG4oLFhl300EzEIN3DI');

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

server.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

//payment intent ends here
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
