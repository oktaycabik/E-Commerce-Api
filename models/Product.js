const moongose = require("mongoose");

const Schema = moongose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  product_image: {
    type: String,
    default: "default.jpg",
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
  features: {
    color: {
      type: String,
    },
    ram: {
      type: String,
    },
    ssd: {
      type: String,
    },
    core: {
      type: String,
    },
    use_area: {
      type: String,
    },
    size: [
      {
        type: String,
      },
    ],

    display_card: {
      type: String,
    },
  },
  orderCount: {
    type: Number,
    default: 0,
  },
  order: [
    {
      type: moongose.Schema.ObjectId,
      ref: "Order",
    },
  ],
  favoriCount: {
    type: Number,
    default: 0,
  },
  favori: [
    {
      type: moongose.Schema.ObjectId,
      ref: "User",
    },
  ],
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
