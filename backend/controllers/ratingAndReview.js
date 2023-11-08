const RatingAndReview = require("../models/RatingandReviews");
const Product = require("../models/productModels");
const { mongo, default: mongoose } = require("mongoose");

//createRating
exports.createRating = async (req, res) => {
    try{

        //get user id
        const userId = req.user.id;
        //fetchdata from req body
        const {rating, review, productId} = req.body;
        //check if user is enrolled or not
        // const planDetails = await Product.findOne(
        //                             {_id:productId,
        //                             user: {$elemMatch: {$eq: userId} },
        //                         });

        // if(!planDetails) {
        //     return res.status(404).json({
        //         success:false,
        //         message:'User donot purchase this plan',
        //     });
        // }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                                user:userId,
                                                product:productId,
                                            });
        if(alreadyReviewed) {
                    return res.status(403).json({
                        success:false,
                        message:'Plan is already reviewed by the user',
                    });
                }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                        rating, review, 
                                        product:productId,
                                        user:userId,
                                    });
       
        //update plan with this rating/review
        const updatedCourseDetails = await Product.findByIdAndUpdate({_id:productId},
                                    {
                                        $push: {
                                            ratingAndReviews: ratingReview._id,
                                        }
                                    },
                                    {new: true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}



//getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
            //get course ID
            const productId = req.body.Id;
            //calculate avg rating

            const result = await RatingAndReview.aggregate([
                {
                    $match:{
                        product: new mongoose.Types.ObjectId(productId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating: { $avg: "$rating"},
                    }
                }
            ])

            //return rating
            if(result.length > 0) {

                return res.status(200).json({
                    success:true,
                    averageRating: result[0].averageRating,
                })

            }
            
            //if no rating/Review exist
            return res.status(200).json({
                success:true,
                message:'Average Rating is 0, no ratings given till now',
                averageRating:0,
            })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//getAllRatingAndReviews

exports.getAllRating = async (req, res) => {
    try{
            const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"userModel",
                                        select:"name email image",
                                    })
                                    .populate({
                                        path:"productModel",
                                        select: "name",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}