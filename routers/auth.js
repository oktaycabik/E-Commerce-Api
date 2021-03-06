const express = require("express");
const {register,getUser,login,logout, favoriteProducts, undoFavoritesProduct, getUserById,editUser, getAllUser} =require("../controllers/auth")
const router = express.Router();
const {getAccessToRoute}=require("../middlewares/authorization/auth")

router.post("/register",register );
router.get("/user/get",getAccessToRoute,getUserById)
router.post("/login",login );
router.get("/undo_favorites/:id",getAccessToRoute,undoFavoritesProduct)
router.get("/favorites/:id",getAccessToRoute,favoriteProducts)
router.put("/edit/:id",getAccessToRoute,editUser );
router.get("/user/logout",getAccessToRoute,logout );
router.get("/user/profile",getAccessToRoute,getUser );
router.get("/user/getall",getAllUser );
module.exports = router;
