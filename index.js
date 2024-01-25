const express = require("express");
const server = express();
server.use(express.json())//to parse a req body

const mongoose = require("mongoose");
const {createProduct}  = require("./controller/ProductController");//it requires one bracket to cause an error

main().catch((error) => console.log(error));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce"); 
  console.log("database connected!");
}
server.get("/", (req, res) => {
  res.json({ status: "Server working properly" });
});
server.post("/products",createProduct );
server.listen(8080, () => {
  console.log("server working");
});
