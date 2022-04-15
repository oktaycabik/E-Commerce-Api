const User = require("../models/User");
const Product = require("../models/Product");
const asyncErrorWrapper = require("express-async-handler");
const {
  validateUserInput,
  comparePassword,
} = require("../helpers/authorization/inputHelpers");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const CustomError = require("../helpers/error/customError");
const register = asyncErrorWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  sendJwtToClient(user, res);
});
const getUser = (req, res, next) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
      favorites: req.user.favorites,
    },
  });
};
const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!validateUserInput(email, password)) {
    return next(new CustomError("Please check your inputs", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !comparePassword(password, user.password)) {
    return next(new CustomError("Please check your credentials", 404));
  }

  sendJwtToClient(user, res, 200);
});

const logout = asyncErrorWrapper(async (req, res, next) => {
  const { NODE_ENV } = process.env;

  // Send To Client With Res

  return res
    .status(200)
    .cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfull",
    });
});
const favoriteProducts = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(req.user.id);
  if (user.favorites.includes(id)) {
    return next(new CustomError("you allready like this product"));
  }
  user.favorites.push(id);
  await user.save();
  return res.status(200).json({
    success: true,
    user,
  });
});
const undoFavoritesProduct = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(req.user.id);

  if (!user.favorites.includes(id)) {
    return next(
      new CustomError("You can undo like operition for this product", 400)
    );
  }
  const index = user.favorites.indexOf(id);

  user.favorites.splice(index, 1);

  await user.save();

  return res.status(200).json({
    success: true,
    user,
  });
});
const getUserById = asyncErrorWrapper(async (req, res, next) => {
  const user = await User.findById( req.user.id ).populate({
    path: "favorites",
    select: "name price brand product_image",
  });
  res.status(200).json({
    success: true,
    user,
  });
});
const getAllUser = asyncErrorWrapper(async (req, res, next) => {
  const users=await User.find()
  res.status(200).json({
    success: true,
    users,
  });
});
const editUser = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { phone_number } = req.body;
  const { adress } = req.body;
  const {name }=req.body
  const {gender }=req.body
  const {birth_date }=req.body
 
  let user = await User.findById(id);
  
 
  if(phone_number){
    user.phone_number = phone_number;
  }
  if(adress){
    user.adress=adress
  }
  if(name){
    user.name=name;
  }
  if(gender){
    user.gender=gender;
  }
  if(birth_date){
    user.birth_date=birth_date;
  }
 
  
  
  
  user = await user.save();
  res.status(200).json({
    success: true,
    user,
  });
});
module.exports = {
  register,
  getUser,
  login,
  favoriteProducts,
  getUserById,
  logout,
  undoFavoritesProduct,
  editUser,
  getAllUser,
};
