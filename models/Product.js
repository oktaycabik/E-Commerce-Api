const moongose = require("mongoose");

const Schema = moongose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  product_image:{
    type : String,
    default : "default.jpg"
  },
  brand: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  orderCount:{
    type:Number,
    default:0
  },
  order:[{
    type: moongose.Schema.ObjectId,
    ref: "Order",
  }],
  favoriCount:{
    type:Number,
    default:0
  },
  favori:[{
    type: moongose.Schema.ObjectId,
    ref: "User",
  }],
  likes: [
    {
      type: moongose.Schema.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: String,
   
  },
});

module.exports = moongose.model("Product", ProductSchema);
