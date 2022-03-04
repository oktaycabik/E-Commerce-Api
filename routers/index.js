const express =require("express")
const auth =require("./auth")
const product =require("./product")
const order =require("./order")
const router =express.Router();

router.use("/auth",auth)
router.use("/order",order)
router.use("/product",product)

module.exports=router;