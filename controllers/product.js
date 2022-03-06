const Product = require("../models/Product");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/customError");

const newProduct = asyncErrorWrapper(async (req, res, next) => {
  const { name,category,brand,price,details,features} = req.body;
console.log('features', features)
  const product = await Product.create({
    name,
    category,
    brand,
    price,
    details,
    features,
  });
  res.status(201).json({
    success: true,
    product,
  });
});
const getAllProducts = asyncErrorWrapper(async (req, res, next) => {
   let query=Product.find();
   if(req.query.search){
     const searchObject={};
     
     const regex=new RegExp(req.query.search,"i")
     searchObject["name"]=regex;
  
     query=query.where(searchObject)

   }  
   if(req.query.brand){
    const brandObject={};
    const regex=new RegExp(req.query.brand,"i")
    brandObject["brand"]=regex;
    query=query.where(brandObject)
   }

   if(req.query.category){
    const categoryObject={};
    const regex=new RegExp(req.query.category,"i")
    categoryObject["category"]=regex;
    query=query.where(categoryObject)
   }
   if(req.query.details){
    const detailsObject={};
    const regex=new RegExp(req.query.details,"i")
    detailsObject["details"]=regex;
    query=query.where(detailsObject)
   }
   if(req.query.core){
    const coreObject={};
    const regex=new RegExp(req.query.core,"i")
    coreObject["features.core"]=regex;
    query=query.where(coreObject)
    console.log('regex', coreObject)
   }
   
     const sortKey=req.query.sortBy;
     if(sortKey==="most-order"){
        query=query.sort("-orderCount")
     }
     if(sortKey==="few-order"){
      query=query.sort("orderCount")
   }
     if(sortKey==="most-favori"){
      query=query.sort("-favoriCount")
     }
     if(sortKey==="deafult"){
      query=query.sort("-createdAt")
     }
     if(sortKey==="most-price"){
      query=query.sort("-price")
     }
     if(sortKey==="few-price"){
      query=query.sort("price")
     }
     if(sortKey==="önerilen"){
      query=query.sort("-createdAt")
     }
     


      const products=await query;


   return res.status(200)
    .json({
        success:true,
        products
    })
})
const getProduct = asyncErrorWrapper(async (req, res, next) => {
    const product = await Product.findById({ _id: req.params.id });
    res.status(200).json({
      success: true,
      product,
    });
  });

  const getProductCategories = asyncErrorWrapper(async (req, res, next) => {
    const product = await Product.find({ category:req.params.id });
    
    res.status(200).json({
      success: true,
      product,
      
    });
  });
  const likesProduct = asyncErrorWrapper(async (req, res, next) => {
    const {id} =req.params;
    const product=await Product.findById(id);
    if(product.likes.includes(req.user.id)){
      return next(new CustomError("you allready like this product"))
    }
    product.likes.push(req.user.id)
    await product.save()
    return res.status(200)
    .json({
      success:true,
      product
    })
  });
  const undolikesProduct = asyncErrorWrapper(async (req, res, next) => {
    const {id} =req.params;
    const product=await Product.findById(id);
   
    if(!product.likes.includes(req.user.id)){
      return next(new CustomError("You can undo like operition for this product",400))
    }
    const index=product.likes.indexOf(req.user.id)
    
    product.likes.splice(index,1)

    await product.save();

    return res.status(200)
    .json({
      success:true,
      product 
    })
  });
  const favoriteUserProduct = asyncErrorWrapper(async (req, res, next) => {
    const {id} =req.params;
    
    
    const product=await Product.findById(id);
    if(product.favori.includes(req.user.id)){
      return next(new CustomError("you allready like this product"))
    }
    product.favori.push(req.user.id)
    product.favoriCount=product.favori.length;
    await product.save()
    return res.status(200)
    .json({
      success:true,
      product
    })
  });
  const favoriteundoUserProduct = asyncErrorWrapper(async (req, res, next) => {
    const {id} =req.params;
    const product=await Product.findById(id);
   
    if(!product.favori.includes(req.user.id)){
      return next(new CustomError("You can undo like operition for this product",400))
    }
    const index=product.favori.indexOf(req.user.id)
    
    product.favori.splice(index,1)
    product.favoriCount=product.favori.length;

    await product.save();
  
    return res.status(200)
    .json({
      success:true,
      product 
    })
  });
  const imageUpload = asyncErrorWrapper(async (req, res, next) => {
    const {id}=req.params
   const product= await Product.findByIdAndUpdate(id,{
      "product_image":req.savedImage
    },{
      new:true,
    })
    res.json({
      success:true,
      message:"Image Upload Successfull",
      data:product
    })
  })

module.exports={
newProduct,
getAllProducts,
getProduct,
getProductCategories,
likesProduct,
undolikesProduct,
favoriteUserProduct,
favoriteundoUserProduct,
imageUpload,
}