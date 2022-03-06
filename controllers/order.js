const Order = require("../models/Order");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/customError");


const newOrder = asyncErrorWrapper(async (req, res, next) => {
  
  console.log('order', req.body.product[0].product_id)
    const order = await Order.create({
        
      product:req.body.product,
     
      user:req.user.id
    });
    res.status(201).json({
      success: true,
      data:order,
    });
 
  });
  const getByOrderUser = asyncErrorWrapper(async (req, res, next) => {
      const {id}=req.params
    const order = await Order.find({user:id})
    .populate({
        path:"product user",
        select:"name price name email"
    });
    res.status(200).json({
      success: true,
      order,
    });
  });
  const getOrder = asyncErrorWrapper(async (req, res, next) => {
  
  const order = await Order.find()
  res.status(200).json({
    success: true,
    order,
  });
});

  module.exports={
   newOrder,
   getByOrderUser,
   getOrder
    }