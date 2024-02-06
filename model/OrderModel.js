const mongoose = require("mongoose");
const { Schema } = mongoose;
const OrderSchema = new Schema({
  Items: { type: [Schema.Types.Mixed], required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true, default: "pending" },
  paymentMethod: { type: String, required: true, default: "cash" },
  totalAmount: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  address: { type: [Schema.Types.Mixed], required: true },
  
});
const virtual = OrderSchema.virtual("id");
virtual.get(function () {
  this._id;
});
OrderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (docs, ret) {
    delete ret._id;
  },
});

exports.OrderSchema = mongoose.model("Order", OrderSchema);

// {
//     "user": 9,
//     "status": "delivered",
//     "Items": [
//       {
//         "id": 3,
//         "name": "Samsung Universe 9",
//         "href": "productdetail",
//         "imagealt": "Samsung's new variant which goes beyond Galaxy to the Universe",
//         "price": 1249,
//         "discountPercentage": 15.46,
//         "rating": 4.09,
//         "stock": 36,
//         "brand": "Samsung",
//         "category": "smartphones",
//         "imageSrc": "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
//         "images": [
//           "https://cdn.dummyjson.com/product-images/3/1.jpg"
//         ],
//         "user": 9,
//         "quantity": 1
//       },
//       {
//         "id": 4,
//         "name": "OPPOF19",
//         "href": "productdetail",
//         "imagealt": "OPPO F19 is officially announced on April 2021.",
//         "price": 280,
//         "discountPercentage": 17.91,
//         "rating": 4.3,
//         "stock": 123,
//         "brand": "OPPO",
//         "category": "smartphones",
//         "imageSrc": "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
//         "images": [
//           "https://cdn.dummyjson.com/product-images/4/1.jpg",
//           "https://cdn.dummyjson.com/product-images/4/2.jpg",
//           "https://cdn.dummyjson.com/product-images/4/3.jpg",
//           "https://cdn.dummyjson.com/product-images/4/4.jpg",
//           "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg"
//         ],
//         "user": 9,
//         "quantity": 1
//       },
//       {
//         "id": 5,
//         "name": "Huawei P30",
//         "href": "productdetail",
//         "imagealt": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
//         "price": 499,
//         "discountPercentage": 10.58,
//         "rating": 4.09,
//         "stock": 32,
//         "brand": "Huawei",
//         "category": "smartphones",
//         "imageSrc": "https://cdn.dummyjson.com/product-images/5/thumbnail.jpg",
//         "images": [
//           "https://cdn.dummyjson.com/product-images/5/1.jpg",
//           "https://cdn.dummyjson.com/product-images/5/2.jpg",
//           "https://cdn.dummyjson.com/product-images/5/3.jpg"
//         ],
//         "user": 9,
//         "quantity": 1
//       }
//     ],
//     "selectedAddress": 0,
//     "paymentMethod": "cash",
//     "totalAmount": 1732,
//     "totalItems": 3,
//     "addresses": [
//       {
//         "fullname": "abc",
//         "email": "h",
//         "country": "United States",
//         "streetaddress": "h",
//         "city": "h",
//         "region": "h",
//         "postalcode": "h",
//         "phone": "h"
//       }
//     ],
//     "id": 1
//   }
