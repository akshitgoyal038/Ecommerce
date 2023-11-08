const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


exports.registerUser = async(req,res)=>{
    try{

        const {name,email,password} = req.body;
        const existingUser = await User.findOne({ email })
        console.log(existingUser);
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "User already exists. Please sign in to continue.",
          })
        }

        const hashpassword = await bcrypt.hash(password,10);

        const user= await User.create({
            name,email,
            password:hashpassword,
            avatar:{
                public_id:"this is sample_id",
                url:"profileUrl"
            }
        })
        return res.status(200).json({
            success:true,
            message:"User created successfully",
            user
        })

    }catch(error){
         return res.status(500).json({
            success:false,
            error,
            message:"Something went wrong while creating user"
         })
    }
}



exports.login = async (req, res) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        })
      }
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({
          success: false,
          message: `User is not Registered with Us Please SignUp to Continue`,
        })
      }
      console.log(typeof(password));
      console.log(user);
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { email: user.email, id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        )
        user.token = token
        user.password = undefined
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        }
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user,
          message: `User Login Success`,
        })
      } else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      })
    }
  }


  exports.changePassword = async (req, res) => {
    try {
      const userDetails = await User.findById(req.user.id);
      console.log(userDetails);
      const { oldPassword, newPassword } = req.body
      console.log(oldPassword);
      console.log(newPassword);
      const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password
      )
      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ success: false, message: "The password is incorrect" })
      }
      const encryptedPassword = await bcrypt.hash(newPassword, 10)
      const updatedUserDetails = await User.findByIdAndUpdate(
        req.user.id,
        { password: encryptedPassword },
        { new: true }
      )
   
      return res.status(200).json({
         success: true,
          message: "Password updated successfully" })
    } catch (error) {
      console.error("Error occurred while updating password:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
      })
    }
  }


exports.logout = async (req,res)=>{
    try{
        res.cookie("token1",null,{
            expires:new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success:true,
            message:"User log out successfully"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while logout the user"
        })
    }
}

exports.getUSerDetails = async(req,res)=>{
    try{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        message:"User details fetch easily",
        user
    })

    console.log(user);

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetch user details"
        })
    }
}

exports.updateProfile = async(req,res)=>{
    try{

        const newUser ={
            name:req.body.name,
            email:req.body.email
        }
        console.log(newUser);
        console.log(req.user.id);
        const user = await User.findById(req.user.id);
        user.name=req.body.name;
        user.email=req.body.email

        return res.status(200).json({
            success:true,
            message:"User Profile updated successfully",
            user
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while update profile"
        })
    }
}


exports.getAllUser =  async(req,res)=>{
    try{

        const allUser = await User.find();

        return res.status(200).json({
            success:true,
            message:"Alluser fetch successfully",
            allUser
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching allUser details"
        })
    }
}


exports.getAllUserDetails= async (req,res)=>{
    try{
      
      const user = await User.findById(req.params.id);

      if(!user){
        return res.status(400).json({
            success:false,
            message:"User details doesnot found for this id"
        })
      }

      return res.status(200).json({
        success:true,
        message:"User details fetch easily",
        user
      })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetch all user details"
        })
    }
}


exports.updateRole = async(req,res)=>{
    try{

        const newUser ={
            name:req.body.name,
            email:req.body.email,
            role:req.body.role
        }

        const user = await User.findByIdAndUpdate(req.params.id,newUser,{new:true});

        return res.status(200).json({
            success:true,
            message:"User Profile updated successfully",
            user
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while update profile"
        })
    }
}


exports.deleteUser = async (req,res)=>{
    try{
       
        const user = await User.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while delete User"
        })
    }
}
