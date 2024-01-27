const express = require("express");
const ProductRouter=require('./routes/ProductRoutes') 
const BrandRouter=require('./routes/BrandRoutes') 
const CategoryRouter=require('./routes/CategoryRoutes')

const server = express();
server.use(express.json())//to parse a req body
server.use('/',ProductRouter.router)
server.use('/',BrandRouter.router)
server.use('/',CategoryRouter.router)
const mongoose = require("mongoose");
// const {createProduct}  = require("./controller/ProductController");//it requires one bracket to cause an error

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
