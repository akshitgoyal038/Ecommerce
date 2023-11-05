const express = require("express");
const {
createProduct,
getAllProducts,
updateProduct,
deleteProduct,
getProduct,
search} = require("../controllers/productController");

const router = express.Router();

router.post("/create-products",createProduct);
router.get("/getall-products",getAllProducts);
router.put("/product/:id",updateProduct);
router.delete("/product/:id",deleteProduct);
router.get("/product/:id",getProduct);
router.get("/product",search);



module.exports = router;

