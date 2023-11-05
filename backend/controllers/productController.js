const Product = require("../models/productModels");


//     CREATE PRODUCT

exports.createProduct = async (req,res)=>{
    try{
       
       const product = await Product.create(req.body);
       return res.status(201).json({
          success:true,
          message:"Product created successfuly",
          product
       })

    }catch(error){
        return res.json({
            success:false,
            message:"Product connot create Successfuly"
        })
    }
}



// get all products

exports.getAllProducts = async (req,res) =>{
    try{

        const allProducts=await Product.find();
        if(!allProducts){
            return res.json({
                success:false,
                message:"There is no product exist"
            })
        }

        return res.status(200).json({
            success:true,
            message:"All data fetch easily",
            allProducts
        })

    }catch(error){
        return res.json({
            success:false,
            message:"Something went wrong while fetching all products"
        })
    }
}


// update product

exports.updateProduct = async (req,res)=>{
    try{
        const product_id=req.params.id;
        const dbdata= await Product.findById(product_id);
        if(!dbdata){
            return  res.status(500).json({
                success:false,
                message:"Product not found"
            })
        }
        const updatedata= await Product.findByIdAndUpdate(product_id,req.body,{new:true});

        return res.status(200).json({
            success:true,
            message:"Product data update successfully",
            updatedata
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching all products"
        })
    }
};