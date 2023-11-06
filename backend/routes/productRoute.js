const express = require("express");
const {
createProduct,
getAllProducts,
updateProduct,
deleteProduct,
getProduct,
search} = require("../controllers/productController");

const router = express.Router();
const {auth,
isAdmin} =  require("../middleware/auth");

router.post("/create-products",auth,isAdmin,createProduct);
router.get("/getall-products",getAllProducts);
router.put("/product/:id",auth,isAdmin,updateProduct);
router.delete("/product/:id",auth,isAdmin,deleteProduct);
router.get("/product/:id",getProduct);
router.get("/product",search);



module.exports = router;

