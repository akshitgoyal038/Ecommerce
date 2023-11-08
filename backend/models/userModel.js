const mongoose =  require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:[true,"Please Enter your name"],
        maxLen:[30,"Name canot be greater than 30"],
        minLen:[4,"Name should not have 4 characters"]
    },
    email:{
        type:String,
        // required:[true,"Please enter your name"],
        unique:true
    },
    password:{
        type:String,
        minLen:[8,"Password should be greater than 8 characters"]
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date,
    role:{
        type: String,
        enum: ["Admin", "User"],
        default:"User"
    }
});



module.exports = mongoose.model("user",userSchema);



