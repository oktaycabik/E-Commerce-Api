const express=require("express")
const {getAccessToRoute}=require("../middlewares/authorization/auth")
const {newProduct,getAllProducts,getProduct,getProductCategories,likesProduct,undolikesProduct,imageUpload, favoriteUserProduct, undoFavoritesProduct, favoriteundoUserProduct}=require("../controllers/product");
const photoUpload = require("../middlewares/libraries/multer");
 
const router = express.Router();

router.post("/addproduct",newProduct)
router.get("/like/:id",getAccessToRoute,likesProduct)
router.get("/undo_like/:id",getAccessToRoute,undolikesProduct)
router.get("/favori/:id",getAccessToRoute,favoriteUserProduct)
router.get("/undo_favori/:id",getAccessToRoute,favoriteundoUserProduct)
router.get("/",getAllProducts)
router.get("/:id",getProduct)
router.get("/cate/:id",getProductCategories)
router.post("/upload/:id",getAccessToRoute,photoUpload.single("product_image"),imageUpload)
module.exports = router;