const moongose = require("mongoose");
const Product = require("./Product");
const Schema = moongose.Schema;

const OrderSchema = new Schema({
  product: [{ 
   product_id: {
    type: moongose.Schema.Types.ObjectId,

    required: true,
    ref: "Product",
    },
    quantity: {
      type: Number,
      
      
    },
  }],

  user: {
    type: moongose.Schema.Types.ObjectId,

    required: true,
    ref: "User",
  },
});
OrderSchema.pre("save", async function (next) {
  try {
   
    const product = await Product.findById(this.product.map(a=>a.product_id));
    console.log("asdasd", product);
    product.order.push(this._id);
    product.orderCount = product.order.length;
    await product.save();
    next();
  } catch (err) {
    return next(err);
  }
});
module.exports = moongose.model("Order", OrderSchema);
