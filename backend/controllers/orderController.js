const Order = require("../models/orderModel");
const Product = require("../models/productModels");


exports.newOrder = async(req,res)=>{
    try{

        const {shippingInfo,
               orderItems,
               paymentInfo,
               itemsPrice,
               taxPrice,
               shippingPrice,
               totalPrice}=req.body;

        const order = await Order.create({
               shippingInfo,
               orderItems,
               paymentInfo,
               itemsPrice,
               taxPrice,
               shippingPrice,
               totalPrice,
               paidAt:Date.now(),
               user:req.user._id
        });


        return res.status(200).json({
            success:true,
            message:"Order created successfully",
            order
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating a user"
        })
    }
}



exports.getSingleOrder= async(req,res)=>{
    try{
        const orderid=req.params.id;

        const order= await Order.findById(orderid).populate("user","name email");
        if(!order){
            return res.status(401).json({
                success:false,
                message:"no order exist for this id"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Order fetch successfully",
            order
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while getting single order"
        })
    }
}


exports.myOrders= async(req,res)=>{
    try{
        const order= await Order.find({user:req.user._id});
        if(!order){
            return res.status(401).json({
                success:false,
                message:"no order exist for this id"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Order fetch successfully",
            order
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while getting single order"
        })
    }
}


exports.getAllOrder= async(req,res)=>{
    try{

        const order= await Order.find();
        if(!order){
            return res.status(401).json({
                success:false,
                message:"no order exist for this id"
            })
        }
        let total= await {
            $sum : order.total
        }
        console.log(total);
        return res.status(200).json({
            success:true,
            message:"Order fetch successfully",
            order,
            total
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while getting single order"
        })
    }
}


exports.updateOrder= async(req,res)=>{
    try{
        const orderid=req.params.id;

        const order= await Order.findById(orderid).populate("user","name email");
        if(!order){
            return res.status(401).json({
                success:false,
                message:"no order exist for this id"
            })
        }

        if(order.orderStatus === "Delivered"){
            return res.status(200).json({
                success:true,
                message:"This order already delivered"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Order fetch successfully",
            order
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while getting single order"
        })
    }
}