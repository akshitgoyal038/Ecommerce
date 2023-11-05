const express = require("express");
const {
createProduct,
getAllProducts,
updateProduct} = require("../controllers/productController");

const router = express.Router();

router.post("/create-products",createProduct);
router.get("/getall-products",getAllProducts);
router.put("/product/:id",updateProduct);



module.exports = router;

