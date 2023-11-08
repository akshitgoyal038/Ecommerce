const mongoose = require("mongoose");


const productSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter product description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter product price"],
        maxLen:[8,"Price cannot exceed 8 characters"]
    },
    images:[
        {
            public_id:{
              type:String,
              required:true
            },
            url:{
               type:String,
               required:true
            } 
         }
    ],
    category:{
        type:String,
        required:[true,"Please enter product category"]
    },
    Stock:{
        type:Number,
        required:[true,"Please enter product Stock"],
        maxLen:4,
        default:1
    },
    ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RatingAndReview",
		},
	],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        defaut:Date.now()
    }
});



module.exports = mongoose.model("Product",productSchema);