require('dotenv').config();

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
const endpointSecret = 'whsec_...';
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
const StripeRouter=require('./routes/StripeRoutes');
const { UserSchema } = require("./model/AuthModel");
const { isAuth, sanitizeUser, cookieExtractor } = require("./services/common");
const { request } = require("http");
const {v5:uuid}=require('uuid')
const path=require('path')

const SECRET_KEY=process.env.SECRET_KEY
    var opts = {}
    opts.jwtFromRequest = cookieExtractor;
    opts.secretOrKey = SECRET_KEY;
//webhook
server.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      console.log(paymentIntent)
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
    // exports.SecretKey='Karan@1234'
server.use(express.static(path.resolve(__dirname,'build')))
server.use(cookieParser())
server.use(session({
  secret: process.env.SECRET,
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
// server.use(express.raw({type: 'application/json'}))
server.use('/products',
ProductRouter.router)
server.use('/',BrandRouter.router)
server.use('/',CategoryRouter.router)
server.use('/orders',isAuth(),OrderRouter.router)
server.use('/users',AuthRouter.router)
server.use('/user',isAuth(),UserRouter.router)
server.use('/cart',isAuth(),CartRouter.router)


// server.use('/stripecheckout',StripeRouter.router)


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

const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY
);
server.post("/create-payment-intent", async (req, res) => {
  console.log({req: req.body})
  const {totalAmount,id,quantity}=req.body
  const product = await stripe.products.create({
    name: `Your order id is ${id}`,
  });
  console.log({product:product})
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: totalAmount*8400,
    currency: 'INR',
  });
  console.log({price:price})
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: price.id,
        quantity: quantity,
      },
    ],
    // customer: 'cs_test_MlZAaTXUMHjWZ7DcXjusJnDU4MxPalbtL5eYrmS2GKxqscDtpJq8QM0k',
    customer_email: 'karan4@gmail.com', // Add customer's email address headers
    billing_address_collection: 'required', // Prompt the customer to provide their billing address
    mode: 'payment',
    success_url: `${process.env.HOST}/checkorder/${id}`,
    cancel_url: `${process.env.HOST}/errorpage`,
    metadata:{
      orderId:id
    }
  });

  res.json( session.url);

});



main().catch((error) => console.log(error));
async function main() {
  await mongoose.connect(process.env.MONGO_URL); 
  console.log("database connected!");
}
server.get("/", (req, res) => {
  res.json({ status: "Server working properly" });
});
// server.post("/products",createProduct );
server.listen(process.env.PORT, () => {
  console.log(" server working");
});
