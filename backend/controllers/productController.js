const Product = require("../models/productModels");
const apiFeatures = require("../utils/apiFeatures");


//     CREATE PRODUCT

exports.createProduct = async (req,res)=>{
    try{
       req.body.user = req.user.id;
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
        const api = new apiFeatures(Product.find(),req.query.keyword);
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



//delete product

exports.deleteProduct= async(req,res)=>{
    try{
        let productid= req.params.id;
        const checkproduct=await Product.findById(productid);
        if(!checkproduct){
            return res.status(500).json({
                success:false,
                message:"Productt not find"
            })
        }

        const deleteproduct=await Product.findByIdAndDelete(productid);

        return res.status(200).json({
            success:true,
            message:"Product data deleted succcessfully"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while deleting the product"
        })
    }
};


// get product

exports.getProduct= async(req,res)=>{
try{

    const productid=req.params.id;
    const productdata= await Product.findById(productid);
    if(!productdata){
        return res.status(500).json({
            success:false,
            message:"No product found for this id"
        })
    }


    return res.status(200).json({
        success:true,
        message:"Product fetch easily",
        productdata
    })

}catch(error){
    return res.status(500).json({
        success:false,
        message:"Something went wrong while get single product"
    })
}
}


exports.search= async (req,res)=>{
    try{
        const keyword=req.query.keyword;
        console.log(keyword);
        const result = await Product.find({
            $or:[
                {name:{$regex:keyword,$options:'i'}},
                {description:{$regex:keyword,$options:'i'}}
            ]
        });


        if(result.length===0){
            return res.status(404).json({
                success:false,
                message:"No result found for this"
            })
        }

        return res.status(500).json({
            success:true,
            message:"Data search easily",
            result
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while searching"
        })
    }
}


exports.price= async (req,res)=>{
    try{
         const minPrice = parserFloat(req.query.minPrice);
         const maxPrice= parserFloat(req.query.maxPrice);


         if(isNaN(minPrice) || isNaN(maxPrice)){
            return res.status(400).json({
                success:false,
                message:"Invalid price range"
            })
         }

         const filterProducts = await Product.find({
            price :{$gte :minPrice, $lte: maxPrice},
         })


         return res.status(200).json({
            success:true,
            message:'Price filter successfull',
            filterProducts
         })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while filter on price"
        })
    }
}