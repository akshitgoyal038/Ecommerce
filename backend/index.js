const express = require("express");
const app= express();

const product= require("./routes/productRoute");
const user = require("./routes/userRoute");


const cookieParser = require("cookie-parser");
const cors= require("cors");
const database = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();


const PORT = process.env.PORT || 4000;
database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)
app.use("/api/v1/",product);
app.use("/api/v1",user);

app.get('/',(req,res)=>{
    return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});


app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})