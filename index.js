const express = require("express");
const server = express();
const cors=require('cors')
const mongoose = require("mongoose");

const ProductRouter=require('./routes/ProductRoutes') 
const BrandRouter=require('./routes/BrandRoutes') 
const CategoryRouter=require('./routes/CategoryRoutes')
const AuthRouter=require('./routes/AuthRoutes')
const UserRouter=require('./routes/UserRoutes')
const CartRouter=require('./routes/CartRoutes')

server.use(express.json())//to parse a req body
server.use(cors({
  exposedHeaders:['X-Total-Count'],
}))
server.use('/products',ProductRouter.router)
server.use('/',BrandRouter.router)
server.use('/',CategoryRouter.router)

server.use('/users',AuthRouter.router)
server.use('/user',UserRouter.router)
server.use('/cart',CartRouter.router)

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
