const moongose = require("mongoose");
const Product = require("./Product");
const Schema = moongose.Schema;

const OrderSchema = new Schema({
  product: [
    {
      type: moongose.Schema.Types.ObjectId,

      required: true,
      ref: "Product",
    },
  ],
 
  user: {
    type: moongose.Schema.Types.ObjectId,

    required: true,
    ref: "User",
  },
});
OrderSchema.pre("save", async function (next) {
  try {
    const product = await Product.findById(this.product);
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
