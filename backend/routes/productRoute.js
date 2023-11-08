const express = require("express");
const {
createProduct,
getAllProducts,
updateProduct,
deleteProduct,
getProduct,
search} = require("../controllers/productController");

const {createRating,
getAverageRating,
getAllRating}= require("../controllers/ratingAndReview");

const router = express.Router();
const {auth,
isAdmin,isUser} =  require("../middleware/auth");

router.post("/create-products",auth,isAdmin,createProduct);
router.get("/getall-products",getAllProducts);
router.put("/product/:id",auth,isAdmin,updateProduct);
router.delete("/product/:id",auth,isAdmin,deleteProduct);
router.get("/product/:id",getProduct);
router.get("/product",search);



router.post("/createRating", auth, isUser, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)



module.exports = router;

