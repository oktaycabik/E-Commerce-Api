const express=require("express");
const { newOrder, getByOrderUser, getOrder } = require("../controllers/order");
const {getAccessToRoute}=require("../middlewares/authorization/auth")
const router = express.Router();

router.post("/neworder",getAccessToRoute ,newOrder );
router.get("/:id",getByOrderUser)
router.get("/allorder",getOrder)
module.exports = router;