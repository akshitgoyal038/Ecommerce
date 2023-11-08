const express = require("express");
const router = express.Router();


const {newOrder, getSingleOrder, myOrders} = require("../controllers/orderController");
const {auth,
isAdmin,isUser} =  require("../middleware/auth");

router.post("/order/new",auth,newOrder);
router.get("/order/:id",auth,isAdmin,getSingleOrder);
router.get("/order/me",auth,myOrders);

module.exports = router;